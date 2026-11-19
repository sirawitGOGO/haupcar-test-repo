import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { baseApi } from "../service/api";
import type { CarCreate, CarUpdate } from "../interface/interface";

export const useCar = {
    findAll: (page: number, limit: number) => {
        return useQuery({
            queryKey: ["car"],
            queryFn: () => baseApi.findAll(page, limit)
        })
    },
    findById: (id: number) => {
        return useQuery({
            queryKey: ["car", { id }],
            queryFn: () => baseApi.findById(id)
        })
    },
    create: () => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationFn: (payload: CarCreate) => baseApi.create(payload),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["car"]
                })
            }
        })
    },
    update: () => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationFn: ({ id, payload } : { id: number, payload: CarUpdate}) => baseApi.update(id, payload),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["car"]
                })
            }
        })
    },
    delete: async () => {
        const queryClient = useQueryClient()
        return useMutation({
            mutationFn: (id: number) => baseApi.delete(id),
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["car"]
                })
            }
        })
    }
}