import { AxiosInstance as AxiosInstanceOriginal } from "axios";
import APICLIENT from "./apiClient";

class APIService<T> {
  apiClient: APICLIENT<T>;

  constructor(apiPath: string, axiosInstance: AxiosInstanceOriginal) {
    this.apiClient = new APICLIENT(apiPath, axiosInstance);
  }
}
export default APIService;
