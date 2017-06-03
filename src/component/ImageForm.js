import React, {Component} from 'react'
import { Form, Icon, Tabs, message, Input, Upload, InputNumber, Row, Col, Button, Checkbox } from 'antd'
const FormItem = Form.Item
const formItemLayout = {
    labelCol: 8,
    wrapperCol: 16
}

class ImageForm extends Component {

    state = {
        imageUrl: ''
    }

    imageLoadErr (e) {
        console.log(e)
        this.setState({
            imageUrl: ''
        })
        this.props.form.resetFields()
    }


    imageLoad (e) {
       
    }

    checkImage () {

    }

    getImageInfo () {
        const { form } = this.props
        return {
            src: this.state.imageUrl,
            height: form.getFieldValue('height'),
            width: form.getFieldValue('width'),
            link: form.getFieldValue('link')
        }
    }

    changeImage (e) {
        let err = this.props.form.getFieldError('url')
        let imageUrl = ''
        if(!err && /.(jpg|png)/.test(e.target.value)) {
            imageUrl = e.target.value
        }
        this.setState({
            imageUrl
        })
    }

     fileChange (info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList)
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 文件上传成功`)
            console.log(info.file.response)
            let url = (res) => {
                    return res.file.response.resCode == '000000' ? 'http://localhost:3000' + res.file.response.file.fileUrl : ''
                }
            let imageUrl = url(info)
            this.props.form.setFieldsValue({
                url: imageUrl
            })
            this.setState({
                imageUrl: imageUrl
            })
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`)
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (<Row>
            <Col span={8}>
                <Row>
                    <Upload showUploadList={false}
                        name={'file'}
                        action={'//localhost:3000/admin/upload'}
                        onChange={this.fileChange.bind(this)}
                        beforeUpload={this.checkImage.bind(this)}
                    >
                        <Button>
                            <Icon type="upload" />上传图片
                        </Button>
                    </Upload>
                </Row>
                <Form>
                    <FormItem {...formItemLayout} label="图片地址">
                        {getFieldDecorator('url',{
                            onChange: this.changeImage.bind(this),
                            rules: [{
                                type: 'url',
                                required: false,
                                message: '图片地址必须为url'
                            }]
                        })(
                            <Input placeholder="请输入图片地址" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="图片宽度">
                        {getFieldDecorator('width')(
                            <InputNumber style={{width: '120px'}} min={0} max={10000} placeholder="请输入图片宽度" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="图片高度">
                        {getFieldDecorator('height')(
                            <InputNumber style={{width: '120px'}} min={0} max={10000} placeholder="请输入图片高度" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="图片链接">
                        {getFieldDecorator('link')(
                            <Input placeholder="请输入图片链接" />
                        )}
                    </FormItem>
                </Form>
            </Col>
            <Col span={15} offset={1}>
                <div className={'imagePreview'}>
                    {this.state.imageUrl.length ? <img onLoad={this.imageLoad.bind(this)} onError={this.imageLoadErr.bind(this)} src={this.state.imageUrl} /> : null}
                </div>
            </Col>
        </Row>)
    }
}

export default ImageForm