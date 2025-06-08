import { Router } from 'express'
const router = Router();
import video from '../../mongo_models/video.js';
import buildMetadata from '../../ffmpeg/metadata.js'


import { Queue } from 'bullmq'
const trimQ = new Queue('trim-q', { connection: { port: 6379, host: 'redis'}});

const createVideoDoc = async (cutTimes, metadata) => {
    const newVideo = new video({
        ...metadata,
        cuts: cutTimes
    })
    const result = await newVideo.save()
    return result.fileName
}

router.route('/')
.get( async (req, res, next) => {
    console.log('ya hit the get in trim endpoint')
    res.json("booyakasha");
})
.post( async (req, res, next) => {
    console.log('in trim index post method');
    let video_data = {}
    res.json(req.body);
    let formatted_times = []
    let cuttimes = req.body['cuttimes'];
    let roundedTimes = cuttimes.map( (times) => [Math.round(times[0] * 100) / 100, Math.round(times[1] * 100) / 100])
    const filePath = './public/videos/Serve_3.MP4'
    try {
        const metadata = await buildMetadata(filePath, roundedTimes)
        const fileName = await createVideoDoc(roundedTimes, metadata).catch(error => console.error('failed to save:', error));
        const jobs = await trimQ.add('trim-q', {fileName, roundedTimes});
        console.log('job has been added')
    } catch (err) {
        console.log(err)
    }
});

export default router;
