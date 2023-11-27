import React, { useContext, useEffect } from 'react';
import { Layout, Tabs, Col, Row, Typography } from 'antd';
import '../../../public/AppContent.css';

import TokenTable from '../Blockchain/TokenTable';
import MyTokenTable from '../Blockchain/MyTokenTable';
import TransactionList from '../Blockchain/TransactionList';
import UserInfoContext from '../../helpers/UserInfoContext';

const { Content } = Layout;
const { Title } = Typography;
const AppContent = (props) => {
    const { userInfo } = useContext(UserInfoContext);

    const onChange = (key) => {};
    const items = [
        {
            key: '1',
            label: `All Tokens`,
            children: <TokenTable userInfo={userInfo} />,
        },
        {
            key: '2',
            label: `My Tokens`,
            children: <MyTokenTable userInfo={userInfo} />,
        },
        {
            key: '3',
            label: `Transaction History`,
            children: <TransactionList userInfo={userInfo} />,
        },
    ];

    useEffect(() => {
        //console.log('userInfo', userInfo);
    }, [userInfo]);
    return (
        <Content className="app-content">
            <Row style={{ marginBottom: '20px' }}>
                <Col span={6}></Col>
                <Col span={12}>
                    <Title level={2} style={{ marginBottom: '5px', marginTop: 0, padding: 0, textAlign: 'center' }}>
                        Kyrptok Leveraged Tokens
                    </Title>
                    <Title level={4} style={{ margin: 0, padding: 0, textAlign: 'center' }}>
                        Enjoy increased leverage
                    </Title>
                </Col>
                <Col span={6}></Col>
            </Row>
            <Row>
                <Col span={12} offset={6} className="site-layout-content">
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </Col>
            </Row>
        </Content>
    );
};

export default AppContent;
