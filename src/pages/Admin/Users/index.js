import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Row, Col, Card, Badge, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../../../actions/users';
import { connect } from 'react-redux';

const AdminUsers = (props) => {
    let searchInput
    const { users, fetchUsers } = props
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    useEffect(() => {
        if(users.length === 0) {
            fetchUsers()
        }
    }, [users])
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => searchInput.select());
          }
        },
        render: text =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text.toString()}
            />
          ) : (
            text
          ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    
    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'displayName',
            key: 'displayName',
            width: '30%',
            ...getColumnSearchProps('displayName'),
            render: (text, obj) => <Link key={obj.id + 2} to={`/admin/users/${obj.id}/edit`}>{text}</Link>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active'+1,
            render: (active, obj) => <Badge key={obj.id + 3} status={active ? "success" : "processing"} />
        },
        {
            title: 'Action',
            key: 'id',
            render: (text, record) => (
                <span key={record.id}>
                    <Link to={`/admin/users/${record.id}/edit`}>Edit</Link> | 
                    <Popconfirm
                        title="Are you sure delete this task?"
                        onConfirm={() => props.deleteUser(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <span 
                            style={{ marginLeft: 3, color: '#258eac', cursor: 'pointer' }}
                        > 
                             Delete
                        </span>
                    </Popconfirm>
                </span>
            ),
        },
    ];
    return (
        <Row>
            <Col>
                <Card 
                    loading={props.loading}
                    title={<h3>All Users</h3>} 
                    extra={(
                        <Link to='/admin/users/create'>
                            + Add New
                        </Link>
                    )} 
                    style={{ marginTop: '20px' }}
                >   
                    <Table columns={columns} dataSource={props.users} />
                </Card>
            </Col>
        </Row>
    )
}

function mapStateToProps({ users, loading }) {
    return { users, loading }
}

export default connect(mapStateToProps, { fetchUsers, deleteUser })(AdminUsers);