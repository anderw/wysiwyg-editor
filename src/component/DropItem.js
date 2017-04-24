import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

class DropItem extends Component {

    static get defaultProps (){
        return {disabled : false}
    }

    onClick (e) {
        e.preventDefault()
        e.stopPropagation()
        const { value, onClick, onSelect, disabled, children } = this.props
        if( !disabled ){
            if (onSelect) {
                onSelect(value, children)
            }
            if (onClick) {
                onClick(value, children)
            }
        }
    }
    
    resetHightLight (e) {
        const { setHighlighted } = this.props
        setHighlighted(-1)
    }



    setHighlighted (e) {
        const { setHighlighted,index } = this.props
        setHighlighted(index)
    }

    render() {
        const {children, disabled, active, hightlighted} = this.props
        const itemClass = classNames({
            'dropdownoption-default': true,
            'dropdownoption-disabled': disabled,
            'dropdownoption-highlighted': hightlighted,
            'dropdownoption-active': active
        })
        return (
            <li onMouseEnter={this.setHighlighted.bind(this)}
                onMouseLeave={this.resetHightLight.bind(this)}
                onMouseDown={this.onClick.bind(this)}
                className={itemClass}
            >
                {children} 
            </li>
        );
    }
}

export default DropItem;