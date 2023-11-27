import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, InputNumber, Input, Typography, Row, Col, Slider, notification, Space } from 'antd';

import { Signer } from '@waves/signer';
import { ProviderKeeper } from '@waves/provider-keeper';

const { Title, Text, Link } = Typography;

const signer = new Signer({
    // Specify URL of the node on Testnet
    NODE_URL: 'https://nodes-testnet.wavesnodes.com',
});
const keeper = new ProviderKeeper();
signer.setProvider(keeper);

const NewRedeemModal = (props) => {
    const smartcontractId = '3NBbFNBed9tcU5AmsJAuExWvgJyNmJxqjWq';
    const waves3LId = '92rW5ucGkH84YeXLnLs8dMN1P7RAFocmR8zfBqUy4gPM';

    const [form] = Form.useForm();
    const [redeemTokenName, setRedeemTokenName] = useState('');
    const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);

    const [stableCoinAmount, setStableCoinAmount] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [orderValue, setOrderValue] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);

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

    const handleRedeem = (record) => {
        setRedeemTokenName(record.name);
        setIsRedeemModalOpen(true);
    };

    const redeemWaves3L = async (orderValue) => {
        try {
            const data = {
                dApp: smartcontractId,
                payment: [
                    {
                        assetId: waves3LId,
                        amount: orderValue * 1000000,
                    },
                ],
                call: {
                    function: 'redeemWaves3L',
                    args: [],
                },
            };
            const [tx] = await signer.invoke(data).broadcast();
            notification.open({
                message: ' Successful Notification',
                description: (
                    <Space direction="vertical" size={0}>
                        <Text type="success">Successful Transaction</Text>
                        <Link href={`https://wavesexplorer.com/transactions/${tx.id}?network=testnet`} target="_blank">
                            View Transaction
                        </Link>
                    </Space>
                ),
                duration: 0,

                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
            console.log('redeem value', orderValue);
        } catch (error) {
            notification.open({
                message: 'Notification',
                description: 'Error',
                duration: 0,

                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
            console.error(error);
        }
    };
    const handleRedeemOk = async () => {
        try {
            switch (redeemTokenName) {
                case 'WAVES1L':
                    break;
                case 'WAVES3L':
                    await redeemWaves3L(orderValue);
                    break;
                case 'WAVES5L':
                    break;
                default:
                    break;
            }
            setIsRedeemModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRedeemCancel = () => {
        setIsRedeemModalOpen(false);
    };

    const updateStableCoinAmount = (orderValue) => {
        let updatedStableCointAmount = 0;
        let tokenPrice = 1;
        switch (redeemTokenName) {
            case 'WAVES1L':
                tokenPrice = 1.5;
                break;
            case 'WAVES3L':
                tokenPrice = 2.0;
                break;
            case 'WAVES5L':
                tokenPrice = 1.0;
                break;
            default:
                break;
        }
        updatedStableCointAmount = Number(orderValue).toFixed(6) * tokenPrice.toFixed(6);
        setStableCoinAmount(updatedStableCointAmount.toFixed(6));
    };

    const handleInputNumberChange = (value) => {
        let updatedSliderValue;
        updatedSliderValue = (value.toFixed(6) / tokenBalance.toFixed(6)) * 100;
        setSliderValue(updatedSliderValue);
        setOrderValue(value);
        updateStableCoinAmount(value);
    };

    const handleSliderChange = (value) => {
        let updatedOrderValue;
        if (value == 100) {
            updatedOrderValue = tokenBalance.toFixed(6);
        } else {
            updatedOrderValue = (tokenBalance * (value / 100)).toFixed(6);
        }
        setOrderValue(updatedOrderValue);
        setSliderValue(value);
        updateStableCoinAmount(updatedOrderValue);
    };

    useEffect(() => {
        if (props.userAsset.length > 0) {
            props.userAsset.map((value, index) => {
                if (value.name == redeemTokenName) {
                    setTokenBalance(value.balance);
                }
            });
        }
    }, [props.userAsset, redeemTokenName]);

    return (
        <>
            <Button
                type="primary"
                style={{ width: '80px' }}
                danger
                disabled={props.record.disabled}
                onClick={(e) => {
                    handleRedeem(props.record);
                }}
            >
                Redeem
            </Button>
            <Modal
                title={'Redeem ' + redeemTokenName}
                open={isRedeemModalOpen}
                onOk={handleRedeemOk}
                footer={[
                    <Button
                        key="redeemOk"
                        onClick={handleRedeemOk}
                        type="primary"
                        style={{ width: '150px' }}
                        disabled={orderValue == 0 || tokenBalance == 0}
                    >
                        {'Redeem ' + redeemTokenName}
                    </Button>,
                    <Button
                        key="redeemCancel"
                        onClick={handleRedeemCancel}
                        danger
                        type="primary"
                        style={{ width: '80px' }}
                    >
                        Cancel
                    </Button>,
                ]}
            >
                <Form form={form} onFinish={handleRedeemOk} style={{ marginTop: '20px' }} layout="vertical">
                    <Form.Item label={'Available ' + redeemTokenName}>
                        <Input disabled={true} value={tokenBalance} />
                    </Form.Item>
                    <Form.Item
                        label={`Order Value ( ${redeemTokenName} )`}
                        rules={[{ required: true, message: 'Please input your amount!' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={0}
                            max={tokenBalance}
                            value={orderValue}
                            onChange={handleInputNumberChange}
                        />
                    </Form.Item>
                    <Slider
                        marks={marks}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        disabled={tokenBalance == 0}
                    />
                </Form>
                <Title level={5}>Summary</Title>
                <Row>
                    <Col span={16}>
                        <Text strong>Amount</Text>
                    </Col>
                    <Col span={8} style={{ textAlign: 'right' }}>
                        <Text strong>{stableCoinAmount + ' USDN'} </Text>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default NewRedeemModal;
