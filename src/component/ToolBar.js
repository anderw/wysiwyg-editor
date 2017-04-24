import React, {Component} from 'react';
import {List} from 'immutable'
import DropDown from '../component/DropDown'
import DropItem from '../component/DropItem'

class ToolBar extends Component {

    buttons = List()

    constructor (props) {
        super(props)
    }

    // changeEditor () {
    // }

    // refreshToolbar () {
    //     return this.plugins.map((plugin) => {
    //         return plugin.component()
    //     })
    // }

    render() {
        const {children} = this.props
        // const buttons = this.refreshToolbar()
        return (
           <div className={'editor-toolbar'}>
               {children}
           </div>
        )
    }
}

export default ToolBar;