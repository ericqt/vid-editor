import { Worker, FlowProducer } from 'bullmq';
import ffmpeg from 'fluent-ffmpeg';
const flowProducer = new FlowProducer({
    connection: {
        host: process.env.redisHost,
        port: "6379"
    }
});

const trimmer = async (index, start, end) => {
    ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH);
    let command = ffmpeg('./public/videos/Serve_3.MP4')
    console.log('starting the ffmpeg command')
        try{
            const result = await command.inputOptions(['-ss', start])
            .outputOptions(['-to', end, '-c', 'copy'])
            .on('start', (commandLine) => {
                console.log('spawned ffmpeg commmand as:', commandLine)
            })
            .on('error', (err) => {
                console.log('An Error occurred in the second: ', err.message, 'and the whole message', err);
            })
            .on('end', () => {
                console.log('processing has finished!');
              
            })
            .save('./public/videos/cut_video_'+index+'.mp4')
        } catch (err) {
            console.log('caught an error here: ', err);
        }
}

const formatJobsPayload = (rawData) => {
    return rawData.map( (times, index) => ({
        'name': 'lawl',
        data: {
            index,
            start: times[0],
            end  : times[1],
        },
        queueName: 'trimmer',        
    }));
}

const flowMain = new Worker(
    'trim-q', 
    async job => {
        // console.log('starting work now with data:', job.data);
        // const result = await trimmer(job.data['index'], job.data['start'], job.data['end']);
        // console.log(result)
        // console.log('formatting jobs', job.data.roundedTimes);
        const times = formatJobsPayload(job.data.roundedTimes);
        // console.log('the formatted jobs payload is:', times);
        console.log('times:', times)
        const flow = await flowProducer.add({
            name: 'joinFlow',
            queueName: 'joiner',
            children: times
        })
        .then( (data) => {console.log('added child jobs', data)});
    }, 
    {
        connection: {
            host: process.env.redisHost,
            port: "6379"
        }
    })
