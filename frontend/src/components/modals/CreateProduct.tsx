import { Modal, Form, Input, InputNumber } from 'antd';

const CreateProduct = ({ visible, handleCreate, handleClose, form , values = {}}) => {
    const handleModalOk = async () => {
        try {
            await form.validateFields();
            handleCreate();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <Modal
            title="Add New Product"
            visible={visible}
            onOk={handleModalOk}
            onCancel={() => {
                handleClose();
                form.resetFields();
            }}
        >
            <Form form={form} layout="vertical" initialValues={values}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the product name',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="unitPrice"
                    label="Unit Price"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the unit price',
                        },
                    ]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="quantity"
                    label="Quantity"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the quantity',
                        },
                    ]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateProduct;
