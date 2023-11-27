import React from 'react';
import { List } from 'antd';

const UserAsset = (props) => {
    return (
        <>
            {props.userBalance.length > 0 ? (
                <List>
                    {props.userBalance.map((value, index) => {
                        return (
                            <List.Item key={index}>
                                <List.Item.Meta
                                    title={value.name}
                                    description={value.balance}
                                    key={index + '' + index}
                                />
                            </List.Item>
                        );
                    })}
                </List>
            ) : (
                <></>
            )}
        </>
    );
};

export default UserAsset;
