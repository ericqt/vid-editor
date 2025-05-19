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
        start: times[0].toFixed(2),
        end  : (times[1] - times[0]).toFixed(2)
      }
    }));
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
      console.log('about to ffprobe');
      let command = ffmpeg.ffprobe('./public/videos/Serve_3.MP4', (err, metadata) => {
          console.log(process.cwd())
          console.dir('the error is', err)
          console.dir('ffprobing the video', metadata);
      });
      //console.log('the video metadata is:\n\n',video_metadata)
      res.json(req.body);
      let formatted_times = []
      let cuttimes = req.body['cuttimes'];
      const bulkedJobs = formatJobsPayload(cuttimes);
      console.log(bulkedJobs)
      /*
      console.log('attempting to use ffmpeg here');
      const jobs = await trimQ.addBulk(bulkedJobs);
      console.log('job has been added')
      */
  });

export default router;
