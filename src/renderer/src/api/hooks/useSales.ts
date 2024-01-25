import { SALES } from '../../utils/constants'
import { AxiosInstance as AxiosInstanceOriginal } from 'axios'

import APIService from '../services/apiService'
import { useQuery } from '@tanstack/react-query'

const useSales = (axiosInstance: AxiosInstanceOriginal) => {
  const salesService = new APIService<any, any>('/sales', axiosInstance)
  const data = useQuery({
    queryKey: [SALES],
    queryFn: salesService.apiClient.getAll
  })

  return data
}

export default useSales
