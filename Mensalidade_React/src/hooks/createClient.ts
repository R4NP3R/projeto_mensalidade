import { useMutation } from "@tanstack/react-query";
import { registerClientInfoSchema } from "../components/register-client";
import { API } from "../utils/api";

export function createClient () {
  const mutation = useMutation({
    mutationFn: (data: registerClientInfoSchema) => {
      return API.post(`/gym/black-and-white-academy/clients`, data).catch(function (error) {
        if (error.response) {
          throw new Error(error.response.data.message)
        }
      })
    },    
  })

  return mutation
}

