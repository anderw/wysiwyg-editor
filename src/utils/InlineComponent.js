import React, { Component } from 'react'
import { RichUtils } from 'draft-js'
function noop() {}
export function inlineFactory(name, button) {
  return {
    constructor () {
      const callbacks = {
        getEditorState: noop,
        setEditorState: noop,
      };
      const upperName = name.toUpperCase()
      const Button = button
      return {
        name: name,
        callbacks,
        component: (props) => {
          const editorState = callbacks.getEditorState()
          const currentStyle = editorState.getCurrentInlineStyle()
          return (<Button active={currentStyle.has(upperName)} onChange={(e) => {
            callbacks.setEditorState(RichUtils.toggleInlineStyle(callbacks.getEditorState(),upperName))
          }}/>)
        }
      }
    }
  }
}
