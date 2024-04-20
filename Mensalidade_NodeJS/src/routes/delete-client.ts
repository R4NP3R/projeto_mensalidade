import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function RemoveClient(app:FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete('/clients/:gymId/:clientId/remove', {
    schema: {
      summary: 'delete client',
      tags: ['clients'],
      params: z.object({
        gymId: z.string(),
        clientId: z.string(),
      }),
      response: {
        204: z.object({
          removedClient: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const {clientId, gymId} = request.params

    const client = await prisma.client.delete({
      where: {
        id: clientId,
        gymId,        
      }
    })

    reply.status(204).send({
      removedClient: client.name
    })
  })
}