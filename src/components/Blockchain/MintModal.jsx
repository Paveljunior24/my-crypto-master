import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, InputNumber, Input, Divider, Typography, Row, Col, Slider } from 'antd';

const { Title, Text } = Typography;

const MintModal = (props) => {
    const [form] = Form.useForm();
    const [stablecoinBalance, setStablecoinBalance] = useState(0);
    const [orderValue, setOrderValue] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);
    const [tokenAmount, setTokenAmount] = useState(0);
    const handleSubmit = (values) => {
        console.log(values);
    };

    const marks = {
        0: '0',
        25: '25%',
        50: '50%',
        75: '75%',
        100: {
            style: { color: 'red' },
            label: <strong>100%</strong>,
        },
    };

    const updateTokenAmount = (orderValue) => {
        let updatedTokenAmount = 0;
        let tokenPrice = 1;
        switch (props.mintTokenName) {
            case 'WAVES1L':
                tokenPrice = 1.5;
                break;
            case 'WAVES3L':
                tokenPrice = 1.2;
                break;
            case 'WAVES5L':
                tokenPrice = 1.0;
                break;
            default:
                break;
        }
        updatedTokenAmount = Number(orderValue).toFixed(6) / tokenPrice.toFixed(6);
        setTokenAmount(updatedTokenAmount.toFixed(6));
    };

    const handleSliderChange = (value) => {
        let updatedOrderValue;
        if (value == 100) {
            updatedOrderValue = stablecoinBalance;
        } else {
            updatedOrderValue = (stablecoinBalance * (value / 100)).toFixed(6);
        }
        setOrderValue(updatedOrderValue);
        setSliderValue(value);
        updateTokenAmount(updatedOrderValue);
    };

    const handleInputNumberChange = (value) => {
        let updatedSliderValue;
        updatedSliderValue = (value.toFixed(6) / stablecoinBalance) * 100;
        setOrderValue(value);
        setSliderValue(updatedSliderValue);
        updateTokenAmount(value);
    };
    useEffect(() => {
        if (props.userAsset.length > 0) {
            props.userAsset.map((value, index) => {
                if (value.name == 'USD-Nea272c') {
                    setStablecoinBalance(value.balance);
                }
            });
        }
    }, [props.userAsset]);
    return (
        <>
            <Modal
                title={'Mint ' + props.mintTokenName}
                open={props.isMintModalOpen}
                onOk={props.handleMintOk}
                footer={[
                    <Button
                        key="back"
                        onClick={props.handleMintOk}
                        type="primary"
                        style={{ width: '120px' }}
                        disabled={stablecoinBalance < 0}
                    >
                        {'Mint ' + props.mintTokenName}
                    </Button>,
                    <Button key="back" onClick={props.handleMintCancel} danger type="primary" style={{ width: '80px' }}>
                        Cancel
                    </Button>,
                ]}
            >
                <Form form={form} onFinish={props.handleMintOk} style={{ marginTop: '20px' }} layout="vertical">
                    <Form.Item label="Available USDN">
                        <Input disabled={true} value={stablecoinBalance} />
                    </Form.Item>
                    <Form.Item label="Order Value" rules={[{ required: true, message: 'Please input your amount!' }]}>
                        {stablecoinBalance > 0 ? (
                            <InputNumber
                                style={{ width: '100%' }}
                                min={0}
                                max={stablecoinBalance}
                                value={orderValue}
                                onChange={handleInputNumberChange}
                            />
                        ) : (
                            <InputNumber style={{ width: '100%' }} disabled={true} />
                        )}
                    </Form.Item>
                    <Slider marks={marks} value={sliderValue} onChange={handleSliderChange} />
                </Form>
                <Title level={5}>Summary</Title>
                <Row>
                    <Col span={16}>
                        <Text strong>Token Amount</Text>
                    </Col>
                    <Col span={8} style={{ textAlign: 'right' }}>
                        <Text strong>{tokenAmount + ' ' + props.mintTokenName} </Text>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default MintModal;
