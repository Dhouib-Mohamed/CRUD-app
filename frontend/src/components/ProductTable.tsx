import {Table, Space, Button, Pagination} from 'antd';

const ProductTable = ({ data, loading, pagination, handlePaginationChange, handleTableChange, handleDelete, handleView , handleEdit , total }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: true,
        },
        {
            title: 'Unit Price',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            sorter: true,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: true,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="primary" size="small" onClick={() => handleView(record)}>
                        View
                    </Button>
                    <Button type="primary" size="small" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button size="small" onClick={() => handleDelete(record._id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={false}
            onChange={handleTableChange}
            />
            <Pagination style={{marginTop:20}} pageSize={pagination.pageSize??10} showSizeChanger current={pagination.pageIndex??1} total={total} onChange={handlePaginationChange}/>
        </>

    );
};

export default ProductTable;
