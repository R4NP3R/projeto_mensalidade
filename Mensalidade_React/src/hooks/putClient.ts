import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { clientInfoSchema } from "../components/table/client-options-menu";
import { queryClient } from "../services/queryClient";



export function putClientData() {
  const mutation = useMutation({
    mutationFn: (data: clientInfoSchema) => {
      console.log(data.cpf)
      return axios.put(`http://localhost:3333/clients/${data.id}/edit`, data
    )},
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['client']})
    },
    })
    

  return mutation
}