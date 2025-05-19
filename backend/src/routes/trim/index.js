import { Router } from 'express'
const router = Router();
import video from '../../mongo_models/video.js';
import ffmpeg from 'fluent-ffmpeg';


import { Queue } from 'bullmq'
const trimQ = new Queue('trim-q', { connection: { port: 6379, host: 'redis'}});

const formatJobsPayload = (rawData) => {
    return rawData.map( (times, index) => ({
      'name': 'lawl',
      data: {
        index,
        start: times[0],
        end  : times[1]
      }
    }));
}

const getMetadata = (filePath, roundedTimes) => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            console.log('the error is', err)
            //console.log('ffprobing the video', metadata);
            const video_stream = metadata.streams.find( (stream) => stream.codec_type == 'video')
            const format_data = metadata.format
            resolve({
                fileName: format_data.filename.split('/').at(-1),
                fileSize: format_data.size,
                length: format_data.duration,
                codecName: video_stream.codec_name,
                dimensions: [video_stream.width, video_stream.height],
                avgFrameRate: video_stream.avg_frame_rate,
                videoBitRate: video_stream.bit_rate,
                rotation: video_stream.rotation,
                cuts: roundedTimes,
            });
        });
    })
}

router.route('/test')
.get( (req, res, next) => {
    const newVideo = new video({
        file_name: 'lawl',
        file_size: 51234324,
        length: 351,
        cuts: [[30, 50], [35, 60]]
    })
    newVideo.save()
        .then(data => console.log('successfully saved:', data))
        .catch(error => console.log('failed to save:', error))
    console.log('you hit the test endpoint');
    res.status(200).send('bar');
})

router.route('/test_get_db')
.get( (req, res, next) => {
    let db = req.app.locals.dbConn;
    let testModel = db.model('test', testSchema)
})

router.route('/')
.get( async (req, res, next) => {
    console.log('ya hit the get in trim endpoint')
    res.json("booyakasha");
})
.post( async (req, res, next) => {
    console.log('in trim index post method', req.body);
    ffmpeg.setFfprobePath(process.env.FFPROBE_PATH);
    let video_data = {}
    res.json(req.body);
    let formatted_times = []
    let cuttimes = req.body['cuttimes'];
    let roundedTimes = cuttimes.map( (times) => [Math.round(times[0] * 100) / 100, Math.round(times[1] * 100) / 100])
    const filePath = './public/videos/Serve_3.MP4'
    try {
        const metadata = await getMetadata(filePath, roundedTimes)
        console.log(metadata)
    } catch (err) {
        console.log(err)
    }
    const bulkedJobs = formatJobsPayload(roundedTimes);
    console.log(bulkedJobs)
    
    // adding the job for workers to consume
    console.log('attempting to use ffmpeg here');
    const jobs = await trimQ.addBulk(bulkedJobs);
    console.log('job has been added')
    
});

export default router;
