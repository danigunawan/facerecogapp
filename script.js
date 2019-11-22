const video = document.getElementById('video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromDisk('/models'),
    faceapi.nets.faceLandmark68Net.loadFromDisk('/models'),
    faceapi.nets.faceRecognitionNet.loadFromDisk('/models'),
    faceapi.nets.faceExpressionNet.loadFromDisk('/models')
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

