import React, { Component } from 'react'
import {Image} from '../utils/Button'
import { Modal, message } from 'antd'
import ImageSelectView from '../component/ImageSelectView'
import {execlusiveStyleFn} from '../utils/InlineUtil'


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
              callbacks.setEditorState(editorState)
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
