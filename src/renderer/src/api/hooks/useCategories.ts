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

      queryClient.setQueryData<any>([CATEGORIES], (categories: any) => {
        const categoriesData = categories?.data?.data ? categories?.data?.data : categories
        const newCategories = Array.isArray(categories)
          ? [newCategory, ...categoriesData]
          : [newCategory]
        return newCategories
      })

      return { previousCategories: previousCategories || [] }
    },
    onSuccess: (savedCategory: any, _, context: any) => {
      reset()

      // Log information for debugging

      queryClient.setQueryData<any>([CATEGORIES], (categories) => {
        const previousCategories = context?.previousCategories || []
        const prevData = previousCategories?.data?.data
          ? previousCategories?.data?.data
          : previousCategories
        const updatedCategories = Array.isArray(categories)
          ? [savedCategory.data.data, ...prevData]
          : [savedCategory.data.data, ...prevData]

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

export const useUpdateCategory = (axiosInstance: AxiosInstanceOriginal, reset: () => void) => {
  const queryClient = useQueryClient()

  return useMutation<TCategory, Error, any, AddCategoryContext>({
    mutationFn: async (updatedCategory) => {
      const { id, ...rest } = updatedCategory

      const response = await axiosInstance.put(`http://localhost:3000/categories/${id}`, rest, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data // Adjust to the correct data structure
    },
    onMutate: async (updatedCategory) => {
      const { id, ...rest } = updatedCategory
      const previousCategories = queryClient.getQueryData<any>([CATEGORIES]) || []
      queryClient.setQueryData<any>([CATEGORIES], (categories: any) => {
        let dataCategories = categories?.data?.data ? categories?.data?.data : categories
        const updatedCategories = Array.isArray(categories)
          ? dataCategories.map((category) => (category.id === id ? { id, ...rest } : category))
          : [
              updatedCategory,
              ...previousCategories.data.data.filter((category) => category.id !== id)
            ]

        return updatedCategories
      })

      return { previousCategories: previousCategories || [] }
    },
    onSuccess: (updatedCategory, _, context: any) => {
      reset()

      queryClient.setQueryData<any>([CATEGORIES], (categories: FetchResponse<TCategory>) => {
        const previousCategories = context?.previousCategories || []
        const updatedCategories = Array.isArray(categories)
          ? categories.map((category) =>
              category.id === updatedCategory.id ? updatedCategory : category
            )
          : [updatedCategory, ...previousCategories.data.data]

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

export const useDeleteCategory = (axiosInstance: AxiosInstanceOriginal) => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: async (categoryId) => {
      await axiosInstance.delete(`http://localhost:3000/categories/${categoryId}`)
    },
    onMutate: async (categoryId) => {
      const previousCategories = queryClient.getQueryData<any>([CATEGORIES]) || []

      queryClient.setQueryData<any>([CATEGORIES], (categories: any) => {
        const dataCategories = categories?.data?.data ? categories.data.data : categories
        console.log('dataCategories', dataCategories)
        const updatedCategories = Array.isArray(categories)
          ? dataCategories?.data?.data?.filter((category) => category.id !== categoryId)
          : previousCategories.data.data.filter((category) => category.id !== categoryId)
        return updatedCategories
      })

      return { previousCategories: previousCategories || [] }
    },
    onSuccess: () => {
      // Manually trigger a refetch after a successful deletion
      const invalidatePromise: Promise<void> = queryClient.invalidateQueries()
      // Reset or handle other logic as needed

      invalidatePromise.then(() => {
        // This block will run after the invalidation is complete
        console.log('Query successfully invalidated')
      })
    },
    onError: (error) => {
      console.log(error)
      // if (!context) return
      // queryClient.setQueryData<TCategory[]>([CATEGORIES], context.previousCategories)
    }
  })
}

export default useCategories
