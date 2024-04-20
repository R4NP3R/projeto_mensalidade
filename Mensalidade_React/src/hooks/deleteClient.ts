import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { ClientInfo } from "../interfaces/clients"
import { queryClient } from "../services/queryClient"


export function deleteClient() {
  const mutate = useMutation({
    mutationFn: (clientInfo: ClientInfo) => {
      return axios.delete(`http://localhost:3333/clients/${clientInfo.gymId}/${clientInfo.clientId}/remove`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client']})
      queryClient.invalidateQueries({ queryKey: ['client-quantity']})
    }
  })

  return mutate
}