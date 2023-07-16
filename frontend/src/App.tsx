import {useEffect, useState} from 'react';
import {Form, message} from 'antd';
import ProductTable from './components/ProductTable';
import {createItem, deleteItem, fetchData, updateItem} from './utils.ts';
import FilterForm from './components/FilterForm.tsx';
import CreateItemModal from './components/modals/CreateProduct.tsx';
import Product from './components/modals/Product.tsx';
import EditProduct from './components/modals/EditProduct.jsx';
import "../styles/index.css"

const CrudPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterOptions, setFilterOptions] = useState({});
    const [pagination, setPagination] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [form] = Form.useForm();
    const [total, setTotal] = useState(0);
    const [sliderConfig, setSliderConfig] = useState({})

    useEffect(() => {
        fetchDataAndUpdate();
    }, [JSON.stringify(filterOptions), JSON.stringify(pagination)]);

    const fetchDataAndUpdate = async () => {
        setLoading(true);
        try {
            console.log(filterOptions, pagination)
            const data = await fetchData(filterOptions, pagination);
            console.log(data)
            setData(data.products);
            setTotal(data.total);
            setSliderConfig({quantity:{min:data.minQuantity,max:data.maxQuantity},unitPrice:{min:data.minUnitPrice,max:data.maxUnitPrice}})
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const handleTableChange = (_, __, sort) => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            sort: {
                name: sort.field,
                direction: sort.order === 'ascend' ? 'asc' : sort.order === 'descend' ? 'desc' : null,
            },
        }));
        fetchDataAndUpdate();
    };
    const handlePaginationChange = (page, pageSize) => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            pageIndex: page ,
            pageSize,
        }));
        fetchDataAndUpdate();
    }
    const handleFilterChange = (values) => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            filter: {
                nameSearch: values.nameSearch,
                unitPrice: values.unitPrice ? {
                    min: values.unitPrice[0],
                    max: values.unitPrice[1],
                }:{},
                quantity: values.quantity?{
                    min: values.quantity[0],
                    max: values.quantity[1],
                }:{},
            },
        }));
    };

    const handleCreate = async () => {
        try {
            const values = await form.validateFields();
            const response = await createItem(values);
            setData((prevData) => [...prevData, response]);
            setAddModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Error creating product:', error);
            message.error('Error creating product. Please try again.');
        }
    };

    const handleEdit = async (id, values) => {
        try {
            const response = await updateItem(id, values);
            setData((prevData) =>
                prevData.map((item) => (item._id === id ? response : item))
            );
            setEditModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Error updating product:', error);
            message.error('Error updating product. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteItem(id);
            const newData = data.filter((item) => item._id !== id);
            setData(newData);
        } catch (error) {
            console.error('Error deleting product:', error);
            message.error('Error deleting product. Please try again.');
        }
    };

    const handleView = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const handleViewModalClose = () => {
        setSelectedProduct(null);
        setModalVisible(false);
    };

    const handleEditModalOpen = (product) => {
        setSelectedProduct(product);
        setEditModalVisible(true);
    };

    const handleEditModalClose = () => {
        setSelectedProduct(null);
        setEditModalVisible(false);
    };

    return (
        <div style={{width:"100vw"}}>
        <div className="container">
            <h1>CRUD Page</h1>
            <div className="filter-form">
                <FilterForm
                    sliderConfig={sliderConfig}
                    handleFilterChange={handleFilterChange}
                    fetchData={fetchDataAndUpdate}
                    setModalVisible={setAddModalVisible}
                />
            </div>
            <div className="product-table">
                <ProductTable
                    total={total}
                    handlePaginationChange={handlePaginationChange}
                    handleEdit={handleEditModalOpen}
                    data={data}
                    loading={loading}
                    pagination={pagination}
                    handleTableChange={handleTableChange}
                    handleDelete={handleDelete}
                    handleView={handleView}
                />
            </div>
            <CreateItemModal
                visible={addModalVisible}
                handleCreate={handleCreate}
                handleClose={() => {
                    setAddModalVisible(false);
                    form.resetFields();
                }}
                form={form}
            />
            <Product
                visible={modalVisible}
                product={selectedProduct}
                handleClose={handleViewModalClose}
            />
            <EditProduct
                visible={editModalVisible}
                handleClose={handleEditModalClose}
                handleEdit={handleEdit}
                product={selectedProduct}
                form={form}
            />
        </div>
        </div>
    );
};

export default CrudPage;
