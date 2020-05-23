function preparecanvas()
{
	console.log('preparing canvas');
	const canvas=document.getElementById('my-canvas');
	const context=canvas.getContext("2d");
	context.fillStyle='#FFFFFF';
	context.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);
}