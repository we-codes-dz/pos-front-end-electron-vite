import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosInstance as AxiosInstanceOriginal } from 'axios'
import { FetchResponse, TServer, TServerFilter } from '../../types/type-schema'
import { SERVERS } from '../../utils/constants'

import APIService from '../services/apiService'

const URL_USERS_SERVERS = 'http://localhost:3000/users/servers'
const HEADER_USERS8SERVERS = { 'Content-Type': 'application/json' }

interface AddServerContext {
  previousServers: TServer[]
}
const useServers = (axiosInstance: AxiosInstanceOriginal, filter?: any) => {
  const serversService = new APIService<TServer, TServerFilter>(SERVERS, axiosInstance, filter)
  const data = useQuery<FetchResponse<TServer[]>, Error>({
    queryKey: filter ? [SERVERS, filter] : [SERVERS],
    queryFn: serversService.findAll
  })

  return data
}

export const usePaginateServers = (axiosInstance: AxiosInstanceOriginal, filter?: any) => {
  const serversService = new APIService<TServer, TServerFilter>(SERVERS, axiosInstance, filter)
  const data = useQuery<FetchResponse<TServer[]>, Error>({
    queryKey: filter ? [SERVERS, filter] : [SERVERS],
    queryFn: serversService.findAll
  })

  return data
}

export const useAddServer = (axiosInstance: AxiosInstanceOriginal, reset: () => void) => {
  const queryClient = useQueryClient()
  return useMutation<TServer, Error, any, AddServerContext>({
    mutationFn: async (data) => {
      return await axiosInstance.post(URL_USERS_SERVERS, data, {
        headers: HEADER_USERS8SERVERS
      })
    },
    onMutate: (newServer: any) => {
      //APPRCOHE updateing the data in chache corrently

      const previousServers = queryClient.getQueryData<any>([SERVERS]) || []

      queryClient.setQueryData<any>([SERVERS], (servers: FetchResponse<TServer[]>) => {
        const newServers = Array.isArray(servers) ? [newServer, ...servers.data.data] : [newServer]
        return newServers
      })

      return { previousServers: previousServers || [] }
    },
    onSuccess: (savedServer: any, _, context: any) => {
      reset()
      // Log information for debugging
      queryClient.setQueryData<any>([SERVERS], (servers) => {
        const previousServers = context?.previousServers || []
        const updatedServers = Array.isArray(servers)
          ? [savedServer.data.data, ...previousServers.data.data]
          : [savedServer.data.data, ...previousServers]

        return updatedServers
      })
    },

    onError: (error, context: AddServerContext) => {
      console.log(error)
      reset()
      if (!context) return
      queryClient.setQueryData<TServer[]>([SERVERS], context.previousServers)
    }
  })
}

export const useUpdateServer = (axiosInstance: AxiosInstanceOriginal, reset: () => void) => {
  const queryClient = useQueryClient()

  return useMutation<TServer, Error, any, AddServerContext>({
    mutationFn: async (updatedServer) => {
      const { id, ...rest } = updatedServer

      const response = await axiosInstance.put(`${URL_USERS_SERVERS}/${id}`, rest, {
        headers: HEADER_USERS8SERVERS
      })
      return response.data // Adjust to the correct data structure
    },
    onMutate: async (updatedServer) => {
      const { id, ...rest } = updatedServer
      const previousServers = queryClient.getQueryData<any>([SERVERS]) || []
      queryClient.setQueryData<any>([SERVERS], (servers: any) => {
        let dataServers = servers?.data?.data ? servers?.data?.data : servers
        const updatedServers = Array.isArray(servers)
          ? dataServers.map((server) => (server.id === id ? { id, ...rest } : server))
          : [updatedServer, ...previousServers.data.data.filter((server) => server.id !== id)]

        return updatedServers
      })

      return { previousServers: previousServers || [] }
    },
    onSuccess: (updatedServer, _, context: any) => {
      reset()

      queryClient.setQueryData<any>([SERVERS], (servers: FetchResponse<TServer>) => {
        const previousServers = context?.previousServers || []
        const updatedServers = Array.isArray(servers)
          ? servers.map((server) => (server.id === updatedServer.id ? updatedServer : server))
          : [updatedServer, ...previousServers.data.data]

        return updatedServers
      })
    },
    onError: (error, context: AddServerContext) => {
      console.log(error)
      reset()
      if (!context) return
      queryClient.setQueryData<TServer[]>([SERVERS], context.previousServers)
    }
  })
}

export const useDeleteServer = (axiosInstance: AxiosInstanceOriginal) => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: async (serverId) => {
      await axiosInstance.delete(`${URL_USERS_SERVERS}/${serverId}`)
    },
    onMutate: async (serverId) => {
      const previousServers = queryClient.getQueryData<any>([SERVERS]) || []

      queryClient.setQueryData<any>([SERVERS], (servers: any) => {
        const dataServer = servers.data.data ? servers.data.data : servers
        const updatedServers = Array.isArray(servers)
          ? dataServer?.data?.data.filter((server) => server.id !== serverId)
          : previousServers.data.data.filter((server) => server.id !== serverId)
        return updatedServers
      })

      return { previousServers: previousServers || [] }
    },
    onError: (error) => {
      console.log(error)
      // if (!context) return
      // queryClient.setQueryData<TCategory[]>([CATEGORIES], context.previousCategories)
    }
  })
}

export default useServers
