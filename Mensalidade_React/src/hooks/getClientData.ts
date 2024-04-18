import { useQuery } from "@tanstack/react-query"
import axios, { AxiosPromise } from "axios"
import { ClientResponse } from "../interfaces/clients"
const API_URL = 'http://localhost:3333'

const fetchClient = async (page?: number, search?: string): AxiosPromise<ClientResponse> => {
    const pageIndex = page !== undefined ? page : 0
    const searchParam = search !== undefined ? search : ''
    const response = await axios.get<ClientResponse>(`${API_URL}/clients/gym/black-and-white-academy?query=${searchParam}&pageIndex=${pageIndex}`)

    return response

}


export function getClientData(page?: number, search?: string) {
  const query = useQuery({
    queryKey: ['client', page, search],
    queryFn: () => fetchClient(page, search),    
  })

  return {
    ...query,
    data: query.data?.data
  }
}

export function getClientQuantity() {
  const query = useQuery({
    queryKey: ['client-quantity'],
    queryFn: () => fetchClient()    
  })

  return {
    ...query,
    clients: query.data?.data.clients,
    total: query.data?.data.total
  }
}