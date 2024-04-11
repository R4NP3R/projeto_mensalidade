import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { BadRequest } from "../_erros/bad-request";
import { prisma } from "../lib/prisma";
import { generateSlug } from "../utlis";

export async function createGym(app:FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/gym', {
    schema: {
      summary: 'create gym',
      tags: ['gym'],
      body: z.object({
        name: z.string(),
      })
    }
  }, async (request, reply) => {
    
    const {name} = request.body


    const gymId = generateSlug(name)

    const gymWithSameName = await prisma.gyms.findUnique({
      where: {
        name,
      }
    })

    if (gymWithSameName !== null) {
      throw new BadRequest('Gym with this name already exists.')
    }

    const gym = await prisma.gyms.create({
      data: {
        gymId,
        name
      }      
    })

    return reply.status(201).send({gymId: gym.gymId})
  })
}