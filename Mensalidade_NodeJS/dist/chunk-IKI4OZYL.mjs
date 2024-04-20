import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/delete-client.ts
import z from "zod";
async function RemoveClient(app) {
  app.withTypeProvider().delete("/clients/:gymId/:clientId/remove", {
    schema: {
      params: z.object({
        gymId: z.string(),
        clientId: z.string()
      }),
      response: {
        204: z.object({
          removedClient: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const { clientId, gymId } = request.params;
    const client = await prisma.client.delete({
      where: {
        id: clientId,
        gymId
      }
    });
    reply.status(204).send({
      removedClient: client.name
    });
  });
}

export {
  RemoveClient
};
