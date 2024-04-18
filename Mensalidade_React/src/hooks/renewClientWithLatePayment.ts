import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ClientInfo } from "../interfaces/clients";
import { queryClient } from "../services/queryClient";


export function renewClientWithLatePayment () {
  const mutation = useMutation({
    mutationFn: (clientInfo: ClientInfo) => {
      return axios.delete(`http://localhost:3333/${clientInfo.gymId}/remove/${clientInfo.clientId}/late_payment`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['client']})
    }
  })

  return mutation
}