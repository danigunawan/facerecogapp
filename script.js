const video = document.getElementById('video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
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

