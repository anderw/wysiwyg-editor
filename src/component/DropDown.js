import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'


class DropDown extends Component {

    state = {
        expanded: false,
        hightlighted: -1
    }

    setHighlighted (index) {
        this.setState({
            hightlighted: index
        })
    }

    onChange (item, val, label) {
        const { onChange } = this.props;
        if (onChange) {
            onChange(item, val, label);
        }
        this.setState({
            hightlighted: -1,
            expanded: false
        })
    }
    
    toggleExpansion (e) {
        e.stopPropagation()
        e.preventDefault()
        const {expanded, value} = this.state
        this.setState({
            expanded: !expanded
        })
    }

    getExpandList () {
        const { children } = this.props
        const { expanded, hightlighted } = this.state
        const options = children.slice(1, children.length);
        return (<ul className={'dropdown-optionwrapper'}>
            {
              React.Children.map(options, (option, index) => {
                const temp = option && React.cloneElement(
                  option, {
                    onSelect: this.onChange.bind(this, option),
                    hightlighted: hightlighted === index,
                    setHighlighted: this.setHighlighted.bind(this, index),
                    index,
                  })
                return temp
              })
            }
        </ul>)
    }

    collapse (e) {
        e.stopPropagation()
        e.preventDefault()
        this.setState({
            hightlighted: -1,
            expanded: false
        })
    }

    render() {
        const { children, className, optionWrapperClassName, style } = this.props
        const { expanded, hightlighted, label } = this.state
        let dropClass = classNames({
            'dropdown-wrapper': true,
            [`${className}`]: !!className
        })
        let expandClass = classNames({
              'dropdown-carettoclose': expanded,
              'dropdown-carettoopen': !expanded,
            })
        // console.log(dropClass)
        return (<div className={dropClass} 
                     tabIndex="0" 
                     style={style}
                     onMouseLeave={this.collapse.bind(this)}
                >
                <span className={'dropdown-selectedtext'} onMouseDown={this.toggleExpansion.bind(this)}>
                    {children[0]}
                    <span className={expandClass}></span>
                </span>
                {expanded ? this.getExpandList() : null}
            </div>)
    }
}

export default DropDown;