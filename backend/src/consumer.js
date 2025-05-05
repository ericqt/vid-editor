import { Worker } from 'bullmq';
import redis from 'ioredis';

const worker = new Worker(
    'trim-q', 
    async job => {
        console.log('working now')
        if (job.name == 'trim-q') {
            console.log(job.data);
        }
    }, 
    {
        connection: {
            host: process.env.redisHost,
            port: "6379"
        }
    })
