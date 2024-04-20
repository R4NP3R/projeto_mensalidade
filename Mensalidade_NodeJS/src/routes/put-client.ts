import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { BadRequest } from "../_erros/bad-request";
import { prisma } from "../lib/prisma";
import { currentDate } from "../utlis";

export async function putClient(app:FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().put('/clients/:clientId/edit', {
      schema: {
        summary: 'edit client informations',
        tags: ['clients'],
        params: z.object({
          clientId: z.string(),
        }),
        body: z.object({
          adress: z.string(),
          adressNumber: z.string(),
          cpf: z.string().min(11).max(11),
          name: z.string(),
          paymentDay: z.number(),
          phoneNumber: z.string(),
        }),
        response: {
          201: z.object({
            name: z.string()
          })
        }
      }
    }, async (response, reply) => {
      const { clientId } = response.params
      const {name, cpf, phoneNumber, paymentDay, adress, adressNumber} = response.body
  
      const paymentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), paymentDay) 
      
      const actualClientInfo = await prisma.client.findUnique({
        select: {
          cpf: true,
          phoneNumber: true
        },
        where: {
          id: clientId
        }
      })

      const anotherClientWithSamePhoneNumber = await prisma.client.findUnique({
        where: {
          phoneNumber,
        }
      })

      const anotherClientWithSameCPF = await prisma.client.findUnique({
        where: {
          cpf,
        }
      })
      

      // console.log(`numero: ${phoneNumber} !== ${actualClientInfo?.phoneNumber}`)
      // console.log(phoneNumber !== actualClientInfo?.phoneNumber)
      // console.log(`numero: ${phoneNumber} === ${anotherClientWithSameInfo?.phoneNumber}`)
      // console.log(phoneNumber === anotherClientWithSameInfo?.phoneNumber)
      // console.log(`Another ClientNumber: ${anotherClientWithSameInfo?.phoneNumber}, CPF: ${anotherClientWithSameInfo?.cpf}`)

      if (cpf !== actualClientInfo?.cpf) {
        if (cpf === anotherClientWithSameCPF?.cpf) {
          throw new BadRequest("Client with same CPF already exists.")
        }
      }

      if (phoneNumber !== actualClientInfo?.phoneNumber) {
        if (phoneNumber === anotherClientWithSamePhoneNumber?.phoneNumber) {
          throw new BadRequest("Client with same phone number already exists.")
        }
      }


      await prisma.client.update({
        data: {
          name,
          cpf,
          phoneNumber,
          paymentDayDate,
          adress,
          adressNumber,
        },
        where: {
          id: clientId
        }
      })
  
      return reply.status(201).send({
        name
      })
    })
}
