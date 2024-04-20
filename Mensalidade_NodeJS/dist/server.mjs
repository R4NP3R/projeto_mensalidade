import {
  getLatePayment
} from "./chunk-2PISXJM2.mjs";
import {
  registerClient
} from "./chunk-AGFU4Q4W.mjs";
import {
  putClient
} from "./chunk-YWWELQRF.mjs";
import {
  errorHandler
} from "./chunk-RQM7Z7ZF.mjs";
import {
  createGym
} from "./chunk-SC2BOPNS.mjs";
import {
  removeClientLatePayment
} from "./chunk-ZD2CGJKH.mjs";
import "./chunk-A42IFF2V.mjs";
import "./chunk-NOVRIJ2H.mjs";
import {
  RemoveClient
} from "./chunk-IKI4OZYL.mjs";
import {
  getClientList
} from "./chunk-7X6LT27P.mjs";
import {
  getClients
} from "./chunk-TQSOARZG.mjs";
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
app.register(RemoveClient);
app.register(putClient);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, path: "0.0.0.0" }, () => {
  console.log("aplica\xE7\xE3o iniciada");
});
