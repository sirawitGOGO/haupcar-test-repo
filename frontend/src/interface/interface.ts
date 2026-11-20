export interface CarCreateAndUpdateRequest {
    registrationNumber: string;
    brand: string;
    model: string;
    notes: string | null;
}

export interface CarResponse {
    carId: number;
    registrationNumber: string;
    brand: string;
    model: string;
    notes: string | null;
}

export interface PaginationResponse {
    totalItem: number;
    totalPage: number;
    currentPage: number;
    data: CarResponse[];
}

export interface ApiResponse<T> {
    success: boolean,
    data: T
}