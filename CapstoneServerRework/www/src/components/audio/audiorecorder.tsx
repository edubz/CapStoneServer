const MediaStreamRecorder = require('msr');
export const AudioRecorder = () => {
    const mediaConstraints = {
        audio: true
    };

    navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);

    function onMediaSuccess(stream: any) {
        const mediaRecorder = new MediaStreamRecorder(stream);
        mediaRecorder.mimeType = 'audio/wav';
        mediaRecorder.onDataAvailable = (blob: any) => {
            const blobURL = URL.createObjectURL(blob);
            console.log(blobURL);
        };
    }

    function onMediaError(error: any) {
        console.log(error);
    }
}
