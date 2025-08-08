import * as joi from 'joi';
import 'dotenv/config';

interface EnviromentVariables {
    NATS_SERVER: string;
}

const envitonmentSchema = joi.object({
    NATS_SERVER: joi.string().required(),
}).unknown();

const { error, value } = envitonmentSchema.validate({
    ...process.env,
});

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const enviromentVariables: EnviromentVariables = value;

export const environments = {
    natsServer: enviromentVariables.NATS_SERVER,
};