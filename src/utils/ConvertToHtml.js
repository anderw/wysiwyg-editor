import React, {Component} from 'react'
import { isList } from './BlockUtil'
import { EditorState, convertToRaw, DefaultDraftInlineStyle } from 'draft-js'
export const defaultHtmlTag = {
  'unstyled': 'p',
  'paragraph': 'p',
  'header-one': 'h1',
  'header-two': 'h2',
  'header-three': 'h3',
  'header-four': 'h4',
  'header-five': 'h5',
  'header-six': 'h6',
  'blockquote': 'blockquote',
  'unordered-list-item': 'ul',
  'ordered-list-item': 'ol',
  'media': 'figure'
}

 function forEach(obj, callback) {
  if (obj) {
    for (const key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        callback(key, obj[key]);
      }
    }
  }
}

function getBlockStyle(data){
  let styles = ''
  forEach(data, (key, value) => {
    if (value) {
      styles += `${key}:${value}`
    }
  })
  return styles
}

function blockHtml (btr, csty, block, customStyleMap) {
    let text = block.getText()
    return btr.map((leafSet, i) => {
        let leavesForLeafSet = leafSet.get('leaves')
        let leaves = leavesForLeafSet.reduce((str, leaf) => {
            let [ start, end ] = [leaf.get('start'), leaf.get('end')]
            let styleSet = block.getInlineStyleAt(start)
            if(styleSet.size) {
                let styleObj = styleSet.reduce((map, styleName) => {
                    const mergedStyles = {}
                    const style = customStyleMap[styleName]
                    if (
                        style !== undefined &&
                        map.textDecoration !== style.textDecoration
                    ) {
                        mergedStyles.textDecoration =
                        [map.textDecoration, style.textDecoration].join(' ').trim()
                    }
                    return Object.assign(map, style, mergedStyles)
                }, {})
                if (csty) {
                    const newStyles = csty(styleSet, block)
                    styleObj = Object.assign(styleObj, newStyles)
                }
                let span = document.createElement('span')
                Object.keys(styleObj).forEach((key) => {
                    span.style[key] = styleObj[key]
                })
                span.innerHTML = text.slice(start, end)
                return str + span.outerHTML
            } else {
                return str + text.slice(start, end)
            }
        }, '')
        return leaves
    })
}

function getListBlock (listBlocks, editorState, customStyleFn, customStyleMap) {
  const listHtml = []
  let nestedListBlock = []
  let previousBlock
//   let prevDepth = 
  listBlocks.forEach((block) => {
    console.log(block.getDepth())
    let nestedBlock = false
    let tag = defaultHtmlTag[block.getType()]
    let blockTree = editorState.getBlockTree(block.getKey())
    if (!previousBlock) {
      listHtml.push(`<${tag}>`)
    } else if (previousBlock.type !== block.type) {
      let preTag = defaultHtmlTag[previousBlock.type]
      listHtml.push(`</${preTag}>`)
      listHtml.push(`<${tag}>`)
    } else if (previousBlock.depth === block.depth) {
      if (nestedListBlock && nestedListBlock.length > 0) {
        listHtml.push(getListBlock(nestedListBlock, editorState, customStyleFn, customStyleMap))
        nestedListBlock = []
      }
    } else {
      nestedBlock = true
      nestedListBlock.push(block)
    }
    if (!nestedBlock) {
      listHtml.push('<li')
      const blockStyle = getBlockStyle(block.data)
      if (blockStyle) {
        listHtml.push(` style="${blockStyle}"`)
      }
      listHtml.push('>')
      listHtml.push(blockHtml(blockTree, customStyleFn, block, customStyleMap).join(''))
      listHtml.push('</li>')
      previousBlock = block
    }
  })
  if (nestedListBlock && nestedListBlock.length > 0) {
    listHtml.push(getListBlock(nestedListBlock, editorState, customStyleFn, customStyleMap))
  }
  let preTag = defaultHtmlTag[previousBlock.type]
  listHtml.push(`</${preTag}>`)
  return listHtml.join('')
}

