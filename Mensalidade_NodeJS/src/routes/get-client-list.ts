import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getClientList(app:FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/clients/gym/:gymId', {
    schema: {
      summary: 'get client list',
      tags: ['clients'],
      params: z.object({
        gymId: z.string()
      }),
      querystring: z.object({
        query: z.string().nullish(),
        indexPage: z.string().nullish().default('0').transform(Number),        
      }),
      response: {
        200: z.object({
          clients: z.array(
            z.object({
              id: z.string().uuid(),
              name: z.string(),
              cpf: z.string(),
              phoneNumber: z.string(),
              paymentDayDate: z.date(),
              adress: z.string(),
              adressNumber: z.string(),
              gym: z.string(),
              initialDate: z.date(),
              latePayment: z.date().nullable(),
              slug: z.string(),
            })
          )
        })
      }
    }
  }, async (request, reply) => {
    const { gymId } = request.params
    const { indexPage , query} = request.query

    const [client] = await Promise.all([
      await prisma.client.findMany({
        select: {
          id: true,
          name: true,
          cpf: true,
          phoneNumber: true,
          paymentDayDate: true,
          adress: true,
          adressNumber: true,
          gym: true,
          initialDate: true,
          latePayment: true,
          slug: true,
        }, 
        where: query ? {
          gymId,
          name: {
            contains: query,   
            mode: 'insensitive'       
          }
        } : {
          gymId
        },
        take: 10,
        skip: indexPage * 10,
        orderBy: {
          initialDate: 'desc'
        }
      })
    ])

    return reply.send({
      clients: client.map(client => {
        return {
          id: client.id,
          name: client.name,
          cpf: client.cpf,
          phoneNumber: client.phoneNumber,
          paymentDayDate: client.paymentDayDate,
          adress: client.adress,
          adressNumber: client.adressNumber,
          gym: client.gym.gymId,
          initialDate: client.initialDate,
          latePayment: client.latePayment?.debtAt ?? null,
          slug: client.slug,
        }
      })
    })
  })  
  
}