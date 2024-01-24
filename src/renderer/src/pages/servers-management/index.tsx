import useServers from "@renderer/api/hooks/useServers"
import ServerTable from "@renderer/components/table/servers/server-table"
import useAxiosPrivate from "@renderer/hooks/useAxiosPrivate"
import { TServer } from "@renderer/types/type-schema"
import { columnHeaders } from "./columns"

const ServerPage = () => {
    const axiosInstance = useAxiosPrivate()
    const { data: servers, isLoading } = useServers(axiosInstance)

    if (isLoading) return null;

    const structuringData = (servers: any): TServer[] => {
        const data = servers?.data?.data ? servers?.data?.data : servers
        return data
    }

    const structuredProduct: TServer[] = structuringData(servers)

    return (
        <div className="flex flex-col w-full overflow-y-scroll">
            <ServerTable
                title="Server table"
                axiosInstance={axiosInstance}
                headers={columnHeaders}
                servers={structuredProduct}
            />
        </div>
    )
}

export default ServerPage