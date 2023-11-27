import React, { useEffect, useState } from 'react';
import axios, { isCancel, AxiosError } from 'axios';

import { List, Avatar, Typography, Space } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Text, Link, Title } = Typography;
const UserTransaction = (props) => {
    const testnetUrl = 'https://nodes-testnet.wavesnodes.com/';

    const [userTransaction, setUserTransaction] = useState([]);

    useEffect(() => {
        const getTransactionInfo = async () => {
            try {
                let response = await axios.get(
                    testnetUrl + 'transactions/address/' + props.userInfo.address + '/limit/5',
                );
                setUserTransaction(response.data[0]);
            } catch (error) {
                console.error(error);
            }
        };
        if (props.userInfo != null) {
            getTransactionInfo();
        }
    }, [props.userInfo]);
    return (
        <>
            {props.userInfo != null ? (
                <>
                    <Title level={5} style={{ margin: 0 }}>
                        Latest Transactions
                    </Title>
                    <List>
                        {userTransaction.length > 0 ? (
                            <>
                                {userTransaction.map((value, index) => {
                                    return (
                                        <List.Item key={index}>
                                            <List.Item.Meta
                                                avatar={<Avatar icon={<CheckCircleOutlined />} />}
                                                title={
                                                    <Text strong ellipsis="true">
                                                        {value.id}
                                                    </Text>
                                                }
                                                description={
                                                    <Link
                                                        href={`https://wavesexplorer.com/transactions/${value.id}?network=testnet`}
                                                        target="_blank"
                                                    >
                                                        Show in Explorer
                                                    </Link>
                                                }
                                                key={index + '' + index}
                                            />
                                        </List.Item>
                                    );
                                })}
                            </>
                        ) : (
                            <Text strong>Not Found</Text>
                        )}
                    </List>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default UserTransaction;
