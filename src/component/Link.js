import React, { Component, PropTypes } from 'react'
import openlink from '../assets/icon/openlink.svg'
import { Entity } from 'draft-js'

class Link extends Component {

  static propTypes = {
    entityKey: PropTypes.string.isRequired,
    children: PropTypes.array,
    contentState: PropTypes.object
  }

  state = {
    showPopOver: false,
  }

  openLink ()  {
    const { entityKey, contentState } = this.props
    const { url } = Entity.get(entityKey).getData()
    const linkTab = window.open(url, 'blank') // eslint-disable-line no-undef
    linkTab.focus()
  }

  toggleShowPopOver ()  {
    const showPopOver = !this.state.showPopOver
    this.setState({
      showPopOver,
    })
  }

  render() {
    const { contentState, block } = this.props
    const entity = contentState.getEntity(block.getEntityAt(0))
    const { url, title } = entity.getData()
    const { showPopOver } = this.state
    return (
      <span
        className="link-decorator-wrapper"
        onMouseEnter={this.toggleShowPopOver.bind(this)}
        onMouseLeave={this.toggleShowPopOver.bind(this)}
      >
        <a href={url}>{children}</a>
        {showPopOver ?
          <img
            src={openlink}
            role="presentation"
            onClick={this.openLink.bind(this)}
            className="link-decorator-icon"
          />
          : undefined
        }
      </span>
    )
  }
}

export default Link