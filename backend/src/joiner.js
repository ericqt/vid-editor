import redisWorker from './config/bullmqRedisConnection.js'
import ffmpeg from 'fluent-ffmpeg';
import splitFileName from './utils/utils.js';
import { writeFile } from 'fs/promises';

const joinerLogic = async (fileName, fileExt, childFileNames) => {
    try{
        // setup ffmpeg
        ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH);
        // setup the final filename
        const filename = `${fileName}_joined.${fileExt}`

        // setup the text file used for concat
        console.log('the cwd is:', process.cwd());
        const dirToVideos = `${process.cwd()}/public/videos/`
        const text = childFileNames.map( (childFileName) => `file '${dirToVideos}${childFileName}'`).join('\n');
        console.log('the joined filenames in a string is:', text);
        const concatTextFileName = `${dirToVideos}${fileName}_joined.txt`
        await writeFile(concatTextFileName, text, {encoding: 'utf8'});

        // build up the ffmpeg command
        let command = ffmpeg(concatTextFileName);
        console.log('starting the ffmpeg command');
        const result = await command.inputOptions('-f', 'concat', '-safe', '0')
        .outputOptions(['-c:v', 'copy'])
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
        console.log('inside the joiner worker', job.data);
        const childFileNames = job.data.files;
        const fileName = job.data.fileName
        const fileExt = job.data.fileExt
        joinerLogic(fileName, fileExt, childFileNames);
    },
)
