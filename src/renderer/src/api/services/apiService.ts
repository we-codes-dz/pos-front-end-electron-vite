import { AxiosInstance as AxiosInstanceOriginal } from 'axios'
import APICLIENT from './apiClient'

class APIService<T, F> {
  apiClient: APICLIENT<T, F>
  filter: F
  constructor(apiPath: string, axiosInstance: AxiosInstanceOriginal, filter: F) {
    this.apiClient = new APICLIENT(apiPath, axiosInstance)
    this.filter = filter
  }
  findAll = async () => {
    const response = await this.apiClient.getAll(this.filter)
    return response
  }
  post = async (data: T) => {
    const response = await this.apiClient.post(data)
    return response
  }
}
export default APIService
