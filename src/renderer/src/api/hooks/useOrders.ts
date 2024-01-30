import { FetchResponse, TOrder } from '@renderer/types/type-schema'
import { ORDERS } from '@renderer/utils/constants'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance as AxiosInstanceOriginal } from 'axios'
import APIService from '../services/apiService'

interface AddOrderContext {
  previousOrders: TOrder[]
}
//! HERE WE MUST ADD ENV VARIABLE
const baseUrl = 'http://localhost:3000/'

const useOrders = (axiosInstance: AxiosInstanceOriginal) => {
  const orderService = new APIService<TOrder, any>('/orders', axiosInstance)

  const data = useQuery<FetchResponse<TOrder[]>, Error>({
    queryKey: [ORDERS],
    queryFn: orderService.findAll
  })

  return data
}
export const useAddOrder = (axiosInstance: AxiosInstanceOriginal, reset: () => void) => {
  const queryClient = useQueryClient()
  const orderService = new APIService<TOrder, any>('/orders', axiosInstance)
  return useMutation<TOrder, Error, any, AddOrderContext>({
    mutationFn: async (data) => {
      return await axiosInstance.post(baseUrl + 'orders', data, {})
    },
    onMutate: async (newOrder: any) => {
      const previousOrders = queryClient.getQueryData<any>([ORDERS]) || []

      if (previousOrders?.length === 0) {
        try {
          const ordersFromDB: any = await orderService.findAll()

          const orders = ordersFromDB?.data?.data

          if (orders.length) {
            queryClient.setQueryData([ORDERS], orders)
          } else {
            queryClient.setQueryData([ORDERS], [])
          }
        } catch (err) {
          queryClient.setQueryData([ORDERS], [])
        }
      }

      queryClient.setQueryData<any>([ORDERS], (orders: any) => {
        const ordersData = orders?.data?.data ? orders?.data?.data : orders

        const newProducts = Array.isArray(orders) ? [newOrder, ...ordersData] : [newOrder]
        return newProducts
      })
      const previousOrdersReturned = queryClient.getQueryData<any>([ORDERS])
      return { previousOrders: previousOrdersReturned || [] }
    },
    onSuccess: (savedOrders: any, _, context: any) => {
      reset()

      queryClient.setQueryData<any>([ORDERS], async (orders) => {
        const previousOrders = context?.previousOrders || []
        const prevData = previousOrders?.data?.data ? previousOrders?.data?.data : previousOrders

        const savedOrderFullData = await axiosInstance.get(
          baseUrl + `orders/${savedOrders.data.data.id}`
        )

        const updatedOrders = Array.isArray(orders)
          ? [savedOrderFullData.data.data, ...prevData]
          : [savedOrderFullData.data.data, ...prevData]
        return updatedOrders
      })
    },

    onError: (error, context: AddOrderContext) => {
      console.log(error)
      reset()
      if (!context) return
      queryClient.setQueryData<TOrder[]>([ORDERS], context.previousOrders)
    }
  })
}

export const useUpdateOrder = (axiosInstance: AxiosInstanceOriginal, reset: () => void) => {
  const queryClient = useQueryClient()

  return useMutation<TOrder, Error, any, AddOrderContext>({
    mutationFn: async (updatedOrder) => {
      const { id, ...data } = updatedOrder

      const response = await axiosInstance.put(baseUrl + `orders/${id}`, data, {})
      return response.data
    },
    onMutate: async (updatedOrder: any) => {
      const { id, ...rest } = updatedOrder
      const previousOrders = queryClient.getQueryData<any>([ORDERS]) || []

      queryClient.setQueryData<any>([ORDERS], (orders: any) => {
        let dataOrders = orders?.data?.data ? orders?.data?.data : orders
        const updatedOrders = Array.isArray(orders)
          ? dataOrders?.map((order) => (order.id === id ? { id, ...rest } : order))
          : [updatedOrder, ...previousOrders.data.data.filter((order) => order.id !== id)]

        return updatedOrders
      })

      return { previousOrders: previousOrders || [] }
    },
    onSuccess: (updatedOrder: any, _, context: any) => {
      reset()

      queryClient.setQueryData<any>([ORDERS], (orders: any) => {
        const previousOrders = context?.previousOrders || []
        const dataOrders = orders?.data?.data ? orders?.data?.data : orders
        const updatedOrders = Array.isArray(orders)
          ? dataOrders.map((order) => (order.id === updatedOrder ? updatedOrder : order))
          : [updatedOrder, ...previousOrders]

        return updatedOrders
      })
    },
    onError: (error, context: AddOrderContext) => {
      console.log(error)
      reset()
      if (!context) return
      queryClient.setQueryData<TOrder[]>([ORDERS], context.previousOrders)
    }
  })
}

export const useDeleteOrder = (axiosInstance: AxiosInstanceOriginal) => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: async (orderId) => {
      await axiosInstance.delete(baseUrl + `products/${orderId}`)
    },
    onMutate: (orderId) => {
      const previousOrders = queryClient.getQueryData<any>([ORDERS]) || []
      const updatedOrders = Array.isArray(previousOrders)
        ? previousOrders.filter((order) => order.id !== orderId)
        : previousOrders.data.data.filter((order) => order.id !== orderId)

      queryClient.setQueryData<any>([ORDERS], updatedOrders)

      return { previousOrders }
    },
    onError: (error) => {
      console.error(error)
      // Handle error if needed
    }
  })
}

export default useOrders
