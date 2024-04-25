import { useMutation } from "@tanstack/react-query";
import { ClientInfo } from "../interfaces/clients";
import { queryClient } from "../services/queryClient";
import { API } from "../utils/api";


export function renewClientWithLatePayment () {
  const mutation = useMutation({
    mutationFn: (clientInfo: ClientInfo) => {
      return API.delete(`${clientInfo.gymId}/remove/${clientInfo.clientId}/late_payment`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['client']})
    }
  })

  return mutation
}