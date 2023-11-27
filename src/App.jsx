import React from 'react';
import './App.css';
import { Layout, Menu, theme } from 'antd';
import AppHeader from '../components/Layout/AppHeader';
import AppFooter from '../components/Layout/AppFooter';
import AppContent from '../components/Layout/AppContent';

const App = () => {
    return (
        <Layout className="layout">
            <AppHeader />
            <AppContent />
            <AppFooter />
        </Layout>
    );
};
export default App;
