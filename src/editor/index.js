import React, {Component} from 'react'
import ToolBar from 'component/ToolBar'
import {
    Editor,
    EditorState,
    RichUtils,
    CompositeDecorator
} from 'draft-js'
import { convertToHTML, convertFromHTML } from 'draft-convert'
import 'antd/dist/antd.css'
import 'draft-js/dist/Draft.css'
import 'assets/css/index.css'
import 'assets/css/dropdown.css'
import 'assets/css/editor-ext.css'
import { List, Map } from 'immutable'
import Store from './store'
console.log(convertToHTML)
const MAX_DEEPTH = 5
import defaultPlugins from './defualtPlugin'
import CreateConvertHtml from 'utils/ConvertTohtml'

// const store = new Store()

// const convertHtml = CreateConvertHtml()

class WysiwygEditor extends Component {
    
    state = {
        editorState: EditorState.createEmpty()
    }

    plugins = List([])

    store = new Store()

    constructor(props) {
        super(props)
        this.plugins = this.plugins.concat(props.plugins || []).flatten(true).concat(defaultPlugins)
        this.plugins = this.initPlugin()
        this.initCustomStyleMap()
        this.initBlockStyleFn()
        this.initBlockRenderFn()
        this.getDecorator()
        this.initConvert()
        
        this.store.set('customStyleFn', this.customStyleFn.bind(this))
        this.convertHtml = CreateConvertHtml({
            customStyleFn: this.customStyleFn.bind(this),
            customStyleMap: this.store.get('customStyleMap')
        })
    }

    initPlugin () {
        const enableCallbacks = ['getEditorState', 'setEditorState', 'getStyleMap', 'setStyleMap']
        return this.plugins.map((plugin) => {
            plugin = plugin.constructor()
            enableCallbacks.forEach( callbackName => {
                if (plugin.callbacks.hasOwnProperty(callbackName)) {
                    plugin.callbacks[callbackName] = this[callbackName].bind(this);
                }
            })
            return plugin
        })
    }

    getDecorator () {
        let decorators = []
        this.plugins.forEach((plugin) => {
            let {decorator} = plugin
            if(decorator) {
                decorators.push(decorator)
            }
        })
        this.store.set('decorators', decorators)
    }

    getBlockStyleFn () {
        const blocksStyleFn = this.store.get('blockStyleFn') 
        return ((block) => {
            let styles = blocksStyleFn.reduce((state, func) => {
                let rs = func(block)
                return state.concat([rs])
            }, [])
            return styles.filter((s) => (s.length > 0 )).join(' ') 
        })
    }

    blockRendererFn (contentBlock) {
        const blocksRender = this.store.get('blockRendererFn')
        let blkRender = null
        blocksRender.forEach((bf) => {
            const cl = bf(contentBlock)
            if (cl) {
                blkRender = cl
            }
        })
        return blkRender
    }
    initBlockStyleFn () {
        let blocksStyleFn = []
        this.plugins.forEach((plugin) => {
            let {blockStyleFn} = plugin
            if(blockStyleFn) {
                blocksStyleFn.push(blockStyleFn)
            }
        })
        this.store.set('blockStyleFn', blocksStyleFn)
    }

    initBlockRenderFn () {
        let blksRendererFn =  []
        this.plugins.forEach(plugin => {
            let { blockRendererFn } = plugin
            if (blockRendererFn) {
                blksRendererFn.push(blockRendererFn)
            }
        })
        this.store.set('blockRendererFn', blksRendererFn)
    }

    initCustomStyleMap() {
        const customStyleMap = {}
        this.plugins.forEach((plugin) => {
            let {styleMap} = plugin
            if(styleMap){
                for (const key in styleMap) {
                    if (styleMap.hasOwnProperty(key)) {
                        customStyleMap[key] = styleMap[key];
                    }
                }
            }
        })
        this.store.set('customStyleMap', customStyleMap)
    }

    customStyleFn (styleSet) {
        if (styleSet.size === 0) {
            return {};
        }
        let resultStyle = {}
        this.plugins.forEach((plugin) => {
            const {customStyleFn} = plugin
            if (customStyleFn) {
                const styled = customStyleFn(styleSet)
                Object.assign(resultStyle, styled)
            }
        })
        return resultStyle
    }

    componentWillMount() {
        let editorState = this.createEditorState(new CompositeDecorator(this.store.get('decorators')))

    }

    initConvert () {
        this.convertStateToHtml = convertToHTML({
            styleToHTML : (style) => {
                console.log(this.store.get('customStyleMap'))
                if (style.indexOf('FONTCOLOR_')  !== -1) {
                    const color = '#' + style.substring('FONTCOLOR_'.length)
                    return <span style={{color}}/>
                } else if (style.indexOf('BGCOLOR_')  !== -1) {
                    const backgroundColor = '#' + style.substring('BGCOLOR_'.length)
                    return <span style={{backgroundColor}}/>
                }
                
            }
        })

    }
    
    createEditorState (compositeDecorator) {
        let editorState = null
        editorState = EditorState.createEmpty(compositeDecorator)
        this.setState({
            editorState
        })
        return editorState
    }

    _onTab(event) {
        let {editorState} = this.state
        let newEditorState = RichUtils.onTab(event, editorState, MAX_DEEPTH)
        if (newEditorState !== editorState) {
            this.setEditorState(newEditorState)
        }
    }

    editorFocus() {
        this.editor.focus()
    }

    getEditorState() {
        return this.state.editorState
    }

    setEditorState (editorState,focus){
        const { editorChange } = this.props
        this.setState({editorState},() => {
            if(focus){
                this.editorFocus()
            }
            if (editorChange) {
                editorChange()
            }
        })
    }

    getEditorHtml () {
        // let html = this.convertStateToHtml(this.state.editorState.getCurrentContent())
        this.convertHtml(this.state.editorState.getCurrentContent(), this.state.editorState)
        // return html    
    }

    refreshToolbar () {
        return this.plugins.map((plugin) => {
            return  plugin.component && plugin.component() 
        }).toJS()
    }

    render() {
        const props = this.props
        const toolbars = this.refreshToolbar()
        return (<div className={'editor-wrapper'}>
            <ToolBar>
                {toolbars}
            </ToolBar>
            <div className={'RichEditor-editor'}>
            <Editor editorState={this.state.editorState}
                    placeholder={props.placeholder}
                    onChange={this.setEditorState.bind(this)}
                    onTab={this._onTab.bind(this)}
                    customStyleMap={this.store.get('customStyleMap')}
                    blockStyleFn={this.getBlockStyleFn()}
                    blockRendererFn={this.blockRendererFn.bind(this)}
                    customStyleFn={this.customStyleFn.bind(this)}
                    ref={(editor) => { this.editor = editor }}
            />
            </div>
        </div>)
    }
}

export default WysiwygEditor;