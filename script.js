const video = document.getElementById('video');


Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')
    
]).then(startVideo)


function startVideo() {

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: {} }, successCallback, errorCallback);
        function successCallback(stream) {
            video.srcObject = stream;
        }
        function errorCallback(error) {

            console.log('An error occurred: [CODE ' + error.code + ']');

        }
    } else {
        console.log('Native web camera streaming (getUserMedia) is not supported in this browser.');
    }

}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    console.log(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizeDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height) //hace que el renderizado sea mas limpio
        faceapi.draw.drawDetections(canvas, resizeDetections) //dibujo loque quiero visualizar
        faceapi.draw.drawFaceLandmarks(canvas, resizeDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizeDetections)
    }, 100)
})

