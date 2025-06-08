import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { z } from 'zod';

import { randomUUID } from 'node:crypto';

import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider
} from 'fastify-type-provider-zod';

import { channels } from '../broker/channels/index.ts';
import { schema } from '../db/schema/index.ts';
import { db } from '../db/client.ts';
import { id } from 'zod/v4/locales';
import { dispatchOrderCreated } from '../broker/messages/order-created.ts';

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

app.post('/orders', {
    schema: {
        body: z.object({
            amount: z.coerce.number(),
        })
    }
}, async (request, reply) => {
    const { amount } = request.body;
    console.log(`Creating order with amount: ${amount}`);

    const orderId = randomUUID();
    const customerId = '606335E4-9FD2-4358-8A02-94500DF3C3C6';

    dispatchOrderCreated({
        orderId,
        customerId: {
            id: customerId
        },
        amount,
    })

    try {

        await db.insert(schema.orders).values({
            id: orderId,
            customerId: customerId,
            amount,
            createdAt: new Date(),
        })
        return reply.status(201).send();

    }
    catch (err) {
        console.error('Error on create order:', err);
    }
});

app.listen({
    host: '0.0.0.0',
    port: Number(process.env.PORT)
})
.then(() => {
    console.log(`[Orders] service is running on http://localhost:${process.env.PORT}`);
})
.catch((err) => {
    console.error('Error starting the server:', err);
});