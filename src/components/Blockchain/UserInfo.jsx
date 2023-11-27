import React from 'react';
import { List } from 'antd';
const UserInfo = (props) => {
    return (
        <>
            {props.userInfo != null ? (
                <List>
                    <List.Item key="1">
                        <List.Item.Meta title="Public Key" description={props.userInfo.publicKey} key="item1" />
                    </List.Item>
                    <List.Item key="2">
                        <List.Item.Meta title="Address" description={props.userInfo.address} key="item2" />
                    </List.Item>
                </List>
            ) : (
                <></>
            )}
        </>
    );
};

export default UserInfo;
