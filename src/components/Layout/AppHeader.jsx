import React, { useState, useEffect, useContext } from 'react';
import axios, { isCancel, AxiosError } from 'axios';
import { Layout, Col, Row, Button, Dropdown, Tabs, Space, Typography } from 'antd';
import { LogoutOutlined, LoginOutlined, UserOutlined, AntDesignOutlined } from '@ant-design/icons';

import { Signer } from '@waves/signer';
import { ProviderKeeper } from '@waves/provider-keeper';

import UserInfo from '../Blockchain/UserInfo';
import UserAsset from '../Blockchain/UserAsset';
import UserTransaction from '../Blockchain/UserTransaction';

import UserInfoContext from '../../helpers/UserInfoContext';
import UserAssetContext from '../../helpers/UserAssetContext';

import '../../../public/AppHeader.css';

const { Header } = Layout;
const { Text, Title, Link } = Typography;
const signer = new Signer({
    NODE_URL: 'https://nodes-testnet.wavesnodes.com',
});
const keeper = new ProviderKeeper();
signer.setProvider(keeper);

const testnetUrl = 'https://nodes-testnet.wavesnodes.com/';

const AppHeader = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    //const [userInfo, setUserInfo] = useState(null);
    const [userBalance, setUserBalance] = useState([]);

    const { userInfo, setUserInfo } = useContext(UserInfoContext);
    const { userAsset, setUserAsset } = useContext(UserAssetContext);

    const onChange = (key) => {
        //console.log(key);
    };

    const getRegularBalanceByAddress = async () => {
        try {
            let response = await axios.get(testnetUrl + 'addresses/balance/' + userInfo.address);
            let result = response.data.balance;
            let regularBalanceList = [];
            regularBalanceList.push({ name: 'WAVES', balance: result / Math.pow(10, 8) });
            return regularBalanceList;
        } catch (error) {
            console.error(error);
        }
    };

    const getAssetsBalanceByAddress = async () => {
        try {
            let response = await axios.get(testnetUrl + 'assets/balance/' + userInfo.address);
            let result = response.data.balances;
            let assetBalanceList = [];
            result.map((value, index) => {
                let assetBalaceElement = {
                    name: value.issueTransaction.name,
                    balance: value.balance / Math.pow(10, value.issueTransaction.decimals),
                };
                assetBalanceList.push(assetBalaceElement);
            });
            return assetBalanceList;
        } catch (error) {
            console.error(error);
        }
    };

    const tabsItems = [
        {
            key: '1',
            label: `Info`,

            children: <UserInfo userInfo={userInfo} />,
        },
        {
            key: '2',
            label: `Assets`,

            children: <UserAsset userBalance={userBalance} />,
        },
        {
            key: '3',
            label: `History`,
            children: <UserTransaction userInfo={userInfo} />,
        },
    ];

    const items = [
        {
            key: '1',
            label: <Tabs defaultActiveKey="1" items={tabsItems} onChange={onChange} style={{ width: '380px' }} />,
        },
    ];

    const handleLogin = async () => {
        try {
            const user = await signer.login();
            setUserInfo(user);
            setLoggedIn(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = async () => {
        try {
            await signer.logout();
            setUserInfo(null);
            setLoggedIn(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const renderUserSummary = async () => {
            try {
                let regularBalanceList = await getRegularBalanceByAddress();
                let assetBalanceList = await getAssetsBalanceByAddress();
                setUserBalance([...regularBalanceList, ...assetBalanceList]);
                setUserAsset([...regularBalanceList, ...assetBalanceList]);
            } catch (error) {
                console.error(error);
            }
        };
        if (userInfo != null) {
            renderUserSummary();
        }
    }, [userInfo]);

    return (
        <Header className="header">
            <Row align="middle" justify="center">
                <Col span={16}>
                    <Space size="small" align="center">
                        <AntDesignOutlined style={{ fontSize: 35, color: 'yellow', verticalAlign: 'middle' }} />
                        <Title level={4} style={{ margin: 0, padding: 0, color: 'yellow' }}>
                            Kryptok
                        </Title>
                    </Space>
                    <Space size="middle" align="center" style={{ marginLeft: '50px' }}>
                        <Link href="#" target="_blank" style={{ color: 'white' }}>
                            Buy Token
                        </Link>
                        <Link href="#" target="_blank" style={{ color: 'white' }}>
                            Markets
                        </Link>
                        <Link href="#" target="_blank" style={{ color: 'white' }}>
                            Trade
                        </Link>
                        <Link href="#" target="_blank" style={{ color: 'white' }}>
                            Learn
                        </Link>
                        <Link href="#" target="_blank" style={{ color: 'white' }}>
                            More
                        </Link>
                    </Space>
                </Col>
                <Col span={8} offset={0} style={{ textAlign: 'right' }}>
                    {loggedIn ? (
                        <Space size="middle">
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottom"
                            >
                                <Button size="large" icon={<UserOutlined />}>
                                    My Account
                                </Button>
                            </Dropdown>
                            <Button
                                type="primary"
                                size="large"
                                icon={<LogoutOutlined />}
                                onClick={handleLogout}
                                style={{ background: 'yellow', color: 'rgb(0, 21, 41)', fontWeight: 'bold' }}
                            >
                                Logout
                            </Button>
                        </Space>
                    ) : (
                        <Button
                            type="primary"
                            size="large"
                            icon={<LoginOutlined />}
                            style={{ background: 'yellow', color: 'rgb(0, 21, 41)', fontWeight: 'bold' }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    )}
                </Col>
            </Row>
        </Header>
    );
};

export default AppHeader;
