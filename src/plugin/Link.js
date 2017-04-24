import React, { Component } from 'react'
import { Link } from '../utils/Button'
import {execlusiveStyleFn} from '../utils/InlineUtil'
import { LinkPanel } from '../component/LinkPanel'
import Trigger from 'rc-trigger'
import { Entity, RichUtils } from 'draft-js'
import LinkDecorator from '../component/Link'
import 'rc-trigger/assets/index.css'
import { Modal, message } from 'antd'
import { getSelectionText, getSelectionEntity } from '../utils/BlockUtil'
import LinkFrom from '../component/LinkForm'
function findLinkEntities(contentBlock, callback, contentState) {
  console.log(contentState)
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}
function noop() {}
export default { 
    constructor () {
      const callbacks = {
        getEditorState: noop,
        setEditorState: noop,
      }
      function handleFocus (e) {
        e.preventDefault()
        e.stopPropagation()
        e.currentTarget.focus()
      }
      let [textInput, urlInput, addBtn, trigger] = [null]
      let btnDisabled = false
      return {
        name: 'link',
        callbacks,
        decorator: {
          strategy: findLinkEntities,
          component: LinkDecorator
        },
        component: (props) => {
          let form = null
          const editorState = callbacks.getEditorState()
          const currentStyle = editorState.getCurrentInlineStyle()
          function addLink(){
              console.log(form)
              form.validateFieldsAndScroll((err, values) => {
                  if (err) {
                    return false
                  }
                  let { link } = values
                  let entityKey = null
                  if(link) {
                      entityKey = Entity.create('LINK', 'MUTABLE', {url: link});
                  }
                  const netEditorState = RichUtils.toggleLink(
                      editorState,
                      editorState.getSelection(),
                      entityKey
                  )
                  btnDisabled=false
                  form.resetFields()
                  callbacks.setEditorState(netEditorState)
              })
          }


          function closeLink() {
              btnDisabled=false
              callbacks.setEditorState(editorState)
          }

          function showModal() {
              let selection = editorState.getSelection()
              if (selection.isCollapsed()) {
                message.error('请选择文本！')
                return false
              }
              btnDisabled=true
              callbacks.setEditorState(editorState)
          }

          return (<div>
              <Modal title="链接设置"
                visible={btnDisabled}
                onOk={addLink}
                onCancel={closeLink}
              >
                <LinkFrom ref={(f) => { form = f }} />
              </Modal>
              <Link onClick={showModal} />
          </div>)
          /*return (<Trigger
                    popupPlacement="bottom"
                    action={['hover']}
                    ref={(c) => { trigger = c}}
                    builtinPlacements={builtinPlacements}
                    onPopupVisibleChange={(visible) => {
                    }}
                    popup={<div className="link-panel">
                        <div className="link-header">
                          <span className="link-title">文本链接</span>
                        </div>
                        <div>
                          <p className="link-line">
                            <span className="label-text">链接地址：</span>
                            <span>
                              <input type="text" onMouseDown={handleFocus} ref={(ui) => { urlInput = ui }} className="s-ipt" />
                            </span>
                          </p>
                          <p>
                            <button className="link-btn" ref={(ab) => { addBtn = ab}} onClick={addLink} >添加</button>
                          </p>
                        </div>
                      </div>}
                  >
                    <Link />
                </Trigger>)*/
        }
      }
    }
}
