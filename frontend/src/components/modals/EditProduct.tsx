import { Modal, Form, Input, InputNumber } from 'antd';

const EditProduct = ({ visible, handleClose, handleEdit, product, form }) => {
    const onFinish = async () => {
        try {
            const values = await form.validateFields();
            handleEdit(product._id, values);
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    return (
        <Modal
            title="Edit Product"
            visible={visible}
            onCancel={handleClose}
            onOk={onFinish}
            destroyOnClose
        >
            <Form form={form} layout="vertical" initialValues={product}>
                <Form.Item
                    name="name"
                    label="Name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="unitPrice"
                    label="Unit Price"
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="quantity"
                    label="Quantity"
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditProduct;
