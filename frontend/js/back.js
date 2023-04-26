window.onload = function () {
	var url = document.location.href,
		param = url.split('?')[1],
		data = {}, tmp;
	tmp = param.split('=');
	data[tmp[0]] = tmp[1];
	
	document.getElementById('success-link').href = `${decodeURIComponent(data.link)}`;
	document.getElementById('success-link').innerHTML = `${decodeURIComponent(data.link)}`;
}

function backHome() {
	window.location.replace("./index.html");
	return;
}