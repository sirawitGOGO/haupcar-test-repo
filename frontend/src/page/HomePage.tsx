import React from 'react';
import CarTable from '../component/CarTable';
import { Layout } from 'antd';

const HomePage: React.FC = () => {

    return (
        <Layout style={{ minHeight: "100vh"}}>
            <CarTable />
        </Layout>
    )
}

export default HomePage
