
import React, { useState, useEffect } from 'react';
import { Table, Empty, Button, Modal, message, Select } from 'antd'; // Import Modal and Select from Ant Design
import api from '../../config/axios';

const UserManage = () => {
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [accountIdToUpdate, setAccountIdToUpdate] = useState(null);
  const [statusToUpdate, setStatusToUpdate] = useState(null); // New state variable for update status

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.get('/accounts');
        setAccounts(response.data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching accounts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateStatus = (accountId) => {
    setAccountIdToUpdate(accountId);
    // Get the current status of the account
    const currentStatus = accounts.find((account) => account.accountId === accountId)?.status; // Optional Chaining
    setStatusToUpdate(currentStatus === 'Active' ? true : false); // Set the status to update based on current status
    setIsUpdateModalVisible(true); // Show confirmation modal
  };

  const handleConfirmUpdate = async () => {
    setIsUpdateModalVisible(false);
    const payload = {
      status: statusToUpdate,
    };

    try {
      const res = await api.put(`/{accountId}?accountId=${accountIdToUpdate}`, payload);
      message.success('Update success!');
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.accountId === accountIdToUpdate ? { ...account, status: statusToUpdate } : account
        )
      );
    } catch (error) {
      message.error('An unknown error occurred, try again later.');
      setError(error.message);
      console.error('Error updating account status:', error);
    }
  };

  const handleCancelUpdate = () => {
    setIsUpdateModalVisible(false);
    setAccountIdToUpdate(null);
    setStatusToUpdate(null); // Reset statusToUpdate on cancel
  };

  const columns = [
    // Define your table columns here based on the API data structure
    { title: 'ID', dataIndex: 'accountId' },
    { title: 'Full name', dataIndex: 'fullName' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Role', dataIndex: 'role' },
    { title: 'Phone No.', dataIndex: 'phone' },
    { title: 'Account status', dataIndex: 'status' },
    {
      title: 'Action',
      dataIndex: '', // No data index needed for action column
      render: (_, record) => (
        record.role != "ADMIN" &&
        <Button type="primary" onClick={() => handleUpdateStatus(record.accountId)}>
          Update Status
        </Button>
      ),
    }, // Add an action column with a button
  ];

  return (
    <div>
      {isLoading ? (
        <p>Loading accounts...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : accounts.length === 0 ? (
        <Empty description="No accounts found" />
      ) : (
        <>
          <Table dataSource={accounts} columns={columns} rowKey="id" />
          <Modal
            title="Confirm account status update"
            visible={isUpdateModalVisible}
            onOk={handleConfirmUpdate}
            onCancel={handleCancelUpdate}
          >
            <p>Are you sure you want to update the status of this account?</p>
          </Modal>
        </>
      )}
    </div>
  );
};

export default UserManage;

