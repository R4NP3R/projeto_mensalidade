import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-client-list.ts
import z from "zod";
async function getClientList(app) {
  app.withTypeProvider().get("/clients/gym/:gymId", {
    schema: {
      summary: "get client list",
      tags: ["clients"],
      params: z.object({
        gymId: z.string()
      }),
      querystring: z.object({
        query: z.string().nullish(),
        pageIndex: z.string().nullish().default("0").transform(Number)
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
              slug: z.string()
            })
          ),
          total: z.number()
        })
      }
    }
  }, async (request, reply) => {
    const { gymId } = request.params;
    const { pageIndex, query } = request.query;
    const [client, total] = await Promise.all([
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
          slug: true
        },
        where: query ? {
          gymId,
          name: {
            contains: query,
            mode: "insensitive"
          }
        } : {
          gymId
        },
        take: 10,
        skip: pageIndex * 10,
        orderBy: {
          name: "asc"
        }
      }),
      await prisma.client.count({
        where: query ? {
          gymId,
          name: {
            contains: query,
            mode: "insensitive"
          }
        } : {
          gymId
        }
      })
    ]);
    return reply.send({
      clients: client.map((client2) => {
        return {
          id: client2.id,
          name: client2.name,
          cpf: client2.cpf,
          phoneNumber: client2.phoneNumber,
          paymentDayDate: client2.paymentDayDate,
          adress: client2.adress,
          adressNumber: client2.adressNumber,
          gym: client2.gym.gymId,
          initialDate: client2.initialDate,
          latePayment: client2.latePayment?.debtAt ?? null,
          slug: client2.slug
        };
      }),
      total
    });
  });
}

export {
  getClientList
};
