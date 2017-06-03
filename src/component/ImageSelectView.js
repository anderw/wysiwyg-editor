import React, {Component} from 'react'
import { Form, Icon, Tabs, message, Input, Upload, InputNumber, Row, Col, Button, Checkbox } from 'antd'
import ImageForm  from './ImageForm'
const TabPane = Tabs.TabPane

class ImageSelectVeiw extends Component {

    state = {
        imageUrl : '',
        tabKey: '',
        selectImage: ''
    }

    imageForm = null

    tabChange (key) {
        console.log(e)
        this.setState({
            tabKey: key
        })
    }

    getImageInfo () {
        return this.imageForm.getImageInfo()
    }



    clearImage () {
        const { resetFields } = this.props.form
        resetFields()
        this.imageForm.setState({
            imageUrl: ''
        })
    }

    render () {
        const { form } = this.props
        return (<Tabs activeKey="setting" style={{minHeight:'300px'}} onChange={this.tabChange.bind(this)}>
            <TabPane tab="图片设置" key="setting">
                <ImageForm form={form} ref={(f) => this.imageForm = f}/>
            </TabPane>
            {this.props.showList ? <TabPane tab="图片列表" key="list">33</TabPane> : null}
        </Tabs>)
    }
}
ImageSelectVeiw = Form.create({withRef:true})(ImageSelectVeiw)
export default ImageSelectVeiw