import React, { Component } from 'react'
import { UnLink } from '../utils/Button'
import { RichUtils, EditorState } from 'draft-js'
import { message } from 'antd'
import {execlusiveStyleFn} from '../utils/InlineUtil'
function noop() {}
export default { 
    constructor () {
      const callbacks = {
        getEditorState: noop,
        setEditorState: noop,
      }
      return {
        name: 'unlink',
        callbacks,
        component: (props) => {
          const editorState = callbacks.getEditorState()
          const currentStyle = editorState.getCurrentInlineStyle()
          const selection = editorState.getSelection()
          function clearLink () {
            if (!selection.isCollapsed()) {
              callbacks.setEditorState(RichUtils.toggleLink(editorState, selection, null))
            } else {
              message.error("移除链接前请先选中链接！");
            }
          }
          return (<UnLink onClick={clearLink} />)
        }
      }
    }
}
