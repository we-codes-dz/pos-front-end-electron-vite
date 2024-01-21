import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TCategory, TCategoryFilter } from '../../types/type-schema'
import { CATEGORIES } from '../../utils/constants'
import { AxiosInstance as AxiosInstanceOriginal } from 'axios'

import APIService from '../services/apiService'
interface AddCategoryContext {
  previousCategories: TCategory[]
}
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

export const usePaginateCategories = (axiosInstance: AxiosInstanceOriginal, filter?: any) => {
  // const categoriesService = new CategoriesService("/categories", axiosInstance);
  const categoriesService = new APIService<TCategory, TCategoryFilter>(
    '/categories',
    axiosInstance,
    filter
  )
  const data = useQuery<TCategory[], Error, TCategoryFilter>({
    queryKey: filter ? [CATEGORIES, filter] : [CATEGORIES],
    queryFn: categoriesService.findAll,
    staleTime: 0,
    keepPreviousData: true
  })

  return data
}

export const useAddCategories = (axiosInstance: AxiosInstanceOriginal) => {
  const queryClient = useQueryClient()
  const categoriesService = new APIService<TCategory, TCategoryFilter>(
    '/categories',
    axiosInstance,
    filter
  )
  return useMutation<TCategory, Error, TCategory, AddCategoryContext>({
    mutationFn: categoriesService.post,
    onMutate: (newCategory: TCategory) => {
      //APPRCOHE updateing the data in chache corrently
      const previousCategories = queryClient.getQueryData<TCategory[]>([CATEGORIES]) || []
      queryClient.setQueryData<TCategory[]>([CATEGORIES], (categories = []) => [
        newCategory,
        ...categories
      ])

      return { previousCategories }
    },
    onSuccess: (savedCategory, newCategory) => {
      queryClient.setQueryData<TCategory[]>([CATEGORIES], (categories) =>
        categories?.map((category) => (category === newCategory ? savedCategory : category))
      )
    },
    onError: (error, newTodo, context: AddCategoryContext) => {
      console.log(error, newTodo)
      if (!context) return
      queryClient.setQueryData<TCategory[]>([CATEGORIES], context.previousCategories)
    }
  })
}

export default useCategories
