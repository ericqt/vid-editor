const util = require('node:util');
var router = require('express').Router();

var ffmpeg = require('fluent-ffmpeg');
const ffprobe = util.promisify(ffmpeg.ffprobe);

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
  .get( (req, res, next) => {
    console.log('ya hit the get in trim endpoint')
    res.json("booyakasha");
  })
  .post( (req, res, next) => {
    console.log('ya hit the post in trim endpoint')
    console.log(process.cwd());
    res.json(req.body);
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
  });

module.exports = router;
