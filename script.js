const video = document.getElementById('video');

if (navigator.getUserMedia) {
	navigator.getUserMedia({video:{}}, successCallback, errorCallback);
	function successCallback(stream) {
		video.srcObject = stream;
	}
	function errorCallback(error) {
		console.error('An error occurred: [CODE ' + error.code + ']');
		
	}
} else {
	console.log('Native web camera streaming (getUserMedia) is not supported in this browser.');
	
}