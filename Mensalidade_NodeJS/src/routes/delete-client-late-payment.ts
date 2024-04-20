import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { BadRequest } from "../_erros/bad-request";
import { prisma } from "../lib/prisma";
import { currentDate } from "../utlis";

export async function removeClientLatePayment(app:FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete('/:gymId/remove/:clientId/late_payment', {
    schema: {
      summary: 'remove a client from late payment',
      tags: ['payment'],
      params: z.object({
        gymId: z.string(),
        clientId: z.string(),
      })
    }
  }, async (request, reply) => {

    const { gymId, clientId } = request.params
    
    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
        paymentDayDate: {
          lt: currentDate
        },
        gymId,
      }
    })  

    if (client === null) {
      throw new BadRequest("A mensalidade desse cliente ainda não venceu!")
    }

    if (client?.paymentDayDate !== undefined) {    
      if (client.paymentDayDate < currentDate) {
        const newPaymentDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, client.paymentDayDate.getDate())

        await prisma.latePayment.delete({
          where: {
            debtAt: {
              lt: newPaymentDay
            },
            clientId: client.id
          }
        })
  
        await prisma.client.update({
          where: {
            id: clientId,
          },
          data: {
            paymentDayDate: newPaymentDay
          }
        })
      }
    }

    return reply.status(204).send()
  })
  
}