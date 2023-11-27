import React, { useState, useEffect, useContext } from 'react';

import { Typography, Table } from 'antd';

import UserAssetContext from '../../helpers/UserAssetContext';
import UserInfoContext from '../../helpers/UserInfoContext';

const { Text } = Typography;

const TransactionList = (props) => {
    const { userAsset, setUserAsset } = useContext(UserAssetContext);
    const { userInfo } = useContext(UserInfoContext);

    useEffect(() => {
        //console.log('userAsset', userAsset);
    }, [userAsset]);

    useEffect(() => {
        //console.log('userInfo', userInfo);
    }, [userInfo]);

    return <>{userInfo == null ? <Text strong>Login to access this section</Text> : <>TransactionList</>}</>;
};

export default TransactionList;
