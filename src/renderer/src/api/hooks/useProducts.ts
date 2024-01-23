import { AxiosInstance as AxiosInstanceOriginal } from 'axios'
import { FetchResponse, TProduct, TProductFilter } from '../../types/type-schema'

import { useQuery } from '@tanstack/react-query'
import APIService from '../services/apiService'
import { CATEGORIES, PRODUCTS } from '../../utils/constants'
const useProducts = (axiosInstance: AxiosInstanceOriginal, categorieId?: any) => {
  const productsService = new APIService<TProduct, TProductFilter>(
    '/products',
    axiosInstance,
    categorieId
  )

  const data = useQuery<FetchResponse<TProduct[]>, Error>({
    queryKey: categorieId ? [CATEGORIES, categorieId, PRODUCTS] : [PRODUCTS],
    queryFn: productsService.findAll
  })

  return data
}

export const usePaginateProducts = (axiosInstance: AxiosInstanceOriginal, filter?: any) => {
  const productsService = new APIService<TProduct, TProductFilter>('/products', axiosInstance)
  const data = useQuery<FetchResponse<TProduct[]>, Error>({
    queryKey: filter ? [PRODUCTS, filter] : [PRODUCTS],
    queryFn: productsService.findAll
  })

  return data
}
export default useProducts
