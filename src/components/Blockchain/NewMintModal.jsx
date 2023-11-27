import React, { useState, useEffect } from 'react';
import {
    Button,
    Modal,
    Form,
    InputNumber,
    Input,
    Divider,
    Typography,
    Row,
    Col,
    Slider,
    notification,
    Space,
} from 'antd';

import { Signer } from '@waves/signer';
import { ProviderKeeper } from '@waves/provider-keeper';

const { Title, Text, Link } = Typography;

const signer = new Signer({
    // Specify URL of the node on Testnet
    NODE_URL: 'https://nodes-testnet.wavesnodes.com',
});
const keeper = new ProviderKeeper();
signer.setProvider(keeper);

const NewMintModal = (props) => {
    const smartcontractId = '3NBbFNBed9tcU5AmsJAuExWvgJyNmJxqjWq';
    const stableCointId = '25FEqEjRkqK6yCkiT7Lz6SAYz7gUFCtxfCChnrVFD5AT';

    const [form] = Form.useForm();
    const [mintTokenName, setMintTokenName] = useState('');
    const [isMintModalOpen, setIsMintModalOpen] = useState(false);

    const [stablecoinBalance, setStablecoinBalance] = useState(0);
    const [orderValue, setOrderValue] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);
    const [tokenAmount, setTokenAmount] = useState(0);

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
        let factor = 1;
        switch (mintTokenName) {
            case 'WAVES2L':
                tokenPrice = 2;
                console.log('Waves', orderValue / tokenPrice);
                let sumValue = 0;
                let factorValue = 1.0;
                for (let i = 0; i < 5; i++) {
                    factorValue *= 0.7;
                    sumValue += factorValue;
                }
                console.log('sumValue', sumValue.toFixed(2));
                updatedTokenAmount = sumValue.toFixed(2);
                setTokenAmount(updatedTokenAmount);
                break;
            case 'WAVES1L':
                tokenPrice = 1.5;
                break;
            case 'WAVES3L':
                factor = 3;
                tokenPrice = 1.2;
                break;
            case 'WAVES5L':
                factor = 5;
                tokenPrice = 1.0;
                break;
            default:
                break;
        }
        //updatedTokenAmount = Number(orderValue).toFixed(6) / tokenPrice.toFixed(6);
        //setTokenAmount((updatedTokenAmount * factor).toFixed(6));
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

    const mintWaves3L = async (orderValue) => {
        try {
            const data = {
                dApp: smartcontractId,
                payment: [
                    {
                        assetId: stableCointId,
                        amount: orderValue * 1000000,
                    },
                ],
                call: {
                    function: 'mintWaves3L',
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
        } catch (error) {
            notification.open({
                message: 'Notification',
                description: 'Error',
                duration: 0,

                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
            console.error('Error', error);
        }
    };

    const mintWaves2L = async (orderValue) => {
        try {
            const data = {
                dApp: smartcontractId,
                payment: [
                    {
                        assetId: stableCointId,
                        amount: orderValue * 1000000,
                    },
                ],
                call: {
                    function: 'mintLong2_3',
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
        } catch (error) {
            notification.open({
                message: 'Notification',
                description: 'Error',
                duration: 0,

                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
            console.error('Error', error);
        }
    };
    const handleMint = (record) => {
        //console.log('Mint Record', record);
        setMintTokenName(record.name);
        setIsMintModalOpen(true);
    };

    const handleMintOk = async (e) => {
        try {
            switch (mintTokenName) {
                case 'WAVES1L':
                    break;
                case 'WAVES2L':
                    await mintWaves2L(orderValue);
                    break;
                case 'WAVES3L':
                    await mintWaves3L(orderValue);
                    break;
                case 'WAVES5L':
                    break;
                default:
                    break;
            }
            setIsMintModalOpen(false);
        } catch (error) {
            console.error('Error', error);
        }
    };

    const handleMintCancel = () => {
        setIsMintModalOpen(false);
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
            <Button
                type="primary"
                style={{ width: '80px' }}
                disabled={props.record.disabled}
                onClick={(e) => {
                    handleMint(props.record);
                }}
            >
                Mint
            </Button>

            <Modal
                title={'Mint ' + mintTokenName}
                open={isMintModalOpen}
                onOk={handleMintOk}
                footer={[
                    <Button
                        key="mintOk"
                        onClick={handleMintOk}
                        type="primary"
                        style={{ width: '120px' }}
                        disabled={orderValue == 0 || stablecoinBalance == 0}
                    >
                        {'Mint ' + mintTokenName}
                    </Button>,
                    <Button key="mintCancel" onClick={handleMintCancel} danger type="primary" style={{ width: '80px' }}>
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
                    <Slider
                        marks={marks}
                        value={sliderValue}
                        onChange={handleSliderChange}
                        disabled={stablecoinBalance == 0}
                    />
                </Form>
                <Title level={5}>Summary</Title>
                <Row>
                    <Col span={16}>
                        <Text strong>Token Amount</Text>
                    </Col>
                    <Col span={8} style={{ textAlign: 'right' }}>
                        <Text strong>{tokenAmount + ' ' + mintTokenName} </Text>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default NewMintModal;
