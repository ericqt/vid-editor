import { Worker } from 'bullmq';
import ffmpeg from 'fluent-ffmpeg';

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

const trimmerWorker = new Worker(
    'joiner',
    async job => {
        //stuff here
        console.log('starting trim with data:', job.data);
    },
    {
        connection: {
            host: process.env.redisHost,
            port: "6379"
        }
    }
)
