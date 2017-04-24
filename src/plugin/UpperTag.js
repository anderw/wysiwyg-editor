import React, { Component } from 'react'
import {UpperTag} from '../utils/Button'
import {execlusiveStyleFn} from '../utils/InlineUtil'
function noop() {}
export default { 
    constructor () {
      const callbacks = {
        getEditorState: noop,
        setEditorState: noop,
      };
      const upperName = 'SUPERSCRIPT'
      const execlusiveAttr = ['SUPERSCRIPT', 'SUBSCRIPT']
      return {
        name: 'super',
        callbacks,
        styleMap: {
            'SUPERSCRIPT': {
                fontSize: 11,
                position: 'relative',
                top: -8,
                display: 'inline-flex',
            }
        },
        component: (props) => {
          const editorState = callbacks.getEditorState()
          const currentStyle = editorState.getCurrentInlineStyle()
          return (<UpperTag active={currentStyle.has(upperName)} onChange={(e) => {
            callbacks.setEditorState(execlusiveStyleFn(callbacks.getEditorState(), execlusiveAttr, upperName))
          }}/>)
        }
      }
    }
}
