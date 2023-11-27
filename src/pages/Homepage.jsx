import React, { useState } from 'react';
import '../../public/Homepage.css';
import { Layout } from 'antd';

import AppHeader from '../components/Layout/AppHeader';
import AppFooter from '../components/Layout/AppFooter';
import AppContent from '../components/Layout/AppContent';

import UserInfoContext from '../helpers/UserInfoContext';
import UserAssetContext from '../helpers/UserAssetContext';

const Homepage = (props) => {
    const [userInfo, setUserInfo] = useState(null);
    const [userAsset, setUserAsset] = useState([]);
    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
            <UserAssetContext.Provider value={{ userAsset, setUserAsset }}>
                <Layout className="layout">
                    <AppHeader />
                    <AppContent />
                    <AppFooter />
                </Layout>
            </UserAssetContext.Provider>
        </UserInfoContext.Provider>
    );
};

export default Homepage;
