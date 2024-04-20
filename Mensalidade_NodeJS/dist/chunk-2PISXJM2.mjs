import {
  currentDate
} from "./chunk-NOVRIJ2H.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-late-payment.ts
import { z } from "zod";
async function getLatePayment(app) {
  app.withTypeProvider().get("/:gymId/late_payment", {
    schema: {
      summary: "get all clients with late payment",
      tags: ["payment"],
      params: z.object({
        gymId: z.string()
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
    const { gymId } = request.params;
    const latePayment = await prisma.client.findMany({
      where: {
        paymentDayDate: {
          lt: currentDate
        },
        gymId
      }
    });
    if (latePayment.find((client) => client.id)) {
      for (const client of latePayment) {
        const paymentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), client.paymentDayDate.getDate());
        if (paymentDay <= currentDate) {
          await prisma.latePayment.create({
            data: {
              clientId: client.id,
              debtAt: paymentDay.toISOString()
            }
          });
        }
      }
    }
    return reply.send({
      clients: latePayment.map((client) => {
        return {
          name: client.name,
          gym: client.gymId,
          daysOfDelay: new Date(currentDate.getFullYear(), currentDate.getMonth(), client.paymentDayDate.getDate())
        };
      })
    });
  });
}

export {
  getLatePayment
};
