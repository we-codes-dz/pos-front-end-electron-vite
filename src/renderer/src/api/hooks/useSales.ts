import { AxiosInstance as AxiosInstanceOriginal } from 'axios'
import { SALES } from '../../utils/constants'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import APIService from '../services/apiService'
import { SaleInt } from '@renderer/types/type-schema'

interface AddSaleContext {
  previousSales: SaleInt[]
}
//! HERE WE MUST ADD ENV VARIABLE
const baseUrl = 'http://localhost:3000/'

const useSales = (axiosInstance: AxiosInstanceOriginal) => {
  const salesService = new APIService<any, any>('/sales', axiosInstance)
  const data = useQuery({
    queryKey: [SALES],
    queryFn: salesService.apiClient.getAll
  })

  return data
}

export const useAddSale = (axiosInstance: AxiosInstanceOriginal, reset: () => void) => {
  const queryClient = useQueryClient()
  return useMutation<SaleInt, Error, any, AddSaleContext>({
    mutationFn: async (data) => {
      return await axiosInstance.post(baseUrl + 'sales', data, {})
    },
    onMutate: (newSale: any) => {
      const previousSales = queryClient.getQueryData<any>([SALES]) || []

      queryClient.setQueryData<any>([SALES], (orders: any) => {
        const ordersData = orders?.data?.data ? orders?.data?.data : orders

        const newProducts = Array.isArray(orders) ? [newSale, ...ordersData] : [newSale]
        return newProducts
      })

      return { previousSales: previousSales || [] }
    },
    onSuccess: (savedSales: any, _, context: any) => {
      reset()

      queryClient.setQueryData<any>([SALES], (sales) => {
        const previousSales = context?.previousSales || []
        const prevData = previousSales?.data?.data ? previousSales?.data?.data : previousSales

        const updatedSales = Array.isArray(sales)
          ? [savedSales.data.data, ...prevData]
          : [savedSales.data.data, ...prevData]
        return updatedSales
      })
    },

    onError: (error, context: AddSaleContext) => {
      console.log(error)
      reset()
      if (!context) return
      queryClient.setQueryData<SaleInt[]>([SALES], context.previousSales)
    }
  })
}

export const useUpdateSale = (axiosInstance: AxiosInstanceOriginal, reset: () => void) => {
  const queryClient = useQueryClient()

  return useMutation<SaleInt, Error, any, AddSaleContext>({
    mutationFn: async (updatedSale) => {
      const { id, ...data } = updatedSale

      const response = await axiosInstance.put(baseUrl + `sales/${id}`, data, {})
      return response.data
    },
    onMutate: async (updatedSale: any) => {
      const { id, ...rest } = updatedSale
      const previousSales = queryClient.getQueryData<any>([SALES]) || []

      queryClient.setQueryData<any>([SALES], (sales: any) => {
        let dataSales = sales?.data?.data ? sales?.data?.data : sales
        const updatedSales = Array.isArray(sales)
          ? dataSales?.map((sale) => (sale.id === id ? { id, ...rest } : sale))
          : [updatedSale, ...previousSales.data.data.filter((sale) => sale.id !== id)]

        return updatedSales
      })

      return { previousSales: previousSales || [] }
    },
    onSuccess: (updatedSale: any, _, context: any) => {
      reset()

      queryClient.setQueryData<any>([SALES], (sales: any) => {
        const previousSales = context?.previousSales || []
        const dataOrders = sales?.data?.data ? sales?.data?.data : sales
        const updatedSales = Array.isArray(sales)
          ? dataOrders.map((sale) => (sale.id === updatedSale ? updatedSale : sale))
          : [updatedSale, ...previousSales]

        return updatedSales
      })
    },
    onError: (error, context: AddSaleContext) => {
      console.log(error)
      reset()
      if (!context) return
      queryClient.setQueryData<SaleInt[]>([SALES], context.previousSales)
    }
  })
}

export const useDeleteSale = (axiosInstance: AxiosInstanceOriginal) => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: async (saleId) => {
      await axiosInstance.delete(baseUrl + `sales/${saleId}`)
    },
    onMutate: (saleId) => {
      const previousSales = queryClient.getQueryData<any>([SALES]) || []
      const updatedSales = Array.isArray(previousSales)
        ? previousSales.filter((order) => order.id !== saleId)
        : previousSales.data.data.filter((order) => order.id !== saleId)

      queryClient.setQueryData<any>([SALES], updatedSales)

      return { previousSales }
    },
    onError: (error) => {
      console.error(error)
      // Handle error if needed
    }
  })
}

export default useSales
