import React, { useState } from 'react';
import { Button, Modal, Form, InputNumber, Input } from 'antd';

const RedeemModal = (props) => {
    const [form] = Form.useForm();

    return (
        <>
            <Modal
                title={'Redeem ' + props.redeemTokenName}
                open={props.isRedeemModalOpen}
                onOk={props.handleRedeemOk}
                footer={[
                    <Button key="back" onClick={props.handleRedeemOk} type="primary" style={{ width: '80px' }}>
                        Redeem
                    </Button>,
                    <Button
                        key="back"
                        onClick={props.handleRedeemCancel}
                        danger
                        type="primary"
                        style={{ width: '80px' }}
                    >
                        Cancel
                    </Button>,
                ]}
            >
                <Form form={form} onFinish={props.handleRedeemOk} style={{ marginTop: '20px' }} layout="vertical">
                    <Form.Item label="Available">
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item label="Amount" rules={[{ required: true, message: 'Please input your amount!' }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default RedeemModal;
