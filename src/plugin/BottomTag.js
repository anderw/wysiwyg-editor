import React, { Component } from 'react'
import {BottomTag} from '../utils/Button'
import {execlusiveStyleFn} from '../utils/InlineUtil'
function noop() {}
export default { 
    constructor () {
      const callbacks = {
        getEditorState: noop,
        setEditorState: noop,
      };
      const upperName = 'SUBSCRIPT'
      const execlusiveAttr = ['SUPERSCRIPT', 'SUBSCRIPT']
      return {
        name: 'bottom',
        callbacks,
        styleMap: {
            'SUBSCRIPT': {
                fontSize: 11,
                position: 'relative',
                bottom: -8,
                display: 'inline-flex',
            }
        },
        component: (props) => {
          const editorState = callbacks.getEditorState()
          const currentStyle = editorState.getCurrentInlineStyle()
          return (<BottomTag active={currentStyle.has(upperName)} onChange={(e) => {
            callbacks.setEditorState(execlusiveStyleFn(callbacks.getEditorState(), execlusiveAttr, upperName))
          }}/>)
        }
      }
    }
}
