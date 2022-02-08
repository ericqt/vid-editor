const util = require('node:util');
var router = require('express').Router();
var ffmpeg = require('fluent-ffmpeg');
var Queue = require('bull');
const trimQ = new Queue('trim-q', { redis: { port: 6379, host: 'redis'}});
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

router.route('/test')
  .get( (req, rest, next) => {
    prober()
  })

*/

router.route('/')
  .get( async (req, res, next) => {
    console.log('ya hit the get in trim endpoint')
    res.json("booyakasha");
  })
  .post( async (req, res, next) => {
    console.log(process.cwd());
    res.json(req.body);
    command = ffmpeg('./videos/test_vid.mkv');
    cuttimes = req.body['cuttimes'];
    starttime = cuttimes[0][0];
    endtime = cuttimes[0][1] - cuttimes[0][0];
    console.log('attempting to use ffmpeg here');
    command = ffmpeg('./public/videos/Serve_3.MP4')
      .videoCodec('copy')
      // ah the audio copy is not working
      //.audioCodec('copy')
      .setStartTime(starttime)
      .setDuration(endtime);
    command
    .on('error', (err) => {
      console.log('An Error occurred: ', err.message, 'and the whole message', err);
    })
    .on('end', () => {
      console.log('processing has finished!');
    })
    .save('./public/videos/cut_video.mp4')
    console.log('what are the times? ', req.body);
    const job = trimQ.add({
      'starttime': starttime,
      'endtime': endtime
    });
    res.json("the job is done")
    //result = await command.inputOptions([`-noaccurate_seek`, `-ss`, starttime])
    //.outputOptions([`-to`, endtime, `-c:v copy`, `-c:a copy`])
    //.on('error', (err) => {
    //  console.log('An Error occurred: ', err.message);
    //})
    //.on('end', () => {
    //  console.log('processing has finished!');
    //})
    //.save('./videos/cut_video.mp4')
    //res.json('this is the result');
  });

// Move this function in to it's own file and create a new
// docker service that starts the script with `node`
trimQ.process( async(job, done) => {
  done();
  console.log(job.data);
  console.log('did some work here');
  return true;
});

module.exports = router;
