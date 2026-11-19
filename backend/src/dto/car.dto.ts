export interface CarCreateAndUpdate {
    carId?: number;
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