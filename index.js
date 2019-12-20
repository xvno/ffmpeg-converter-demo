const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');
// console.log(ffmpeg.path);

const src = '/Users/volving/Downloads/raw/A004C013_160226_R4RF.mov';
const codec = 'h264_videotoolbox';
const width = 1920;
const height = 1080;
const bitrate = '1000k';
const muxer = 'mp4';
const dest = '/Users/volving/Downloads/raw/converted/a004_h264_1920x1080.mp4';
// const cmd = `${ffmpeg.path} -i ${src} -c:v ${codec} -vf scale=w=${width}:h=${height}:force_original_aspect_ratio=decrease -b:v ${bitrate} -f ${muxer} ${dest} -y`;
// cmd = 'ls'

const cp = require('child_process');
let proc = cp.spawn(ffmpeg.path, [
    '-i',
    src,
    '-c:v',
    codec,
    '-vf',
    `scale=w=${width}:h=${height}:force_original_aspect_ratio=decrease`,
    '-b:v',
    bitrate,
    '-f',
    muxer,
    dest,
    '-y'
]);
proc.stdout.on('data', chunk => {
    console.log('data: ', chunk.toString());
});

proc.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
});

proc.on('close', code => {
    console.log(`child process exited with code ${code}`);
});