function getListDomBlock (listBlocks, editorState, customStyleFn, customStyleMap, dom, dept = 0, last = 0) {
    // let tag = defaultHtmlTag[block.getType()] || 'ul'
    let tagEle = document.createElement(dom)
    let htmlStr = []
    let i = 0
    // listBlocks.forEach((block, index) => {
    //    if ( dept == block.getDepth() ) {
    //         let blockTree = editorState.getBlockTree(block.getKey())
    //         htmlStr.push('<li>' + blockHtml(blockTree, customStyleFn, block, customStyleMap).join('') + '</li>')
    //    } else if ( dept < block.getDepth() ) {
    //         let blockTree = editorState.getBlockTree(block.getKey())
    //         htmlStr.push(getListDomBlock(listBlocks.slice(index), editorState, customStyleFn, customStyleMap, defaultHtmlTag[block.getType()],block.getDepth()))
    //    } else if (dept > block.getDepth()) {
    //        return false
    //    }
    // })
    for (let j = 0; j > listBlocks.length; j++)  {
        console.log(block)
        let block = listBlocks[j]
        if ( dept == block.getDepth() ) {
            let blockTree = editorState.getBlockTree(block.getKey())
            htmlStr.push('<li>' + blockHtml(blockTree, customStyleFn, block, customStyleMap).join('') + '</li>')
            i++
        } else if (i < listBlocks.length) {
           continue
        } else if ( dept < block.getDepth() ) {
            let blockTree = editorState.getBlockTree(block.getKey())
            let lArr = listBlocks.slice(i)
            let ll = lArr.length
            htmlStr.push(getListDomBlock(lArr, editorState, customStyleFn, customStyleMap, defaultHtmlTag[block.getType()],block.getDepth(), i))
            // i = lArr.length
            // console.log(lArr.length)
            i = ((ll - lArr.length) == 0) ? ll - lArr.length + i : i + ll
       }else if (dept > block.getDepth()) {
           break
       }
    }
    if ( i == listBlocks.length ) {
        listBlocks.splice(0)
    }
    tagEle.style.marginLeft = (dept * '16') + 'px'
    tagEle.innerHTML = htmlStr.join('')
    console.log(tagEle.outerHTML)
    return tagEle.outerHTML
}

export default function ConvertToHmtl (args) {
    console.log(args)
    let customStyleFn = args.customStyleFn || function () {}
    let customStyleMap = args.customStyleMap || {}
    customStyleMap = {
        ...DefaultDraftInlineStyle,
        ...customStyleMap
    }
    return (contentState, editorState) => {
        const html = []
        const { blockMap, entityMap } = contentState
        let listBlocks = []
        const rawState = convertToRaw(contentState)
        console.log(rawState)
        blockMap.forEach((block) => {
            if (isList(block.type)) {
                listBlocks.push(block)
            } else {
                if (listBlocks.length > 0) {
                    const listHtml = getListDomBlock(listBlocks, editorState, customStyleFn, customStyleMap, defaultHtmlTag[block.getType()], 0, 0)
                    html.push(listHtml)
                    listBlocks = []
                }
                let tag = defaultHtmlTag[block.getType()]
                let blockTree = editorState.getBlockTree(block.getKey())
                console.log(block.getData())
                let bd = block.getData()
                let bstyStr = ''
                if (bd.size) {
                    bstyStr = ''
                }
                
                let lineStr = blockHtml(blockTree, customStyleFn, block, customStyleMap)
                html.push(`<${tag}>${lineStr.join('')}</${tag}>`)
                console.log(tag)
            } 

        })
        if (listBlocks.length > 0) {
            const listHtml = getListDomBlock(listBlocks, editorState, customStyleFn, customStyleMap, defaultHtmlTag[listBlocks[0].getType()], 0, 0)
            html.push(listHtml);
            listBlocks = []
        }
        console.log(html.join(''))
        return html.join('')
    }
}