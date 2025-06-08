import { Worker } from 'bullmq';
import ffmpeg from 'fluent-ffmpeg';

const joiner = async (fileName, index, start, end) => {
    ffmpeg.setFfmpegPath(process.env.FFMPEG_PATH);
    let command = ffmpeg('./public/videos/Serve_3.MP4')
    console.log('starting the ffmpeg command')
        try{
            // const result = await command.inputOptions(['-ss', start])
            const filename = `cut_video_${index}.mp4`
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

const joinerWorker = new Worker(
    'joiner',
    async job => {
        const video = job.data
        console.log('inside the joiner worker');
    },
)
