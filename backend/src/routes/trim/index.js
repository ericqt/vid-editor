import { Router } from 'express'
const router = Router();

import ffmpeg from 'fluent-ffmpeg';
import { Queue } from 'bullmq'
const trimQ = new Queue('trim-q', { connection: { port: 6379, host: 'redis'}});
// const util = require('node:util');
// const ffprobe = util.promisify(ffmpeg.ffprobe);

const getFirstAudioCodecName = (streams) => {
  for(const stream of streams){
    console.log(stream.codec_type)
    if (stream.codec_type == 'audio'){
      console.log(stream.codec_name)
      return stream.codec_name
    }
  }
}

/*
const incompatible_formats = (data) => {
  format_name = data.format.format_name;
  console.log(data)
  audio_codec = getFirstAudioCodecName(data.streams)
  console.log('format name: ', format_name, 'included?', format_name.includes('mp4'))
  console.log('audio codec: ', audio_codec)
  if (format_name.includes('mp4') && audio_codec == 'pcm_s16be'){
    return true
  } else {
    return false
  }
}

const prober = async () => {
  try {
    data = {}
    console.log("starting probe")
    const result = await ffprobe('./public/videos/Serve_3.MP4', (err, data) => data)
    data = result
    if(incompatible_formats(data)){
      console.log('your formats are incompatible.')
    }
  } catch (error) {
    console.log('there was an error', error)
  }
}

*/
router.route('/test')
  .get( (req, res, next) => {
    //prober()
    console.log('you hit the test endpoint');
    trimQ.add('trim-q', {
      'starttime': 'test'
    });
    res.status(200).send('bar');
  })

const cuttimesFormatter = (item, index, formatted_times) => {
  formatted_times.push([item[0], item[1]-item[0]])
}

router.route('/')
  .get( async (req, res, next) => {
    console.log('ya hit the get in trim endpoint')
    res.json("booyakasha");
  })
  .post( async (req, res, next) => {
    console.log('in trim index post method', req.body);
    console.log(process.cwd());
    res.json(req.body);
    let command = ffmpeg('./videos/test_vid.mkv');
    let formatted_times = []
    let cuttimes = req.body['cuttimes'];
    //cuttimes.forEach(cuttimesFormatter())
    let starttime = cuttimes[0][0];
    let endtime = cuttimes[0][1] - cuttimes[0][0];
    //console.log('the formatted cut times are: ', formatted_times)
    console.log('attempting to use ffmpeg here');
    const job = trimQ.add('trim-q', {
      'starttime': starttime,
      'endtime': endtime
    });
    console.log('job has been added')
  });

export default router;
