import { Worker } from 'bullmq';
import redisWorker from './config/bullmqRedisConnection.js'
import ffmpeg from 'fluent-ffmpeg';

const trimmer = async (fileName, index, start, end) => {
    try{
        ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH);
        let splitted = fileName.split('.');
        console.log('the fileName is:', splitted);
        const ext = splitted.pop();
        const name = splitted.join('.')
        const command = ffmpeg(`./public/videos/${fileName}`)
        const filename = `${name}_${index}.${ext}`
        console.log('the new filename is:', filename);
        const result = await command
        .outputOptions(['-ss', start, '-to', end, '-c', 'copy'])
        .on('start', (commandLine) => {
            console.log('spawned ffmpeg commmand as:', commandLine)
        })
        .on('error', (err) => {
            console.log('An Error occurred in the second: ', err.message, 'and the whole message', err);
        })
        .on('end', () => {
            console.log('processing has finished!');
          
        })
        .save(`./public/videos/${filename}`)
    } catch (err) {
        console.log('caught an error here: ', err);
    }
}

const trimmerWorker = redisWorker(
    'trimmer',
    async job => {
        //stuff here
        const video = job.data
        console.log('starting trim with fileName:', video.fileName);
        const result = await trimmer(video.fileName, video.index, video.start, video.end);
        console.log(`the result from trimmer ${job.data.index} is:`, result);
    }
)
