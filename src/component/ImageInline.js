import React, {Component} from 'react'
import classNames from 'classnames'
import { Popover } from 'antd'
import { RichUtils , Entity, AtomicBlockUtils } from 'draft-js'
class ImageInline extends Component {

    changAlignment (alignment) {
        const { callbacks, contentState, block } = this.props
        const entityKey = block.getEntityAt(0)
        contentState.mergeEntityData(entityKey, { alignment })
        this.setState({
            dummy: true
        })
    }

    render() {
        const { contentState, block } = this.props
        const entity = contentState.getEntity(block.getEntityAt(0))
        const { src, alignment, width, height } = entity.getData()
        console.log('cc')
        return (
            <span className={classNames(
                'image-alignment',
                {
                'image-left': alignment === 'left',
                'image-right': alignment === 'right',
                'image-center': !alignment || alignment === 'none',
                }
            )}>
                <Popover 
                content={<div><a className={'mr_5'} onClick={this.changAlignment.bind(this,'left')}>居左</a><a className={'mr_5'} onClick={this.changAlignment.bind(this,'none')}>居中</a><a className={'mr_5'} onClick={this.changAlignment.bind(this, 'right')}>居右</a></div>}
                title={"图片位置"}>
                    <span className="image-imagewrapper">
                        <img src={src} width={width ? width : 'auto' } height={height ? height : 'auto' }/>
                    </span>
                </Popover>
            </span>
        )
    }
}

export default ImageInline