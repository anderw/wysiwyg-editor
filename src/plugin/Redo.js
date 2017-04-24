import React, { Component } from 'react'
import {Redo} from '../utils/Button'
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
        name: 'redo',
        callbacks,
        component: (props) => {
          const editorState = callbacks.getEditorState()
          const currentStyle = editorState.getCurrentInlineStyle()
          function redo () {
            let newEditorState=EditorState.redo(editorState)
            callbacks.setEditorState(newEditorState)
          }
          return (<Redo onClick={redo} />)
        }
      }
    }
}
