import React, {Component} from 'react'
import { Form, Icon, Tabs, Input, Upload, InputNumber, Row, Col, Button, Checkbox } from 'antd'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
const formItemLayout = {
    labelCol: 8,
    wrapperCol: 16
}
class ImageSelectVeiw extends Component {

    tabChange (e) {
        console.log(e)
    }

    render () {
        const { getFieldDecorator } = this.props.form
        return (<Tabs defaultActiveKey="setting" style={{minHeight:'300px'}} onChange={this.tabChange.bind(this)}>
            <TabPane tab="图片设置" key="setting">
                <Row>
                    <Col span={8}>
                        <Row>
                            <Upload showUploadList={false}
                                name={'files'}
                                action={'/upload'}
                            >
                                <Button>
                                    <Icon type="upload" />上传图片
                                </Button>
                            </Upload>
                        </Row>
                        <Form>
                            <FormItem {...formItemLayout} label="图片地址">
                                {getFieldDecorator('url')(
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
                        <div className={'imagePreview'}/>
                    </Col>
                </Row>
            </TabPane>
            <TabPane tab="图片列表" key="list">33</TabPane>
        </Tabs>)
    }
}
ImageSelectVeiw = Form.create()(ImageSelectVeiw)
export default ImageSelectVeiw