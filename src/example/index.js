/**
 * Created by pengzhao on 16/4/4.
 */
// import React from 'react'

import React, {Component} from 'react'
import ReactDom from 'react-dom'
import Editor from '../editor'

class MainView extends Component {


    editor = null 


    editorChange ()  {
        console.log(this.editor.getEditorHtml())
    }

    render() {
        return (
            <div>
                <Editor editorChange={this.editorChange.bind(this)} ref={(e) => { this.editor = e }} placeholder={'请输入内容'} />
                <div>
                    <p>输出内容</p>
                </div>
            </div>
        );
    }
}

ReactDom.render(<MainView />,document.getElementById('app'))



