import React, { Component } from 'react'
import {Undo} from '../utils/Button'
import { RichUtils, EditorState } from 'draft-js'
import {execlusiveStyleFn} from '../utils/InlineUtil'
function noop() {}
export default { 
    constructor () {
      const callbacks = {
        getEditorState: noop,
        setEditorState: noop,
      }
      return {
        name: 'undo',
        callbacks,
        component: (props) => {
          const editorState = callbacks.getEditorState()
          const currentStyle = editorState.getCurrentInlineStyle()
          function undo () {
            let newEditorState=EditorState.undo(editorState)
            callbacks.setEditorState(newEditorState)
          }
          return (<Undo onClick={undo} />)
        }
      }
    }
}
