import React, { useState, useEffect } from 'react';
import { Layout, Table, Button, Modal, Form, Input, Popconfirm, InputNumber } from 'antd';
import axios from 'axios';
import './InventoryManagement.css';

const { Content, Footer } = Layout;

const InventoryPage = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8084/api/products');
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  const handleAdd = () => {
    setEditingKey(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const product = {
        ...values,
        quantity: Number(values.quantity),
        price: Number(values.price),
        rating: Number(values.rating),
        discount: Number(values.discount),
      };
  
      if (editingKey !== null) {
        // Update existing item
        await axios.put(`http://localhost:8084/api/products/${editingKey}`, product);
        console.log('Product updated successfully:', product);
      } else {
        // Add new item
        const response = await axios.post('http://localhost:8084/api/products/post', product);
        console.log('Product added successfully:', response.data);
      }
      
      fetchProducts(); // Refresh data after operation
      setIsModalVisible(false);
      setEditingKey(null);
      form.resetFields();
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to save product. Please check the console for details.');
    }
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (record) => {
    setEditingKey(record.id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8084/api/products/${id}`);
      fetchProducts(); // Refresh data
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text) => <img src={text} alt="Product" style={{ width: '50px', height: '50px' }} />,
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Discount (%)',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <Button type="link">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Layout>
      <Content className="inventory-content">
        <h1>Inventory Products Stocks</h1>
        <Button type="primary" onClick={handleAdd}>Add Item</Button>
        <Table 
          columns={columns} 
          dataSource={data} 
          rowKey="id" 
          pagination={{ pageSize: 5 }} // Enable pagination
        />
        <Modal
          title={editingKey !== null ? "Edit Item" : "Add Item"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="imageUrl"
              label="Image URL"
              rules={[{ required: true, message: 'Image URL is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: 'Item name is required' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{
                required: true,
                type: 'number',
                min: 1,
                message: 'Quantity must be a positive integer'
              }]}
            >
              <InputNumber min={1} />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{
                required: true,
                type: 'number',
                min: 0.01,
                message: 'Price must be a positive number'
              }]}
            >
              <InputNumber min={0.01} step={0.01} />
            </Form.Item>
            <Form.Item
              name="rating"
              label="Rating"
              rules={[{
                required: true,
                type: 'number',
                min: 1,
                max: 5,
                message: 'Rating must be between 1 and 5'
              }]}
            >
              <InputNumber min={1} max={5} />
            </Form.Item>
            <Form.Item
              name="discount"
              label="Discount (%)"
              rules={[{
                required: true,
                type: 'number',
                min: 0,
                max: 100,
                message: 'Discount must be between 0% and 100%'
              }]}
            >
              <InputNumber min={0} max={100} />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
      <Footer className="footer">Seller Haus ©2024</Footer>
    </Layout>
  );
};

export default InventoryPage;
