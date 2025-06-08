import { Worker, FlowProducer, Queue } from 'bullmq';
import redisWorker from './config/bullmqRedisConnection.js'
import ffmpeg from 'fluent-ffmpeg';
const trimmerQ = new Queue('trimmer', { connection: { port: 6379, host: 'redis'}});

const flowProducer = new FlowProducer({
    connection: {
        host: process.env.redisHost,
        port: "6379"
    }
});

const formatJobsPayload = (rawData, fileName) => {
    return rawData.map((times, index) => ({
        name: `trim ${index}`,
        data: {
            index,
            fileName,
            start: times[0],
            end  : times[1],
        },
        queueName: 'trimmer',        
    }));
}

redisWorker(
    'trim-q', 
    async job => {
    console.log('formatting jobs');
    const childJobs = formatJobsPayload(job.data.roundedTimes, job.data.fileName);
    if(childJobs.length <=1){
        console.log('only a single trim here', childJobs[0].data);
        trimmerQ.add('singleTrim', childJobs[0].data);
    } else {
        console.log('childJobs:', childJobs)
        const flow = await flowProducer.add({
            name: 'joinFlow',
            queueName: 'joiner',
            children: childJobs
        })
        .then( (data) => {console.log('added child jobs')});
        }
    }
)
