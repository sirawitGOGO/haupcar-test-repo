const apiUrl = import.meta.env.VITE_API_URL

export const ENDPOINTS = {
    findAll: (page: number, limit: number) => `${apiUrl}/?page=${page}&limit=${limit}`,
    findById: (id: number) => `${apiUrl}/${id}`,
    create: `${apiUrl}/`,
    update: (id: number) => `${apiUrl}/${id}`,
    delete: (id: number) => `${apiUrl}/${id}`,
}