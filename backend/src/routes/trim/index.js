import { Router } from 'express'
const router = Router();

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
    //prober()
    console.log('you hit the test endpoint');
    let name = 'lawl'
    trimQ.addBulk('trim-q', [
      { name, data: { paint: 'car' } },
      { name, data: { paint: 'house' } },
      { name, data: { paint: 'boat' } },
    ]);
    res.status(200).send('bar');
  })

router.route('/')
  .get( async (req, res, next) => {
    console.log('ya hit the get in trim endpoint')
    res.json("booyakasha");
  })
  .post( async (req, res, next) => {
    console.log('in trim index post method', req.body);
    res.json(req.body);
    let formatted_times = []
    let cuttimes = req.body['cuttimes'];
    const bulkedJobs = formatJobsPayload(cuttimes);
    console.log(bulkedJobs)
    console.log('attempting to use ffmpeg here');
    const jobs = await trimQ.addBulk(bulkedJobs);
    console.log('job has been added')
  });

export default router;
