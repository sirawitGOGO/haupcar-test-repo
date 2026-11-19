export interface Car {
    carId: number;
    registrationNumber: string;
    brand: string;
    model: string;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}