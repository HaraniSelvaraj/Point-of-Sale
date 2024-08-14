import React, { useState, useEffect } from 'react';
import { Button, Input, List, Card, Modal, Form, Input as AntdInput } from 'antd';
import { motion } from 'framer-motion';
import './CustomerManagement.css';

const { Search } = Input;

function CustomerManagementPage() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCustomers();
    window.addEventListener('storage', fetchCustomers);
    return () => {
      window.removeEventListener('storage', fetchCustomers);
    };
  }, []);

  const fetchCustomers = () => {
    const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    setCustomers(storedCustomers);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = async (values) => {
    try {
      const response = await fetch('http://localhost:8084/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to add customer');
      }

      const newCustomer = await response.json();
      const updatedCustomers = [...customers, newCustomer];
      setCustomers(updatedCustomers); // Update the state to include the new customer
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
      window.dispatchEvent(new Event('storage')); // Trigger event to sync with other components
      setIsModalVisible(false); // Close the modal
      form.resetFields(); // Reset the form fields
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showAddCustomerModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className="customer-management-page">
      <div className="header">
        <Button type="primary" onClick={showAddCustomerModal}>
          Add Details
        </Button>
        <Search
          placeholder="Search Details..."
          onSearch={value => setSearchTerm(value)}
          style={{ width: 200, marginLeft: 20 }}
        />
      </div>
      <div className="customer-list">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <List
            itemLayout="horizontal"
            dataSource={filteredCustomers}
            renderItem={customer => (
              <List.Item
                onClick={() => setSelectedCustomer(customer)}
                style={{ cursor: 'pointer' }}
              >
                <List.Item.Meta
                  title={customer.name}
                  description={`Email: ${customer.email} | Phone: ${customer.phone}`}
                />
              </List.Item>
            )}
          />
        </motion.div>
      </div>
      <div className="customer-details">
        {selectedCustomer ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card title={selectedCustomer.name} style={{ width: 300 }}>
              <p>Email: {selectedCustomer.email}</p>
              <p>Phone: {selectedCustomer.phone}</p>
            </Card>
          </motion.div>
        ) : (
          <p>Select a customer to see details.</p>
        )}
      </div>
      <Modal
        title="Add Personal Detail"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="add_customer"
          onFinish={handleAddCustomer}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the customer name!' }]}
          >
            <AntdInput />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input the customer email!' }]}
          >
            <AntdInput />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input the customer phone!' }]}
          >
            <AntdInput />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save Details</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default CustomerManagementPage;
