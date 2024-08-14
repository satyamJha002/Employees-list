import React, { useEffect } from "react";
import { Form, Input, Button, Radio } from "antd";

const EditEmployeeForm = ({ employee, onSave, onClose }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (employee) {
      form.setFieldsValue(employee);
    }
  }, [employee, form]);

  const handleSubmit = (values) => {
    onSave({ ...employee, ...values });
  };

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="f_Id"
        label="Unique Id"
        rules={[{ required: true, message: "Please input the Id" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="f_Name"
        label="Name"
        rules={[{ required: true, message: "Please input the name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="f_Email"
        label="Email"
        rules={[{ required: true, message: "Please input the email!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="f_Mobile" label="Mobile No.">
        <Input />
      </Form.Item>

      <Form.Item label="Designation" name="f_Designation">
        <Select>
          <Select.Option value="hr">HR</Select.Option>
          <Select.Option value="sale">Sale</Select.Option>
          <Select.Option value="manager">Manager</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="f_Gender" label="Gender">
        <Radio.Group onChange={onChange}></Radio.Group>
      </Form.Item>
      {/* Add more fields as needed */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button onClick={onClose} style={{ marginLeft: 8 }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditEmployeeForm;
