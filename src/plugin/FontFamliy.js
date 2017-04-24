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
      let showVal = '字体'
      let fontNames = []
      let fontItems = []
      let styleMap = {
        'FONT-SONG': {
            'fontFamily': '宋体'
        },
        'FONT-HEI': {
            'fontFamily': '黑体'
        },
        'FONT-KAI': {
            'fontFamily': '楷体'
        },
        'FONT-YAHEI': {
            'fontFamily': '微软雅黑'
        },
        'FONT-Arial': {
            'fontFamily': 'Arial'
        },
        'FONT-Georgia': {
            'fontFamily': 'Georgia'
        },
        'FONT-Impact': {
            'fontFamily': 'Impact'
        },
        'FONT-Tahoma': {
            'fontFamily': 'Tahoma'
        },
        'FONT-Verdana': {
            'fontFamily': 'Verdana'
        }
      }

      Object.keys(styleMap).forEach((style) => {
        fontNames.push(style)
        fontItems.push({value: style, label: styleMap[style]['fontFamily']})
      })
      

      return {
        name: 'font-family',
        callbacks,
        styleMap: {
            ...styleMap
        },
        component: (props) => {
          const editorState = callbacks.getEditorState()
          const currentStyle = editorState.getCurrentInlineStyle()
          const fontFamilyChange = (item, val, label) => {
              showVal = item
              callbacks.setEditorState(execlusiveStyleFn(callbacks.getEditorState(), fontNames, item))
          }
          let currFontFamily = fontNames.find((font) => {
              return currentStyle.has(font)
          })
          if(currFontFamily) {
              showVal = currFontFamily
          }else{
              showVal = '默认'
          }
          return (<div className={'drop-container fontfamily-wrapper'}>
              <Select style={{width:'80px'}}
                    onChange={fontFamilyChange}
                    value={showVal} >
                    {fontItems.map((item) => {
                        return (<Option value={item.value}>{item.label}</Option>)
                    })}
            </Select>
          </div>)
          /*return (<div className={'drop-container fontfamily-wrapper'}>
            <DropDown onChange={fontFamilyChange}>
                <span>{showVal}</span>
                {fontItems.map((item) => {
                    return <DropItem active={item.value == currFontFamily} value={item.value}>{item.label}</DropItem>
                })}
            </DropDown>
          </div>)*/
        }
      }
    }
}
