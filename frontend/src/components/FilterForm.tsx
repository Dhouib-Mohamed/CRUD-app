import { Slider, Button, Form, Input } from 'antd';

const FilterForm = ({ handleFilterChange, fetchData, setModalVisible ,sliderConfig}) => {
    const handleFormSubmit = (values) => {
        handleFilterChange(values);
        fetchData();
    };
    console.log(sliderConfig)

    return (
        <Form onFinish={handleFormSubmit} layout="vertical">
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <Form.Item name="nameSearch" label="Name">
                    <Input placeholder="Search by name" style={{ width: 200, marginRight: 8 }} />
                </Form.Item>
                {sliderConfig.unitPrice ?
                    <Form.Item name="unitPrice" label="Unit Price">
                        <Slider range min={sliderConfig.unitPrice?.min} max={sliderConfig.unitPrice?.max} defaultValue={[sliderConfig.unitPrice?.min, sliderConfig.unitPrice?.max]} style={{ width: 200, marginRight: 8 }} />
                    </Form.Item> : null
                }
                {sliderConfig.quantity ?
                    <Form.Item name="quantity" label="Quantity">
                        <Slider range min={sliderConfig.quantity?.min} max={sliderConfig.quantity?.max} defaultValue={[sliderConfig.quantity?.min, sliderConfig.quantity?.max]} style={{ width: 200, marginRight: 8 }} />
                    </Form.Item> : null
                }
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Apply Filters
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={() => setModalVisible(true)}>
                        Add New
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default FilterForm;
