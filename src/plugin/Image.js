import React, { Component } from 'react'
import {Image} from '../utils/Button'
import { Modal, message } from 'antd'
import ImageSelectView from '../component/ImageSelectView'
import {execlusiveStyleFn} from '../utils/InlineUtil'
import { Entity, RichUtils, AtomicBlockUtils } from 'draft-js'
import ImageInline from '../component/ImageInline'

function noop() {}
export default {
    constructor () {
      const callbacks = {
        getEditorState: noop,
        setEditorState: noop,
      }
      let imgShow = false
      return {
        name: 'image',
        callbacks,
        blockRendererFn : (block) => {
          const editorState = callbacks.getEditorState()
          if (block.getType() === 'atomic') {
            const entity = editorState.getCurrentContent().getEntity(block.getEntityAt(0))
            if (entity && entity.type === 'IMAGE') {
              return {
                component: ImageInline,
                editable: false,
                props: {
                  callbacks
                }
              }
            }
            return undefined
          }
        },
        component: (props) => {
          const editorState = callbacks.getEditorState()
          const currentStyle = editorState.getCurrentInlineStyle()
          // return (<Image />)
          function showModal() {
              imgShow=true
              callbacks.setEditorState(editorState)
          }
          function closeImage() {
              imgShow=false
              callbacks.setEditorState(editorState)
          }

          function insertImage () {
              imgShow=false
              let info = imgView.refs.wrappedComponent.refs.formWrappedComponent.getImageInfo()
              imgView.refs.wrappedComponent.refs.formWrappedComponent.clearImage()
              let entityKey = editorState.getCurrentContent().createEntity('IMAGE', 'IMMUTABLE', info).getLastCreatedEntityKey()
              let newEditorState = AtomicBlockUtils.insertAtomicBlock(
                  editorState,
                  entityKey,
                  ' '
              )
              callbacks.setEditorState(newEditorState)
          }
          let imgView = null
          // return (<Image onClick={showModal} />)
          return (<div>
              <Modal title="图片选择"
                visible={imgShow}
                style={{top: 20}}
                onOk={insertImage}
                width={580}
                onCancel={closeImage}
              >
                <ImageSelectView ref={(v) => { imgView = v }} />
              </Modal>
              <Image onClick={showModal} />
          </div>)
        }
      }
    }
}
