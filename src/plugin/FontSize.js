import React, { Component } from 'react'
import {BottomTag} from '../utils/Button'
import {execlusiveStyleFn} from '../utils/InlineUtil'
import DropDown from '../component/DropDown'
import DropItem from '../component/DropItem'
import { Select } from 'antd'
const { Option }  = Select
function noop() {}
export default { 
    constructor () {
      const callbacks = {
        getEditorState: noop,
        setEditorState: noop,
      }
      let showVal = '16px'
      let fontNames = []
      let fontItems = []
      let styleMap =(() => {
          let rs = {}
          for(let i = 8; i <= 48; i= i+2) {
            rs[`fontSize_${i}`] = { fontSize: `${i}px`}
            fontNames.push(`fontSize_${i}`)
            fontItems.push({value:`fontSize_${i}`,label: `${i}px`})
          }
         return rs
      })()

      return {
        name: 'font-size',
        callbacks,
        styleMap: {
            ...styleMap
        },
        component: (props) => {
          const editorState = callbacks.getEditorState()
          const currentStyle = editorState.getCurrentInlineStyle()
          const fontSizeChange = (item, val, label) => {
              let e = window.event || {}
              e.stopPropagation()
              e.preventDefault()
              showVal = item
              console.log('fontsize')
              callbacks.setEditorState(execlusiveStyleFn(callbacks.getEditorState(), fontNames, item))
          }
          let currFontSize = fontNames.find((font) => {
              return currentStyle.has(font)
          })
          if(currFontSize) {
              showVal = currFontSize
          }else{
              showVal = '字号'
          }
          console.log(showVal)
          return (<div className={'drop-container fontsize-wrapper'}>
              <Select style={{width:'80px'}}
                    onChange={fontSizeChange}
                    value={showVal} >
                    {fontItems.map((item) => {
                        return (<Option value={item.value}>{item.label}</Option>)
                    })}
            </Select>
          </div>)
          /*return (<div className={'drop-container fontsize-wrapper'}>
            <DropDown onChange={fontSizeChange}>
                <span>{showVal}</span>
                {fontItems.map((item) => {
                    return <DropItem active={item.value == currFontSize} value={item.value}>{item.label}</DropItem>
                })}
            </DropDown>
          </div>)*/
        }
      }
    }
}
