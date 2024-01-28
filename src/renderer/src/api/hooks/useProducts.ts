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
    queryKey: categorieId ? [CATEGORIES, categorieId, PRODUCTS] : ['products'],
    queryFn: productsService.findAll
  })

  return data
}

export const usePaginateProducts = (axiosInstance: AxiosInstanceOriginal, filter?: any) => {
  const productsService = new APIService<TProduct, TProductFilter>('/products', axiosInstance)
  const data = useQuery<FetchResponse<TProduct[]>, Error>({
    queryKey: filter ? [PRODUCTS, filter] : ['products'],
    queryFn: productsService.findAll
  })

  return data
}
export const useAddProduct = (axiosInstance: AxiosInstanceOriginal, reset: () => void) => {
  const queryClient = useQueryClient()
  return useMutation<TProduct, Error, any, AddProductContext>({
    mutationFn: async (data) => {
      return await axiosInstance.post('http://localhost:3000/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    onMutate: (newProduct: any) => {
      const previousProducts = queryClient.getQueryData<any>(['products']) || []
      const name = newProduct.get('name') as string
      const id = newProduct.get('id') as number
      const avatar = newProduct.get('avatar') as Blob
      const description = newProduct.get('description') as string
      const price = parseFloat(newProduct.get('price') as string)
      const categoryId = parseInt(newProduct.get('category[id]') as string)
      const categoryName = newProduct.get('category[name]') as string

      // Convert relevant attributes to numbers
      const convertedProduct: any = {
        id,
        name,
        avatar,
        description,
        price,
        category: {
          id: categoryId,
          name: categoryName
        }
      }

      queryClient.setQueryData<any>(['products'], (products: any) => {
        const productData = products?.data?.data ? products?.data?.data : products

        const newProducts = Array.isArray(products)
          ? [convertedProduct, ...productData]
          : [convertedProduct]
        return newProducts
      })

      return { previousProducts: previousProducts || [] }
    },
    onSuccess: (savedProduct: any, _, context: any) => {
      reset()

      queryClient.setQueryData<any>(['products'], (products) => {
        const previousProducts = context?.previousProducts || []
        const prevData = previousProducts?.data?.data
          ? previousProducts?.data?.data
          : previousProducts

        const updatedProducts = Array.isArray(products)
          ? [savedProduct.data.data, ...prevData]
          : [savedProduct.data.data, ...prevData]
        console.log(updatedProducts)
        return updatedProducts
      })
    },

    onError: (error, context: AddProductContext) => {
      console.log(error)
      reset()
      if (!context) return
      queryClient.setQueryData<TProduct[]>(['products'], context.previousProducts)
    }
  })
}

export const useUpdateProduct = (axiosInstance: AxiosInstanceOriginal, reset: () => void) => {
  const queryClient = useQueryClient()

  return useMutation<TProduct, Error, any, AddProductContext>({
    mutationFn: async (updatedProduct) => {
      const { id, ...data } = updatedProduct
      const dataForm = new FormData()
      if (data.name) dataForm.append('name', data.name)
      if (data.avatar) dataForm.append('avatar', data.avatar)
      if (data.description) dataForm.append('description', data.description)
      if (data.price) dataForm.append('price', data.price.toString())
      if (data.category) dataForm.append('category[id]', data.category.toString())
      // const body = {
      //   name: data.name,
      //   avatar: data.avatar,
      //   description: data.description,
      //   price: data.price.toString(),
      //   "category['id']": data.category.toString()
      // }

      const response = await axiosInstance.put(`http://localhost:3000/products/${id}`, dataForm, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data // Adjust to the correct data structure
    },
    onMutate: async (updatedProduct: any) => {
      const { id, ...rest } = updatedProduct
      const previousProducts = queryClient.getQueryData<any>(['products']) || []

      queryClient.setQueryData<any>(['products'], (products: any) => {
        let dataProducts = products?.data?.data ? products?.data?.data : products
        const updatedProducts = Array.isArray(products)
          ? dataProducts?.map((product) => (product.id === id ? { id, ...rest } : product))
          : [updatedProduct, ...previousProducts.data.data.filter((product) => product.id !== id)]

        return updatedProducts
      })

      return { previousProducts: previousProducts || [] }
    },
    onSuccess: (updatedProduct: any, _, context: any) => {
      reset()

      queryClient.setQueryData<any>(['products'], (products: any) => {
        const previousProducts = context?.previousProducts || []
        const dataProducts = products?.data?.data ? products?.data?.data : products
        const updatedProducts = Array.isArray(products)
          ? dataProducts.map((product) =>
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
      queryClient.setQueryData<TProduct[]>(['products'], context.previousProducts)
    }
  })
}

export const useDeleteProduct = (axiosInstance: AxiosInstanceOriginal) => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: async (productId) => {
      await axiosInstance.delete(`http://localhost:3000/products/${productId}`)
    },
    onMutate: (productId) => {
      const previousProducts = queryClient.getQueryData<any>(['products']) || []
      const updatedProducts = Array.isArray(previousProducts)
        ? previousProducts.filter((product) => product.id !== productId)
        : previousProducts.data.data.filter((product) => product.id !== productId)

      queryClient.setQueryData<any>(['products'], updatedProducts)

      return { previousProducts }
    },
    onError: (error) => {
      console.error(error)
      // Handle error if needed
    }
  })
}

export default useProducts
