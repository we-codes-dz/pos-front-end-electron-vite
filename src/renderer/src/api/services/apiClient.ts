import {
  AxiosInstance as AxiosInstanceOriginal,
  AxiosResponse as AxiosResponseOriginal,
} from "axios";

// Define a generic AxiosResponse type
type AxiosResponse<T> = AxiosResponseOriginal<T>;

class APICLIENT<T> {
  endpoint: string;
  axiosInstance: AxiosInstanceOriginal;
  constructor(endpoint: string, axiosInstance: AxiosInstanceOriginal) {
    this.endpoint = endpoint;
    this.axiosInstance = axiosInstance;
  }

  getAll = () => {
    return this.axiosInstance
      .get<T[]>(this.endpoint)
      .then((res: AxiosResponse<T[]>) => res.data);
  };

  // post = (data: T) => {
  //   return useAxiosPrivate()
  //     .post<T>(this.endpoint, data)
  //     .then((res) => res.data);
  // };
}

export default APICLIENT;
