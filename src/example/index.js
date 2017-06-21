/**
 * Created by pengzhao on 16/4/4.
 */
// import React from 'react'

import React, {Component} from 'react'
import ReactDom from 'react-dom'
import Editor from '../editor'

class MainView extends Component {


    editor = null

    state = {
        editorHtml: ''
    }

    editorChange ()  {
        console.log(this.editor.getEditorHtml())
        let editorHtml = this.editor.getEditorHtml()
        console.log(editorHtml)
        this.setState({
            editorHtml
        })
    }

    render() {
        console.log(this.state.editorHtml)
        return (
            <div>
                <Editor editorChange={this.editorChange.bind(this)} ref={(e) => { this.editor = e }} placeholder={'请输入内容'} />
                <div>
                    <p>输出内容</p>
                    <div dangerouslySetInnerHTML={{__html: this.state.editorHtml}} />
                </div>
            </div>
        );
    }
}

ReactDom.render(<MainView />,document.getElementById('app'))



