import {
  BadRequest
} from "./chunk-A42IFF2V.mjs";
import {
  currentDate
} from "./chunk-NOVRIJ2H.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/delete-client-late-payment.ts
import z from "zod";
async function removeClientLatePayment(app) {
  app.withTypeProvider().delete("/:gymId/remove/:clientId/late_payment", {
    schema: {
      summary: "remove a client from late payment",
      tags: ["payment"],
      params: z.object({
        gymId: z.string(),
        clientId: z.string()
      })
    }
  }, async (request, reply) => {
    const { gymId, clientId } = request.params;
    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
        paymentDayDate: {
          lt: currentDate
        },
        gymId
      }
    });
    if (client === null) {
      throw new BadRequest("A mensalidade desse cliente ainda n\xE3o venceu!");
    }
    if (client?.paymentDayDate !== void 0) {
      if (client.paymentDayDate < currentDate) {
        const newPaymentDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, client.paymentDayDate.getDate());
        await prisma.latePayment.delete({
          where: {
            debtAt: {
              lt: newPaymentDay
            },
            clientId: client.id
          }
        });
        await prisma.client.update({
          where: {
            id: clientId
          },
          data: {
            paymentDayDate: newPaymentDay
          }
        });
      }
    }
    return reply.status(204).send();
  });
}

export {
  removeClientLatePayment
};
