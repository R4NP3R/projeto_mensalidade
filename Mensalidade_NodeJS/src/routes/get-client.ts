import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getClients(app:FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/clients/:clientId/:clientSlug', {
    schema: {
      summary: 'get a unique client by id',
      tags: ['clients'],
      params: z.object({
        clientId: z.string().uuid(),
        clientSlug: z.string()
      }),
      response: {
        200: z.object({
          client: z.object({
            name: z.string(),
            cpf: z.string(),
            phoneNumber: z.string(),
            paymentDayDate: z.date(),
            adress: z.string(),
            adressNumber: z.string(),
            gym: z.string(),
            initialDate: z.date(),
            latePayment: z.date().nullable(),
          })
        })
      }
    }
  }, async (request, reply) => {
    const {clientId, clientSlug} = request.params

    const client = await prisma.client.findUnique({
      select: {
        name: true,
        cpf: true,
        phoneNumber: true,
        paymentDayDate: true,
        adress: true,
        adressNumber: true,
        gym: true,
        initialDate: true,
        latePayment: true, 
      },
      where: {
        id: clientId,
        slug: clientSlug
      }
    })

    if (client === null) {
      throw new Error("Client not Found.")
    }


    return reply.send({
      client: {
        name: client.name,
        cpf: client.cpf,
        phoneNumber: client.phoneNumber,
        paymentDayDate: client.paymentDayDate,
        adress: client.adress,
        adressNumber: client.adressNumber,
        gym: client.gym.name,
        initialDate: client.initialDate,
        latePayment: client.latePayment?.debtAt ?? null
      }
    })
  })
}