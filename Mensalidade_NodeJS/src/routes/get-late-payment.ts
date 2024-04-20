import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { currentDate } from "../utlis";

export async function getLatePayment(app:FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/:gymId/late_payment', {
    schema: {
      summary: 'get all clients with late payment',
      tags: ['payment'],
      params: z.object({
        gymId: z.string(),
      }),
      response: {
        200: z.object({
          clients: z.array(
            z.object({
              name: z.string(),
              gym: z.string(),
              daysOfDelay: z.date()
            })
          )
        })
      }
    }
  }, async (request, reply) => {
  const { gymId } = request.params



  const latePayment = await prisma.client.findMany({
    where: {
      paymentDayDate: {
        lt: currentDate
      },
      gymId,
    }
  })  


  if (latePayment.find(client => client.id)) {
    for (const client of latePayment) {
      const paymentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), client.paymentDayDate.getDate())
  
      if (paymentDay <= currentDate) {
        await prisma.latePayment.create({
          data: {
            clientId: client.id,
            debtAt: paymentDay.toISOString()
          }
        })
      }
    }
  }


  return reply.send({
    clients: latePayment.map((client) => {
      return {
        name: client.name,
        gym: client.gymId,
        daysOfDelay: new Date(currentDate.getFullYear(), currentDate.getMonth(), client.paymentDayDate.getDate())
      }
    })
  })
})
}