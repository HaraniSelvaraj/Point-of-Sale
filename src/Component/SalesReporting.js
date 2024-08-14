import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Table, Button, Modal, Form, DatePicker, Select, Popconfirm, InputNumber, Input, message } from 'antd';
import { motion } from 'framer-motion';
import './SalesReporting.css'; // Import your CSS file

const { Content, Footer } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const SalesPage = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [filter, setFilter] = useState({ dateRange: [], category: '' });
  const [loading, setLoading] = useState(false);
  const [sorter, setSorter] = useState({});

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/sales');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
      message.error('Failed to load sales data');
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const newData = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
      };
      const response = await axios.post('http://localhost:8085/api/sales', newData);
      setData([...data, response.data]);
      setIsModalVisible(false);
      message.success('Sale added successfully');
    } catch (error) {
      console.error('Error adding sale:', error);
      message.error('Failed to add sale');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (key) => {
    try {
      await axios.delete(`http://localhost:8085/api/sales/${key}`);
      setData(data.filter(item => item.id !== key));
      message.success('Sale deleted successfully');
    } catch (error) {
      console.error('Error deleting sale:', error);
      message.error('Failed to delete sale');
    }
  };

  const handleFilterChange = (value, key) => {
    setFilter(prevFilter => ({ ...prevFilter, [key]: value }));
  };

  const handleDateRangeChange = (dates) => {
    setFilter(prevFilter => ({ ...prevFilter, dateRange: dates }));
  };

  const handleChange = (pagination, filters, sorter) => {
    setSorter(sorter);
  };

  const filteredData = data.filter(item => {
    const date = new Date(item.date);
    const startDate = filter.dateRange[0] ? filter.dateRange[0].startOf('day').toDate() : new Date(0);
    const endDate = filter.dateRange[1] ? filter.dateRange[1].endOf('day').toDate() : new Date();
    return date >= startDate && date <= endDate &&
           (filter.category === '' || item.category === filter.category);
  });

  return (
    <Layout>
      <Content className="sales-content">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fade-in"
        >
          <h1>Sales Reports</h1>
          <div className="filters">
            <RangePicker onChange={handleDateRangeChange} style={{ marginRight: 16 }} />
            <Select
              placeholder="Select category"
              onChange={(value) => handleFilterChange(value, 'category')}
              style={{ width: 200, marginRight: 16 }}
            >
              <Option value="">All Categories</Option>
              <Option value="Electronics">Electronics</Option>
              <Option value="Clothing">Clothing</Option>
              <Option value="Home">Home</Option>
            </Select>
            <Button type="primary" onClick={handleAdd} className="slide-up">Add Sale</Button>
          </div>
          <Table
            columns={[
              {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                sorter: true,
                render: date => date ? new Date(date).toLocaleDateString() : '',
              },
              {
                title: 'Product Name',
                dataIndex: 'name',
                key: 'name',
                sorter: true,
              },
              {
                title: 'Quantity Sold',
                dataIndex: 'quantity',
                key: 'quantity',
                sorter: true,
              },
              {
                title: 'Total Sales',
                dataIndex: 'total',
                key: 'total',
                sorter: true,
              },
              {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                  <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                    <Button type="link">Delete</Button>
                  </Popconfirm>
                ),
              },
            ]}
            dataSource={filteredData}
            rowClassName={() => 'editable-row'}
            pagination={{ pageSize: 5 }}
            onChange={handleChange}
          />
          <Modal
            title="Add Sale"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={loading}
            className="slide-up"
          >
            <Form form={form} layout="vertical">
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: 'Date is required' }]}
              >
                <DatePicker format="YYYY-MM-DD" />
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
                label="Quantity Sold"
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
                name="total"
                label="Total Sales"
                rules={[{ 
                  required: true, 
                  type: 'number', 
                  min: 0.01, 
                  message: 'Total sales must be a positive number' 
                }]}
              >
                <InputNumber step="0.01" min={0.01} />
              </Form.Item>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Category is required' }]}
              >
                <Select>
                  <Option value="Electronics">Electronics</Option>
                  <Option value="Clothing">Clothing</Option>
                  <Option value="Home">Home</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </motion.div>
      </Content>
      <Footer className="footer">POS System ©2024 Created by Your Name</Footer>
    </Layout>
  );
};

export default SalesPage;
