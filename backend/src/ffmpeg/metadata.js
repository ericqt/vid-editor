import ffmpeg from 'fluent-ffmpeg';
ffmpeg.setFfprobePath(process.env.FFPROBE_PATH);

const buildMetadata = (filePath, roundedTimes) => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if(err){
                console.log('the error is', err)
            }
            //console.log('ffprobing the video', metadata);
            const video_stream = metadata.streams.find( (stream) => stream.codec_type == 'video')
            const format_data = metadata.format
            resolve({
                fileName: format_data.filename.split('/').at(-1),
                fileSize: format_data.size,
                length: format_data.duration,
                codecName: video_stream.codec_name,
                dimensions: [video_stream.width, video_stream.height],
                avgFramerate: video_stream.avg_frame_rate,
                videoBitrate: video_stream.bit_rate,
                rotation: video_stream.rotation,
                cuts: roundedTimes,
            });
        });
    })
}

export default buildMetadata;
