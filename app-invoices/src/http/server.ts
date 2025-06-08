import '../broker/subscriber.ts'; 

import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';

import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from 'fastify-type-provider-zod';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, { origin: '*' });

//Rota healthcheck
app.get('/health', () => {
    return 'OK';
});

//Escalonamento horizontal
//Deploy: Blue-gren deployment

//Ver1
//Ver2

app.listen({
    host: '0.0.0.0',
    port: Number(process.env.PORT)
})
.then(() => {
    console.log(`[Invoices] service is running on http://localhost:${process.env.PORT}`);
})
.catch((err) => {
    console.error('Error starting the server:', err);
});