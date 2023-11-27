import React, { useState, useEffect, useContext } from 'react';
import { Space, Table, Tag, Typography, Button, notification } from 'antd';

import NewMintModal from './NewMintModal';
import NewRedeemModal from './NewRedeemModal';
import RedeemModal from './RedeemModal';

import UserAssetContext from '../../helpers/UserAssetContext';

import tokenTableData from '../../helpers/TokenTableData';
const { Text, Link } = Typography;
const TokenTable = (props) => {
    const { userAsset, setUserAsset } = useContext(UserAssetContext);

    const openNotification = () => {
        notification.open({
            message: 'Notification',
            description: 'Please login to use this feature',
            duration: 0,

            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <Space size="middle" direction="vertical">
                    {record.name == 'WAVES2L' ? (
                        <Link
                            href={'https://wavesexplorer.com/assets/' + record.id + '?network=testnet'}
                            target="_blank"
                        >
                            {record.name}
                        </Link>
                    ) : (
                        <Space>
                            <Text> {record.name}</Text>
                            <Tag color="yellow">Comming Soon</Tag>
                        </Space>
                    )}

                    {record.type == 'Long' ? (
                        <Tag color="green">{record.subtext}</Tag>
                    ) : (
                        <Tag color="red">{record.subtext}</Tag>
                    )}
                </Space>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    {props.userInfo != null ? (
                        <>
                            <NewMintModal record={record} userAsset={userAsset} />
                        </>
                    ) : (
                        <Button
                            type="primary"
                            style={{ width: '80px' }}
                            disabled={record.disabled}
                            onClick={openNotification}
                        >
                            Mint
                        </Button>
                    )}

                    {props.userInfo != null ? (
                        <NewRedeemModal record={record} userAsset={userAsset} />
                    ) : (
                        <Button
                            type="primary"
                            style={{ width: '80px' }}
                            danger
                            disabled={record.disabled}
                            onClick={openNotification}
                        >
                            Redeem
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    useEffect(() => {
        //console.log('userAsset', userAsset);
    }, [userAsset]);

    return (
        <>
            <Table columns={columns} dataSource={tokenTableData} rowKey="id" className="tokenTable" />
        </>
    );
};

export default TokenTable;
