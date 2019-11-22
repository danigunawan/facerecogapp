const video = document.getElementById('video');
const msj = document.getElementById('msj');

if (navigator.getUserMedia) {
	navigator.getUserMedia({video:{}}, successCallback, errorCallback);
	function successCallback(stream) {
		video.srcObject = stream;
	}
	function errorCallback(error) {

        msj.innerHTML =   'An error occurred: [CODE ' + error.code + ']';
		
	}
} else {
	msj.innerHTML = 'Native web camera streaming (getUserMedia) is not supported in this browser.';
}