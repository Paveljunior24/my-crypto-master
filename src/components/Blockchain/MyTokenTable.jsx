import React, { useState, useEffect, useContext } from 'react';

import { Typography, Table } from 'antd';

import UserAssetContext from '../../helpers/UserAssetContext';
import UserInfoContext from '../../helpers/UserInfoContext';

const { Text } = Typography;
const MyTokenTable = (props) => {
    const { userAsset, setUserAsset } = useContext(UserAssetContext);
    const { userInfo } = useContext(UserInfoContext);

    useEffect(() => {
        //console.log('userAsset', userAsset);
    }, [userAsset]);

    useEffect(() => {
        //console.log('userInfo', userInfo);
    }, [userInfo]);

    const columns = [
        {
            title: '#',
            key: '#',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <Text strong>{record.name}</Text>,
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
        },
    ];

    return (
        <>
            {userInfo == null ? (
                <Text strong>Login to access this section</Text>
            ) : (
                <>
                    {' '}
                    <Table columns={columns} dataSource={userAsset} rowKey="id" className="tokenTable" />
                </>
            )}
        </>
    );
};

export default MyTokenTable;
