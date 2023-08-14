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
    command = ffmpeg('./public/videos/Serve_3.MP4');
    res.json(req.body);
    cuttimes = req.body['cuttimes'];
    starttime = cuttimes[0][0];
    endtime = cuttimes[0][1] - cuttimes[0][0];
    console.log('attempting to use ffmpeg here');
    command.inputOptions([`-noaccurate_seek`, `-ss`, 0, `-t`, 10])
    .outputOptions([`-c:v copy`, `-c:a copy`])
    .on('error', (err) => {
      console.log('An Error occurred: ', err.message, err);
    })
    .on('end', () => {
      console.log('processing has finished!');
    })
    .save('./public/videos/cut_video.mp4')
  });

module.exports = router;
