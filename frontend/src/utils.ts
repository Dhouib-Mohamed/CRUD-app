import axios from 'axios';

const API = 'http://localhost:3000/crud/';

export const fetchData = async (filterOptions, pagination) => {
    try {
        const response = await axios.post(API, { ...filterOptions, ...pagination });
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
    }
};

export const createItem = async (values) => {
    try {
        const response = await axios.put(API, values);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Failed to create item');
    }
};

export const updateItem = async (id, values) => {
    try {
        const response = await axios.patch(API + id, values);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Failed to update item');
    }
};

export const deleteItem = async (id) => {
    try {
        await axios.delete(API + id);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Failed to delete item');
    }
};
