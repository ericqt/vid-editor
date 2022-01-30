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
    command = ffmpeg('./videos/test_vid.mkv');
    res.json(req.body);
    cuttimes = req.body['cuttimes'];
    starttime = cuttimes[0][0];
    endtime = cuttimes[0][1];
    console.log('attempting to use ffmpeg here');
    command.inputOptions([`-noaccurate_seek`, `-ss`, starttime])
    .outputOptions([`-to`, endtime, `-c:v copy`, `-c:a copy`])
    .on('error', (err) => {
      console.log('An Error occurred: ', err.message);
    })
    .on('end', () => {
      console.log('processing has finished!');
    })
    .save('./videos/cut_video.mp4')
  });

module.exports = router;
