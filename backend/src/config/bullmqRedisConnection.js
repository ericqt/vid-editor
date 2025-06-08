import { Worker, FlowProducer } from 'bullmq';

const connectionConfig = {
    connection: {
        host: process.env.redisHost,
        port: "6379"
    }
}

const redisWorker = (qName, job) => {
    return new Worker(
        qName,
        job,
        connectionConfig
    )
}

export default redisWorker;
