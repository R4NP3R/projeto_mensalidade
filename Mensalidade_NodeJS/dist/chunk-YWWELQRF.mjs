import {
  BadRequest
} from "./chunk-A42IFF2V.mjs";
import {
  currentDate
} from "./chunk-NOVRIJ2H.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/put-client.ts
import z from "zod";
async function putClient(app) {
  app.withTypeProvider().put("/clients/:clientId/edit", {
    schema: {
      params: z.object({
        clientId: z.string()
      }),
      body: z.object({
        adress: z.string(),
        adressNumber: z.string(),
        cpf: z.string().min(11).max(11),
        name: z.string(),
        paymentDay: z.number(),
        phoneNumber: z.string()
      }),
      response: {
        201: z.object({
          name: z.string()
        })
      }
    }
  }, async (response, reply) => {
    const { clientId } = response.params;
    const { name, cpf, phoneNumber, paymentDay, adress, adressNumber } = response.body;
    const paymentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), paymentDay);
    const actualClientInfo = await prisma.client.findUnique({
      select: {
        cpf: true,
        phoneNumber: true
      },
      where: {
        id: clientId
      }
    });
    const anotherClientWithSamePhoneNumber = await prisma.client.findUnique({
      where: {
        phoneNumber
      }
    });
    const anotherClientWithSameCPF = await prisma.client.findUnique({
      where: {
        cpf
      }
    });
    if (cpf !== actualClientInfo?.cpf) {
      if (cpf === anotherClientWithSameCPF?.cpf) {
        throw new BadRequest("Client with same CPF already exists.");
      }
    }
    if (phoneNumber !== actualClientInfo?.phoneNumber) {
      if (phoneNumber === anotherClientWithSamePhoneNumber?.phoneNumber) {
        throw new BadRequest("Client with same phone number already exists.");
      }
    }
    await prisma.client.update({
      data: {
        name,
        cpf,
        phoneNumber,
        paymentDayDate,
        adress,
        adressNumber
      },
      where: {
        id: clientId
      }
    });
    return reply.status(201).send({
      name
    });
  });
}

export {
  putClient
};
