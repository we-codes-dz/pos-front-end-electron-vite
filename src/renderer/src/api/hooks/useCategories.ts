import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FetchResponse, TCategory, TCategoryFilter } from '../../types/type-schema'
import { CATEGORIES } from '../../utils/constants'
import { AxiosInstance as AxiosInstanceOriginal } from 'axios'

import APIService from '../services/apiService'
interface AddCategoryContext {
  previousCategories: TCategory[]
}
const useCategories = (axiosInstance: AxiosInstanceOriginal, filter?: any) => {
  const categoriesService = new APIService<TCategory, TCategoryFilter>(
    '/categories',
    axiosInstance,
    filter
  )
  const data = useQuery<FetchResponse<TCategory[]>, Error>({
    queryKey: filter ? [CATEGORIES, filter] : [CATEGORIES],
    queryFn: categoriesService.findAll
  })

  return data
}

export const usePaginateCategories = (axiosInstance: AxiosInstanceOriginal, filter?: any) => {
  const categoriesService = new APIService<TCategory, TCategoryFilter>(
    '/categories',
    axiosInstance,
    filter
  )
  const data = useQuery<FetchResponse<TCategory[]>, Error>({
    queryKey: filter ? [CATEGORIES, filter] : [CATEGORIES],
    queryFn: categoriesService.findAll
  })

  return data
}

export const useAddCategories = (axiosInstance: AxiosInstanceOriginal, reset: () => void) => {
  const queryClient = useQueryClient()
  // const categoriesService = new APIService<TCategory, TCategoryFilter>('/categories', axiosInstance)
  return useMutation<TCategory, Error, any, AddCategoryContext>({
    mutationFn: async (data) => {
      return await axiosInstance.post('http://localhost:3000/categories', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    onMutate: (newCategory: any) => {
      //APPRCOHE updateing the data in chache corrently

      const previousCategories = queryClient.getQueryData<any>([CATEGORIES]) || []

      queryClient.setQueryData<any>([CATEGORIES], (categories: FetchResponse<TCategory[]>) => {
        const newCategories = Array.isArray(categories)
          ? [newCategory, ...categories.data.data]
          : [newCategory]
        return newCategories
      })

      return { previousCategories: previousCategories || [] }
    },
    onSuccess: (savedCategory: any, _, context: any) => {
      reset()

      // Log information for debugging
      // console.log('Previous Categories:', context?.previousCategories)
      // console.log('Saved Category:', savedCategory)

      queryClient.setQueryData<any>([CATEGORIES], (categories) => {
        const previousCategories = context?.previousCategories || []
        const updatedCategories = Array.isArray(categories)
          ? [savedCategory.data.data, ...previousCategories.data.data]
          : [savedCategory.data.data, ...previousCategories]

        // console.log('Updated Categories:', updatedCategories)

        return updatedCategories
      })
    },

    onError: (error, context: AddCategoryContext) => {
      console.log(error)
      reset()
      if (!context) return
      queryClient.setQueryData<TCategory[]>([CATEGORIES], context.previousCategories)
    }
  })
}

export default useCategories
