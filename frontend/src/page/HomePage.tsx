import React from 'react';
import CarTable from '../component/CarTable';
import { Col, Layout, Row } from 'antd';

const HomePage: React.FC = () => {

    return (
        <Layout style={{ minHeight: "100vh", minWidth: "100vw", justifyContent: "center" }}>
            <Row>
                <Col span={12} offset={6}>
                    <CarTable />
                </Col>
            </Row>
        </Layout>
    )
}

export default HomePage
