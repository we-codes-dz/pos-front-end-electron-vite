import { AxiosInstance as AxiosInstanceOriginal } from 'axios'
import { FetchResponse, TProduct, TProductFilter } from '../../types/type-schema'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import APIService from '../services/apiService'
import { CATEGORIES, PRODUCTS } from '../../utils/constants'

interface AddProductContext {
  previousProducts: TProduct[]
}

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

export const useAddProduct = (axiosInstance: AxiosInstanceOriginal, reset: () => void) => {
  const queryClient = useQueryClient()
  // const categoriesService = new APIService<TCategory, TCategoryFilter>('/categories', axiosInstance)
  return useMutation<TProduct, Error, any, AddProductContext>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('http://localhost:3000/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    },
    onMutate: (newProduct: any) => {
      //APPRCOHE updateing the data in chache corrently

      const previousProducts = queryClient.getQueryData<any>([PRODUCTS]) || []

      queryClient.setQueryData<any>([PRODUCTS], (products: FetchResponse<TProduct[]>) => {
        const newProducts = Array.isArray(products)
          ? [newProduct.data, ...products.data.data]
          : [newProduct.data]
        return newProducts
      })

      return { previousProducts: previousProducts || [] }
    },
    onSuccess: (savedProduct: any, _, context: any) => {
      reset()
      console.log('savedProduct')
      queryClient.setQueryData<any>([PRODUCTS], (products) => {
        const previousProducts = context?.previousProducts || []
        const updatedProducts = Array.isArray(products)
          ? [savedProduct, ...previousProducts.data.data]
          : [savedProduct, ...previousProducts]

        return updatedProducts
      })
    },

    onError: (error, context: AddProductContext) => {
      console.log(error)
      reset()
      if (!context) return
      queryClient.setQueryData<TProduct[]>([PRODUCTS], context.previousProducts)
    }
  })
}

export const useUpdateProduct = (axiosInstance: AxiosInstanceOriginal, reset: () => void) => {
  const queryClient = useQueryClient()

  return useMutation<TProduct, Error, any, AddProductContext>({
    mutationFn: async (updatedProduct) => {
      const { id, ...rest } = updatedProduct
      console.log(updatedProduct, '**************')
      const response = await axiosInstance.put(`http://localhost:3000/products/${id}`, rest, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data // Adjust to the correct data structure
    },
    onMutate: async (updatedProduct) => {
      const { id, ...rest } = updatedProduct
      const previousProducts = queryClient.getQueryData<any>([PRODUCTS]) || []
      console.log('---------', previousProducts)
      queryClient.setQueryData<any>([PRODUCTS], (products: FetchResponse<TProduct>) => {
        const updatedProducts = Array.isArray(products)
          ? products.data.data.map((product) => (product.id === id ? { id, ...rest } : product))
          : [updatedProduct, ...previousProducts.data.data]

        return updatedProducts
      })

      return { previousProducts: previousProducts || [] }
    },
    onSuccess: (updatedProduct, _, context: any) => {
      reset()

      queryClient.setQueryData<any>([PRODUCTS], (products: FetchResponse<TProduct>) => {
        const previousProducts = context?.previousProducts || []
        const updatedProducts = Array.isArray(products)
          ? products.data.data.map((product) =>
              product.id === updatedProduct.id ? updatedProduct : product
            )
          : [updatedProduct, ...previousProducts]

        return updatedProducts
      })
    },
    onError: (error, context: AddProductContext) => {
      console.log(error)
      reset()
      if (!context) return
      queryClient.setQueryData<TProduct[]>([PRODUCTS], context.previousProducts)
    }
  })
}

export const useDeleteProduct = (axiosInstance: AxiosInstanceOriginal) => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: async (productId) => {
      await axiosInstance.delete(`http://localhost:3000/products/${productId}`)
    },
    onMutate: async (productId) => {
      const previousProducts = queryClient.getQueryData<any>([PRODUCTS]) || []

      queryClient.setQueryData<any>([PRODUCTS], (products: FetchResponse<TProduct>) => {
        const updatedCategories = Array.isArray(products)
          ? products.data.data.filter((product) => product.id !== productId)
          : previousProducts.data.data.filter((product) => product.id !== productId)
        return updatedCategories
      })

      return { previousProducts: previousProducts || [] }
    },
    onError: (error) => {
      console.log(error)
      // if (!context) return
      // queryClient.setQueryData<TCategory[]>([CATEGORIES], context.previousProducts)
    }
  })
}
export default useProducts
