import { DeleteFilled, EditFilled, PlusCircleOutlined } from '@ant-design/icons';
import { Flex, FloatButton, Space, Table, type TableColumnsType } from 'antd';
import React, { useState } from 'react';
import { useCarApi } from '../hook/useCarApi';
import Swal from 'sweetalert2';
import type { CarCreateAndUpdateRequest, CarResponse } from '../interface/interface';
import CarModal from './CarModal';

const CarTable: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(2);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [carId, setCarId] = useState<number | null>(null);
    const [updateData, setUpdateData] = useState<CarCreateAndUpdateRequest | null>(null);

    const { data: carData, isLoading: isCarLoading } = useCarApi.findAll(page, limit);

    const deleteMutation = useCarApi.delete();
    const handleDelete = async (carId: number) => {
        try {
            const dialog = await Swal.fire({
                title: "Do you want to delete this car",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Delete"
            });

            if (dialog.isConfirmed) {
                (await deleteMutation).mutateAsync(carId);
                Swal.fire({
                    title: "Delete Successful",
                    icon: "success"
                })
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Delete Failed",
                icon: "error"
            })
        }
    }

    const handleUpdate = (id: number, data: CarCreateAndUpdateRequest) => {
        setIsModalOpen(true);
        setIsUpdate(true);
        const payload: CarCreateAndUpdateRequest = { ...data }
        setCarId(id);
        setUpdateData(payload);
    }

    const columns: TableColumnsType<CarResponse> = [
        { title: 'Registration Number', dataIndex: 'registrationNumber', key: 'registrationNumber' },
        { title: 'brand', dataIndex: 'brand', key: 'brand' },
        { title: 'model', dataIndex: 'model', key: 'model' },
        { title: 'notes', dataIndex: 'notes', key: 'notes' },
        {
            title: 'Action',
            key: 'action',
            render: (record: CarResponse) => (
                <Space size={"medium"}>
                    <EditFilled onClick={() => handleUpdate(record.carId, record)} />
                    <DeleteFilled onClick={() => handleDelete(record.carId)} />
                </Space>
            ),
        },
    ];

    return (
        <Flex gap="small" justify="center" vertical>
            <FloatButton
                shape="square"
                icon={<PlusCircleOutlined />}
                content="ADD CAR"
                type="primary"
                onClick={() => setIsModalOpen(true)}
            />
            <Table<CarResponse>
                columns={columns}
                dataSource={carData?.data || []}
                rowKey={"carId"}
                loading={isCarLoading}
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: carData?.totalItem ?? 0,
                    placement: ["bottomCenter"],
                    onChange: (page, limit) => {
                        setPage(page);
                        setLimit(limit)
                    }
                }}
            />
            <CarModal
                isModalOpen={isModalOpen}
                isModalClose={() => {
                    setUpdateData(null);
                    setIsModalOpen(false);
                }}
                isUpdate={isUpdate}
                carId={carId}
                data={updateData}
            />
        </Flex>
    )
}

export default CarTable