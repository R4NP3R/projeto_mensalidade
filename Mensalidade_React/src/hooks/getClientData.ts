import { useQuery } from "@tanstack/react-query"
import { AxiosPromise } from "axios"
import { ClientResponse } from "../interfaces/clients"
import { API } from "../utils/api"


const fetchClient = async (page?: number, search?: string): AxiosPromise<ClientResponse> => {
    const pageIndex = page !== undefined ? page : 0
    const searchParam = search !== undefined ? search : ''
    const response = await API.get<ClientResponse>(`/clients/gym/black-and-white-academy?query=${searchParam}&pageIndex=${pageIndex}`)
    return response
}


export function getClientData(page?: number, search?: string) {
  const query = useQuery({
    queryKey: ['client', page, search],
    queryFn: () => fetchClient(page, search)
  })

  return {
    ...query,
    total: query.data?.data.total,
    clients: query.data?.data.clients,
    data: query.data?.data
  }
}