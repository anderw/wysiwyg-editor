import React, {Component} from 'react'
import { SketchPicker, ChromePicker } from 'react-color'
import Trigger from 'rc-trigger'
import 'rc-trigger/assets/index.css'
const builtinPlacements = {
  left: {
    points: ['cr', 'cl'],
  },
  right: {
    points: ['cl', 'cr'],
  },
  top: {
    points: ['bc', 'tc'],
  },
  bottom: {
    points: ['tc', 'bc'],
  },
  topLeft: {
    points: ['bl', 'tl'],
  },
  topRight: {
    points: ['br', 'tr'],
  },
  bottomRight: {
    points: ['tr', 'br'],
  },
  bottomLeft: {
    points: ['tl', 'bl'],
  },
};


class LinkPanel extends Component {

    colorChange(color, e) {
        e.stopPropagation()
        e.preventDefault()
        const { onChange } = this.props
        onChange && onChange(color)
    }

    render() {
        const { color, children } = this.props
        console.log(children)
        return (<Trigger
                    popupPlacement="bottomLeft"
                    action={['hover']}
                    zIndex={100}
                    destroyPopupOnHide={true}
                    hideAction={['mouseLeave']}
                    builtinPlacements={builtinPlacements}
                    popup={<div>2</div>} >
                </Trigger>
        )
    }
}

export default LinkPanel