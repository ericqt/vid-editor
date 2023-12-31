var router = require('express').Router();

var ffmpeg = require('fluent-ffmpeg');

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
    console.log('the command is: ', command);
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
