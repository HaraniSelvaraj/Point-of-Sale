import React, { useState, useEffect } from 'react';
import { Input, List, Card } from 'antd';
import { motion } from 'framer-motion';
import './CustomerManagement.css';

const { Search } = Input;

function CustomerAdmin() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:8084/api/customers');
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data);
      localStorage.setItem('customers', JSON.stringify(data));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customer-management-page">
      <div className="header">
        <Search
          placeholder="Search customers..."
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
    </div>
  );
}

export default CustomerAdmin;
