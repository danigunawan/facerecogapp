const video = document.getElementById('video');


Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models')

]).then(startVideo).catch(error => console.log(error))


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
    // const displaySize = { width: video.width, height: video.height }
    document.body.append(canvas)

    // new code
    document.getElementById('overlay').style.display = "block";
    const dims = faceapi.matchDimensions(canvas, video, true);
    dims.height = video.offsetHeight;
    dims.width = video.offsetWidth;
    canvas.height = video.offsetHeight;
    canvas.width = video.offsetWidth;    
    
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizedResult = faceapi.resizeResults(detections, dims)
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height) //hace que el renderizado sea mas limpio
        faceapi.draw.drawDetections(canvas, resizedResult) //dibujo loque quiero visualizar
        faceapi.draw.drawFaceLandmarks(canvas, resizedResult)
        faceapi.draw.drawFaceExpressions(canvas, resizedResult)
    }, 100)
})

