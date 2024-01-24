import { FetchResponse, TOrder } from '@renderer/types/type-schema'
import { ORDERS } from '@renderer/utils/constants'
import { useQuery } from '@tanstack/react-query'
import { AxiosInstance as AxiosInstanceOriginal } from 'axios'
import APIService from '../services/apiService'

const useOrders = (axiosInstance: AxiosInstanceOriginal) => {
  const orderService = new APIService<TOrder, any>('/orders', axiosInstance)

  const data = useQuery<FetchResponse<TOrder[]>, Error>({
    queryKey: [ORDERS],
    queryFn: orderService.findAll
  })

  return data
}

export default useOrders
