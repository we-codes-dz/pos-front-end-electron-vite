import { PRODUCTS } from '../../utils/constants'
import { AxiosInstance as AxiosInstanceOriginal } from 'axios'

import APIService from '../services/apiService'
import { useQuery } from '@tanstack/react-query'
const useProducts = (axiosInstance: AxiosInstanceOriginal) => {
  const productsService = new APIService<any>('/products', axiosInstance)
  const data = useQuery({
    queryKey: PRODUCTS,
    queryFn: productsService.apiClient.getAll
  })

  return data
}

export default useProducts
