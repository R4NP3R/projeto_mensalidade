import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { BadRequest } from "../_erros/bad-request";
import { prisma } from "../lib/prisma";
import { currentDate, generateSlug } from "../utlis";

export async function registerClient(app:FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/gym/:gymId/clients', {
    schema: {
      summary: 'register a client for gym',
      tags: ['clients'],
      params: z.object({
        gymId: z.string()
      }),
      body: z.object({
        name: z.string(),
        cpf: z.string().min(11).max(11),
        phoneNumber: z.string().min(11).max(11),
        paymentDay: z.number().min(1).max(30),
        adress: z.string(),
        adressNumber: z.string(),
      }),
      response: {
      }
    }
  }, async (request, reply) => {
    
    const {name, cpf, phoneNumber, paymentDay, adress, adressNumber} = request.body
    const {gymId} = request.params

    
    const paymentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), paymentDay)

    const slug = generateSlug(name)

    const clientWithSameCPf = await prisma.client.findUnique({
      where: {
        cpf,
      }
    })

    const clientWithSamePhoneNumber = await prisma.client.findUnique({
      where: {
        phoneNumber,
      }
    })
    

    if (clientWithSameCPf !== null) {
      throw new BadRequest("Client with same CPF already exists.")
    }

    if (clientWithSamePhoneNumber !== null) {
      throw new BadRequest("Client with same phone number already exists.")
    }

    const client = await prisma.client.create({
      data: {
        name,
        cpf,
        phoneNumber,
        paymentDayDate,
        adress,
        adressNumber,
        slug,
        gymId,
      }
    })

    return reply.status(201).send({client})
  })
  
}