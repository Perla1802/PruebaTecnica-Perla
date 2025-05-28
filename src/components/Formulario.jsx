import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo } from "../features/users/usersSlice";
import { Card, Form, Input, Checkbox, Button, message } from "antd";

export const Formulario = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.users);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const key = "createTodo";

  const onFinish = (values) => {
    if (!selectedUser) {
      messageApi.error("Por favor selecciona un usuario primero");
      return;
    }
    messageApi.open({
      key,
      type: "loading",
      content: "Creando tarea...",
    });
    dispatch(
      createTodo({
        userId: selectedUser.id,
        title: values.title,
        completed: values.completed || false,
      })
    ).then(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Tarea creada exitosamente (ID: 201)",
        duration: 2,
      });
      form.resetFields();
    });
  };

  return (
    <>
      {contextHolder}
      <Card>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ title: "", completed: false }}
        >
          <Form.Item
            name="title"
            label="Nombre:"
            rules={[
              { required: true, message: "Ingresa el nomnbre de la tarea" },
            ]}
          >
            <Input placeholder="Tarea primera" />
          </Form.Item>
          <Form.Item name="completed" valuePropName="checked">
            <Checkbox>Completada</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              color="cyan"
              variant="solid"
              htmlType="submit"
              disabled={!selectedUser}
            >
              Guardar Tarea
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default Formulario;
