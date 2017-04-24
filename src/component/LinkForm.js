import React, {Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'

const FormItem = Form.Item
const formItemLayout = {
      labelCol: 8,
      wrapperCol: 16
    };
class LinkForm extends Component {

    render () {
        const { getFieldDecorator } = this.props.form
        return (<Form>
            <FormItem {...formItemLayout} label="链接地址">
            {getFieldDecorator('link', {
                rules: [{ required: true, type: 'url', message: '请输入正确的链接地址' }],
            })(
                <Input placeholder="请输入链接地址" />
            )}
            </FormItem>
        </Form>)
    }
}
LinkForm = Form.create()(LinkForm)
export default LinkForm