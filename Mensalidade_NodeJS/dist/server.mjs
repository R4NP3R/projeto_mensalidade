import {
  registerClient
} from "./chunk-AVKGTWUO.mjs";
import {
  removeClientLatePayment
} from "./chunk-FNX4YZUV.mjs";
import {
  errorHandler
} from "./chunk-AX7MF2JY.mjs";
import {
  createGym
} from "./chunk-SC2BOPNS.mjs";
import "./chunk-A42IFF2V.mjs";
import {
  getClientList
} from "./chunk-T7EW2JTR.mjs";
import {
  getClients
} from "./chunk-TQSOARZG.mjs";
import {
  getLatePayment
} from "./chunk-OPFBS3W7.mjs";
import "./chunk-NOVRIJ2H.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(fastifySwagger, {
  swagger: {
    consumes: ["aplication/json"],
    produces: ["aplication/json"],
    info: {
      title: "Gym-Mensality",
      description: "Programa desenvolvido com o objetivo de facilitar a vida de professores da Academia",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.register(registerClient);
app.register(createGym);
app.register(getClientList);
app.register(getClients);
app.register(getLatePayment);
app.register(removeClientLatePayment);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, path: "0.0.0.0" }, () => {
  console.log("aplica\xE7\xE3o iniciada");
});
