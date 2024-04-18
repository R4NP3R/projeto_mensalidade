export interface Clients {
  id: string
  name: string
  cpf: string
  phoneNumber: string
  paymentDayDate: string
  adress: string
  adressNumber: string
  gym: string
  initialDate: string
  latePayment: string
  slug: string
}

export interface ClientResponse{
  clients: Clients[]
  total: number
}

export interface ClientInfo {
  gymId: string
  clientId: string
}