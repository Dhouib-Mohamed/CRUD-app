import { Modal } from 'antd';

const Product = ({ visible, product, handleClose }) => {
    return (
        <Modal
            title="Product Details"
    visible={visible}
    onCancel={handleClose}
    footer={null}
        >
        {/* Render product details */}
        <p>Name: {product?.name}</p>
    <p>Unit Price: {product?.unitPrice}</p>
    <p>Quantity: {product?.quantity}</p>
    </Modal>
);
};

export default Product;
