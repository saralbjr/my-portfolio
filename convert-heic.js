const fs = require('fs');
const heicConvert = require('heic-convert');

(async () => {
    const inputBuffer = fs.readFileSync('./public/images/projects/IMG_0807.HEIC');
    const outputBuffer = await heicConvert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 1
    });
    fs.writeFileSync('./public/images/profile.jpg', outputBuffer);
    console.log('Converted');
})();
