import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { errorHandler } from "./error-handler";
import { createGym } from "./routes/create-gym";
import { getClients } from "./routes/get-client";
import { getClientList } from "./routes/get-client-list";
import { getLatePayment } from "./routes/get-late-payment";
import { registerClient } from "./routes/register-client";
import { RemoveClient } from "./routes/remove-client";
import { removeClientLatePayment } from "./routes/remove-client-late-payment";


const app = fastify()

app.register(fastifyCors, {
  origin: '*'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  swagger: {
    consumes: ['aplication/json'],
    produces: ['aplication/json'],
    info: {
      title: 'Gym-Mensality',
      description: 'Programa desenvolvido com o objetivo de facilitar a vida de professores da Academia',
      version: '1.0.0'
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(registerClient)
app.register(createGym)
app.register(getClientList)
app.register(getClients)
app.register(getLatePayment)
app.register(removeClientLatePayment)
app.register(RemoveClient)

app.setErrorHandler(errorHandler)

app.listen({port: 3333, path: '0.0.0.0'}, () => {
  console.log("aplicação iniciada")  
})