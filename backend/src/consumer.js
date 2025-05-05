import { Worker } from 'bullmq';
import redis from 'ioredis';

const connection = new redis({ 
    maxRetriesPerRequest: null,
    host: "redis"
})

const worker = new Worker(
    'trim-q', 
    async job => {
        if (job.name == 'trim-q') {
            await paintCar(job.data);
        }
        console.log('working now')
    }, 
    {
        connection: {
            host: "redis",
            port: "6379"
        }
    })
