import React from 'react';
import '../../public/Homepage.css';
import { Layout, Col, Row, Form, InputNumber, Input, Typography, Button } from 'antd';
const { Content } = Layout;
const { Title } = Typography;
const nodeUrl = 'https://nodes-testnet.wavesnodes.com'; // Testnet node
const seed = 'ERewvWFUFQfR1eCnipNAv9n7SdQhof2ESP6PGVjTueLd';

const NewTokenPage = (props) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(values.name);

        const myToken = {
            name: values.name,
            description: 'New Token',
            quantity: values.amount, // Real amount (1000) multiplied by 10^decimals (100); set 1 for NFT
            reissuable: true, // Set false for NFT
            decimals: values.decimals, // Set 0 for NFT
            chainId: 'T', // Testnet; set 'W' for Mainnet
        };

        //const issueTx = issue(myToken, seed); // Create and sign Issue transaction

        const issueTx = issue({
            name: values.name,
            description: 'New Token',
            quantity: values.amount,
            reissuable: true, // Set false for NFT
            decimals: values.decimals, // Set 0 for NFT
            senderPublicKey: 'ERewvWFUFQfR1eCnipNAv9n7SdQhof2ESP6PGVjTueLd',
            chainId: 'T',
        });

        broadcast(issueTx, nodeUrl).then((resp) => console.log(resp));
    };

    return (
        <Layout className="layout">
            <AppHeader />
            <Content className="app-content">
                <Row>
                    <Col span={8} offset={8} className="site-layout-content">
                        <Title level={4} style={{ margin: '0px' }}>
                            Create New Token
                        </Title>
                        <Form form={form} style={{ marginTop: '20px' }} layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                label="Token Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input name' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Number of Tokens"
                                name="amount"
                                rules={[{ required: true, message: 'Please input number of tokens' }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="Decimals"
                                name="decimals"
                                rules={[{ required: true, message: 'Please input decimal' }]}
                            >
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Issue Token
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Content>
            <AppFooter />
        </Layout>
    );
};

export default NewTokenPage;
