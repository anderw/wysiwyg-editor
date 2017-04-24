import React, { Component } from 'react'
import {BottomTag} from '../utils/Button'
import { RichUtils } from 'draft-js'
import {execlusiveStyleFn} from '../utils/InlineUtil'
import DropDown from '../component/DropDown'
import DropItem from '../component/DropItem'
import { Select } from 'antd'
const { Option }  = Select
function noop() {}
export default { 
    constructor () {
      const callbacks = {
        getEditorState: noop,
        setEditorState: noop,
      }
      let showVal = 'Normal'
      let headerItems = [
                {
                    label: 'Normal',
                    value: 'unstyled'
                },
                {
                    label: 'H1',
                    value: 'header-one'
                },
                {
                    label: 'H2',
                    value: 'header-two'
                },
                {
                    label: 'H3',
                    value: 'header-three'
                },
                {
                    label: 'H4',
                    value: 'header-four'
                },
                {
                    label: 'H5',
                    value: 'header-five'
                },
                {
                    label: 'H6',
                    value: 'header-six'
                },
                {
                    label: 'Blockquote',
                    value: 'blockquote'
                }
            ]
      function blockChange (val) {
          showVal = val
          callbacks.setEditorState(RichUtils.toggleBlockType(editorState,val), true)
      }
      return {
        name: 'header-block',
        callbacks,
        component: (props) => {
          const editorState = callbacks.getEditorState()
          const selection = editorState.getSelection()
          const blockType = editorState
                        .getCurrentContent()
                        .getBlockForKey(selection.getStartKey())
                        .getType()
        function blockChange (val) {
          showVal = val
          callbacks.setEditorState(RichUtils.toggleBlockType(editorState,val), true)
        }
        //   if(blockType) {
        showVal = (headerItems.find((item) => {
            return item.value == blockType
        }) || {}).label || 'Normal'
        return (<div className={'drop-container fontfamily-wrapper'}>
              <Select style={{width:'120px'}}
                    onChange={blockChange}
                    value={showVal} >
                    {headerItems.map((item) => {
                        return (<Option value={item.value}>{item.label}</Option>)
                    })}
            </Select>
          </div>)
          /*return (<div className={'drop-container header-wrapper'}>
            <DropDown onChange={(item, val, label) => {
                callbacks.setEditorState(RichUtils.toggleBlockType(editorState,val), true)
            }}>
                <span>{showVal}</span>
                {headerItems.map((item) => {
                    return <DropItem active={item.value == blockType} value={item.value}>{item.label}</DropItem>
                })}
            </DropDown>
          </div>)*/
        }
      }
    }
}
