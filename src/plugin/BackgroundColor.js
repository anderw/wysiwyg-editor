import React, { Component } from 'react'
import { ColorFill } from '../utils/Button'
import { RichUtils } from 'draft-js'
import { execlusiveStyleFn, togglePrefixStyle } from '../utils/InlineUtil'
import { SketchPicker } from 'react-color'
// import ColorPicker from 'rc-color-picker'
// import 'rc-color-picker/assets/index.css'
import ColorDrop from '../component/ColorDrop'
import { Popover, Tag } from 'antd'
const PREFIX = 'BGCOLOR_'
const defaultFontColor = 'fff'

function noop() {}
export default {
    constructor () {
      const callbacks = {
        getEditorState: noop,
        setEditorState: noop,
      }
       function customStyleFn(styleSet) {
        let rs = {}
        styleSet.forEach(style => {
            if (style.indexOf(PREFIX) !== -1) {
            const backgroundColor = '#' + style.substring(PREFIX.length);
                rs = {
                    backgroundColor
                }
            }
        })
        return rs
      }
      const applyFontColor = togglePrefixStyle(PREFIX, callbacks)
      function colorChange (color, e) {
        e.stopPropagation()
        e.preventDefault()
        console.log(color)
      }
      return {
        name: 'background-color',
        callbacks,
        customStyleFn,
        component: (props) => {
          const editorState = callbacks.getEditorState()
          const selection = editorState.getSelection()
          // const currentStyle = editorState.getCurrentInlineStyle()
          // const currentFontColor = currentStyle.find( item => item.indexOf(`${PREFIX}`) !== -1)
          // const bgColor = currentFontColor ? currentFontColor.substring(PREFIX.length) : defaultFontColor
           let btns = ['ed5565','da4453', 'fc6e51', 'e9573f', 'ffce54', 'f6bb42', 'a0d468', 'bcc152', '48cfad', '37bc9b', '4fc1e9', '38afda', '5d9cec', '4a89dc', 'ac92ec', '967adc', 'ccd1d9', 'aab2bd', '656d78', '434a54', '000000'].map((val) => {
            return (<Tag color={'#' + val} onClick={() => { applyFontColor(`${PREFIX}${val}` )}} className={'color-btn'} />)
          })
          let contents = (<div className={'color-con'}>{btns}</div>)
          return (<Popover content={contents} title="选择背景颜色" trigger="hover">
              <ColorFill />
          </Popover>)
          /*return (<ColorDrop 
                    onChange={(color) =>{
                      if(!!!color.rgb.b) {
                        return false
                      }
                      const colorString = color.hex.substring(1)
                      applyFontColor(`${PREFIX}${colorString}`)
                    }} 
                    color={bgColor} className={'drop-container fontfamily-wrapper'}>
                <ColorFill />
          </ColorDrop>)*/
        }
      }
    }
}
