import redisWorker from './config/bullmqRedisConnection.js'
import ffmpeg from 'fluent-ffmpeg';
import splitFileName from './utils/utils.js';
import { writeFile } from 'fs/promises';

const joiner = async (fileName, index, start, end) => {
    try{
        ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH);
        const [name, ext] = splitFileName(fileName)
        let command = ffmpeg(`./public/videos/${fileName}`)
        console.log('starting the ffmpeg command')
        // const result = await command.inputOptions(['-ss', start])
        const filename = `${name}_joined.${ext}`
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

const joinerWorker = redisWorker(
    'joiner',
    async job => {
        const video = job.data
        console.log('---------------------------------------------------------');
        console.log('inside the joiner worker');
    },
)
