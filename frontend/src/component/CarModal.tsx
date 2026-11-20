import { Button, Flex, Form, Input, Modal, Select } from 'antd';
import React from 'react'
import type { CarCreateAndUpdateRequest } from '../interface/interface';
import { useCarApi } from '../hook/useCarApi';
import Swal from 'sweetalert2';

interface CarModalProp {
    isModalOpen: boolean,
    isModalClose: () => void,
    isUpdate: boolean,
    carId: number | null,
    data: CarCreateAndUpdateRequest | null
}

const CarModal: React.FC<CarModalProp> = ({
    isModalOpen,
    isModalClose,
    isUpdate,
    carId,
    data
}: CarModalProp) => {
    const createMutation = useCarApi.create();
    const updateMutation = useCarApi.update();
    const [form] = Form.useForm<CarCreateAndUpdateRequest>();
    form.setFieldsValue({ ...data });

    const handleSubmit = (data: CarCreateAndUpdateRequest) => {
        const payload: CarCreateAndUpdateRequest = { ...data };
        if (isUpdate && carId) {
            updateMutation.mutate({ id: carId, payload }, {
                onSuccess: () => {
                    form.resetFields();
                    isModalClose();
                    Swal.fire({
                        title: "Update Successful",
                        icon: "success"
                    })
                },
                onError: (error) => {
                    console.error(error.message);
                    Swal.fire({
                        title: "Update Failed",
                        icon: "error"
                    })
                },
            });
        }
        createMutation.mutate(payload, {
            onSuccess: () => {
                form.resetFields();
                isModalClose();
                Swal.fire({
                    title: "Add New Car Successful",
                    icon: "success"
                })
            },
            onError: (error) => {
                console.error(error.message);
                Swal.fire({
                    title: "Add New Car Failed",
                    icon: "error"
                })
            }
        })
    }

    return (
        <Modal
            title={isUpdate ? "Update Car" : "Add New Car"}
            open={isModalOpen}
            onCancel={() => {
                isModalClose();
                form.resetFields();
            }}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name={"registrationNumber"}
                    label="Registration Number"
                    rules={[
                        { required: true },
                        { type: 'string' },
                        { message: "Plese enter registration number"}
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={"brand"}
                    label="Brand"
                    rules={[
                        { required: true },
                        { type: 'string' },
                        { message: "Plese select brand"}
                    ]}
                >
                    <Select options={[
                        { label: 'Toyota', value: 'Toyota' },
                        { label: 'Honda', value: 'Honda' },
                        { label: 'Nissan', value: 'Nissan' },
                        { label: 'Mitsubishi', value: 'Suzuki' },
                        { label: 'BYD', value: 'BYD' },
                        { label: 'MG', value: 'MG' },
                        { label: 'Ford', value: 'Ford' },
                    ]} />
                </Form.Item>
                <Form.Item
                    name={"model"}
                    label="Model"
                    rules={[
                        { required: true },
                        { type: 'string' },
                        { message: "Plese enter model"}
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={"notes"}
                    label="Notes"
                    rules={[
                        { required: false },
                        { type: 'string' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Flex justify="flex-end" align="center">
                        <Button type="primary" htmlType="submit">
                            {isUpdate ? "Update" : "Add Car"}
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CarModal
