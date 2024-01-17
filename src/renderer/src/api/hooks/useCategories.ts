import { useQuery } from '@tanstack/react-query'
import { AxiosInstance as AxiosInstanceOriginal } from 'axios'

import APIService from '../services/apiService'
import { TCategory } from '@renderer/types/type-schema'
import { CATEGORIES } from '@renderer/utils/constants'

const useCategories = (axiosInstance: AxiosInstanceOriginal) => {
  // const categoriesService = new CategoriesService("/categories", axiosInstance);
  const categoriesService = new APIService<TCategory>('/categories', axiosInstance)
  const data = useQuery({
    queryKey: CATEGORIES,
    queryFn: categoriesService.apiClient.getAll
  })

  return data
}

export default useCategories
