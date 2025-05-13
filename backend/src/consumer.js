import cmd from 'child_process';
import worker from 'bullmq';
import redis from 'ioredis';
import ffmpeg from 'fluent-ffmpeg';

const consumer = new worker.Worker(
    'trim-q', 
    async job => {
        ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH);
        console.log('starting work now with data:', job.data);
        const starttime = job.data['start']
        const endtime = job.data['end']
        const index = job.data['index']
        let command = ffmpeg('./public/videos/Serve_3.MP4')

        console.log('starting the ffmpeg command')
        try{
            const result = await command.inputOptions(['-noaccurate_seek', '-ss', Math.round(starttime)])
            .outputOptions(['-t', Math.round(endtime), '-c', 'copy'])
            .on('start', (commandLine) => {
                console.log('spawned ffmpeg commmand as:', commandLine)
            })
            .on('error', (err) => {
              console.log('An Error occurred in the second: ', err.message, 'and the whole message', err);
            })
            .on('end', () => {
              console.log('processing has finished!');
            })
            //.save('./videos/cut_video.mp4')
            .save('./public/videos/cut_video_'+index+'.mp4')
        } catch (err) {
            console.log('caught an error here: ', err);
        }
        console.log(result)
    }, 
    {
        connection: {
            host: process.env.redisHost,
            port: "6379"
        }
    })
