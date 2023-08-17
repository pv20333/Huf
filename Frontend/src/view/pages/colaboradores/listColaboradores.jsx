import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8080/users');
        const usersWithKeys = response.data.map((user, index) => ({ ...user, key: index }));
        setUsers(usersWithKeys);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }
    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'jpegPhoto',
      key: 'jpegPhoto',
      render: (photo) => photo ? <img src={`data:image/jpeg;base64,${photo}`}  className="user-profile-image" alt="User"  /> : 'No Photo'
    },
    {
      title: 'CN',
      dataIndex: 'cn',
      key: 'cn',
    },
    {
      title: 'Department Number',
      dataIndex: 'departmentNumber',
      key: 'departmentNumber',
    }
  ];

  return (
    <Table dataSource={users} columns={columns} />
  );
}

export default UsersList;
