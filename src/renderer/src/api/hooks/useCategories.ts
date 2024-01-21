import { useQuery } from '@tanstack/react-query'
import { TCategory, TCategoryFilter } from '../../types/type-schema'
import { CATEGORIES } from '../../utils/constants'
import { AxiosInstance as AxiosInstanceOriginal } from 'axios'

import APIService from '../services/apiService'

const useCategories = (axiosInstance: AxiosInstanceOriginal, filter?: any) => {
  // const categoriesService = new CategoriesService("/categories", axiosInstance);
  const categoriesService = new APIService<TCategory, TCategoryFilter>(
    '/categories',
    axiosInstance,
    filter
  )
  const data = useQuery<TCategory[], Error>({
    queryKey: filter ? [CATEGORIES, filter] : [CATEGORIES],
    queryFn: categoriesService.findAll
  })

  return data
}

export default useCategories
