const video = document.getElementById('video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromWeightMap('/models'),
    faceapi.nets.faceLandmark68Net.loadFromWeightMap('/models'),
    faceapi.nets.faceRecognitionNet.loadFromWeightMap('/models'),
    faceapi.nets.faceExpressionNet.loadFromWeightMap('/models')
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

