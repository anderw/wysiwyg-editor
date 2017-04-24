import React, { Component } from 'react'
import {Clear} from '../utils/Button'
import {execlusiveStyleFn} from '../utils/InlineUtil'
function noop() {}
export default { 
    constructor () {
      const callbacks = {
        getEditorState: noop,
        setEditorState: noop,
      }
      return {
        name: 'clear',
        callbacks,
        component: (props) => {
          const editorState = callbacks.getEditorState()
          const currentStyle = editorState.getCurrentInlineStyle()
          return (<Clear />)
        }
      }
    }
}
