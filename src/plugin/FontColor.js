import React, { Component } from 'react'
import { ColorText } from '../utils/Button'
import { RichUtils } from 'draft-js'
import { execlusiveStyleFn, togglePrefixStyle } from '../utils/InlineUtil'
import { SketchPicker } from 'react-color'
// import ColorPicker from 'rc-color-picker'
// import 'rc-color-picker/assets/index.css'
import ColorDrop from '../component/ColorDrop'
import { Popover, Tag } from 'antd'
const PREFIX = 'FONTCOLOR_'
const defaultFontColor = '000'

function noop() {}
export default {
    constructor () {
      const callbacks = {
        getEditorState: noop,
        setEditorState: noop,
      }
       function customStyleFn(styleSet) {
        return styleSet.map(style => {
            if (style.indexOf(PREFIX) !== -1) {
            const color = '#' + style.substring(PREFIX.length);
                return {
                    color,
                }
            }
            return {};
        }).reduce(Object.assign);
      }
      const applyFontColor = togglePrefixStyle(PREFIX, callbacks)
      function colorChange (color, e) {
        e.stopPropagation()
        e.preventDefault()
        console.log(color)
      }
      
      return {
        name: 'font-color',
        callbacks,
        customStyleFn,
        component: (props) => {
          const editorState = callbacks.getEditorState()
          const selection = editorState.getSelection()
          const currentStyle = editorState.getCurrentInlineStyle()
          const currentFontColor = currentStyle.find( item =>{
              return item.indexOf(`${PREFIX}`) !== -1
          })
          const fontColor = currentFontColor ? currentFontColor.substring(PREFIX.length) : defaultFontColor
          console.log('tool bars ...' + fontColor)
          let btns = ['ed5565','da4453', 'fc6e51', 'e9573f', 'ffce54', 'f6bb42', 'a0d468', 'bcc152', '48cfad', '37bc9b', '4fc1e9', '38afda', '5d9cec', '4a89dc', 'ac92ec', '967adc', 'ccd1d9', 'aab2bd', '656d78', '434a54', '000000'].map((val) => {
            return (<Tag color={'#' + val} onClick={() => { applyFontColor(`${PREFIX}${val}` )}} className={'color-btn'} />)
          })
          let contents = (<div className={'color-con'}>{btns}</div>)
          return (<Popover content={contents} title="选择字体颜色" trigger="hover">
              <ColorText />
          </Popover>)
          /*return (<ColorDrop 
                    onChange={(color) =>{
                      console.log('complete')
                      if(!!!color.rgb.b) {
                        return false
                      }
                      console.log('font color ...')
                      const colorString = color.hex.substring(1)
                      console.log('change color ....' + colorString)
                      applyFontColor(`${PREFIX}${colorString}`)
                    }} 
                    color={fontColor} className={'drop-container fontfamily-wrapper'}>
                <ColorText />
          </ColorDrop>)*/
        }
      }
    }
}
