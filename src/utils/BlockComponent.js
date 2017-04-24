import React, { Component } from 'react'
import { RichUtils } from 'draft-js'
import { setBlockData } from '../utils/BlockUtil'
function noop() {}
export function blcokFactory(name, button) {
  return {
    constructor () {
      const callbacks = {
        getEditorState: noop,
        setEditorState: noop,
      }
      const Button = button
      return {
        name: name,
        callbacks,
        component: (props) => {
          const editorState = callbacks.getEditorState()
          const selection = editorState.getSelection()
          const blockType = editorState
                        .getCurrentContent()
                        .getBlockForKey(selection.getStartKey())
                        .getType()
          return (<Button active={blockType == name} onChange={(e) => {
            callbacks.setEditorState(RichUtils.toggleBlockType(callbacks.getEditorState(),name))
          }}/>)
        }
      }
    }
  }
}

export function dataBlockBtnFactory(name, button, type) {
  return {
    constructor () {
      const callbacks = {
        getEditorState: noop,
        setEditorState: noop,
      }
      const Button = button
      return {
        name: name,
        callbacks,
        blockStyleFn: (block) => {
            const blockAlignment = block.getData() && block.getData().get(type)
            if (blockAlignment == name) {
                return `${blockAlignment}-aligned-block`
            }
            return ''
        },
        component: (props) => {
          const editorState = callbacks.getEditorState()
          const selection = editorState.getSelection()
          let blockData = editorState.getCurrentContent()
                        .getBlockForKey(selection.getStartKey())
                        .getData()
          return (<Button active={blockData.get(type) == name} onChange={(e) => {
            callbacks.setEditorState(setBlockData(callbacks.getEditorState(),{[`${type}`] : name}))
          }}/>)
        }
      }
    }
  }
}

