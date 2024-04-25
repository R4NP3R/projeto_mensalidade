import { useMutation } from "@tanstack/react-query";
import { clientInfoSchema } from "../components/table/client-options-menu";
import { queryClient } from "../services/queryClient";
import { API } from "../utils/api";



export function putClientData() {
  const mutation = useMutation({
    mutationFn: (data: clientInfoSchema) => {
      return API.put(`/clients/${data.id}/edit`, data
    )},
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['client']})
    },
    })
    

  return mutation
}