import React, {Component} from 'react'
import { isList } from './BlockUtil'
import { EditorState } from 'draft-js'
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
  'unordered-list-item': {
    element: 'li',
    nest: 'ul'
  },
  'ordered-list-item': {
    element: 'li',
    nest: 'ol'
  },
  'media': 'figure'
}

export default function ConvertToHmtl (args) {
    console.log(args)
    let customStyleFn = args.customStyleFn || function () {}
    let customStyleMap = args.customStyleMap || {}
    return (contentState, editorState) => {
        const html = []
        const { blockMap, entityMap } = contentState
        let listBlocks = []
        blockMap.forEach((block) => {
            if (isList(block.type)) {
                listBlocks.push(block)
            } else {
                if (listBlocks.length > 0) {
                    const listHtml = ''
                    html.push(listHtml)
                    listBlocks = []
                }
                let tag = defaultHtmlTag[block.getType()]
                let blockTree = editorState.getBlockTree(block.getKey())
                console.log(blockTree.get('leaves'))
                let text = block.getText()
                let lineStr = blockTree.map((leafSet, i) => {
                    let leavesForLeafSet = leafSet.get('leaves')
                    let leaves = leavesForLeafSet.reduce((str, leaf) => {
                        let [ start, end ] = [leaf.get('start'), leaf.get('end')]
                        let styleSet = block.getInlineStyleAt(start)
                        if(styleSet.size) {
                            let styleObj = styleSet.reduce((map, styleName) => {
                                const mergedStyles = {};
                                const style = customStyleMap[styleName];

                                if (
                                    style !== undefined &&
                                    map.textDecoration !== style.textDecoration
                                ) {
                                    // .trim() is necessary for IE9/10/11 and Edge
                                    mergedStyles.textDecoration =
                                    [map.textDecoration, style.textDecoration].join(' ').trim();
                                }
                                return Object.assign(map, style, mergedStyles)
                            }, {})
                            if (customStyleFn) {
                                const newStyles = customStyleFn(styleSet, block)
                                styleObj = Object.assign(styleObj, newStyles)
                            }
                            console.log(styleObj)
                            // let styleStr = Object.keys(styleObj).reduce((s, stl) => {
                            //     return `${s}${stl}`
                            // }, '')
                            // let parent = document.createElement('p')
                            let span = document.createElement('span')
                            // console.log(span.style)
                            Object.keys(styleObj).forEach((key) => {
                                span.style[key] = styleObj[key]
                            })
                            return str + span.outerHTML
                        } else {
                            return str + text.slice(start, end)
                        }
                    }, '')
                    console.log(leaves)
                    return leaves
                })
                html.push(`<${tag}>${lineStr.join('')}</${tag}>`)
                console.log(tag)
            }

        })
        console.log(html.join(''))
        return html.join('')
    }
}