import {
  BadRequest
} from "./chunk-A42IFF2V.mjs";
import {
  generateSlug
} from "./chunk-NOVRIJ2H.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/create-gym.ts
import z from "zod";
async function createGym(app) {
  app.withTypeProvider().post("/gym", {
    schema: {
      summary: "create gym",
      tags: ["gym"],
      body: z.object({
        name: z.string()
      })
    }
  }, async (request, reply) => {
    const { name } = request.body;
    const gymId = generateSlug(name);
    const gymWithSameName = await prisma.gyms.findUnique({
      where: {
        name
      }
    });
    if (gymWithSameName !== null) {
      throw new BadRequest("Gym with this name already exists.");
    }
    const gym = await prisma.gyms.create({
      data: {
        gymId,
        name
      }
    });
    return reply.status(201).send({ gymId: gym.gymId });
  });
}

export {
  createGym
};
