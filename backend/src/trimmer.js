import { Worker } from 'bullmq';
import redisWorker from './config/bullmqRedisConnection.js'
import ffmpeg from 'fluent-ffmpeg';
import splitFileName from './utils/utils.js';

const trimmerLogic = async (fileName, childFileName, index, start, end) => {
    try{
        ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH);
        const command = ffmpeg(`./public/videos/${fileName}`)
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
            return `${childFileName} is done`;
        })
        .save(`./public/videos/${childFileName}`)
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
        const result = await trimmerLogic(
            video.fileName, 
            video.childFileName, 
            video.index, 
            video.start, 
            video.end
        );
        console.log(`trimmerLogic of file ${video.childFileName} is done`, result);
        return `${video.childFileName} is done`;
    }
)
