import React from 'react';
import { Layout, Typography } from 'antd';
const { Footer } = Layout;

const { Text } = Typography;
const AppFooter = (props) => {
    return (
        <Footer className="footer" style={{ background: '#001529' }}>
            <Text strong style={{ color: 'white' }}>
                Kryptok ©2023 Created by Kryptok Team - Hochschule Ruhr West
            </Text>
        </Footer>
    );
};

export default AppFooter;
