var model;


async function loadmodel() {
  // body...
  model= await tf.loadGraphModel("TFJS/model.json");

}
function predictimage()
{
	//console.log('processing.js');
	let image =cv.imread(canvas);
  cv.cvtColor(image,image,cv.COLOR_RGBA2GRAY,0);
  cv.threshold(image,image,175,255,cv.THRESH_BINARY)
  let hierarchy=new cv.Mat();
  let contours=new cv.MatVector();
  cv.findContours(image,contours,hierarchy,cv.RETR_CCOMP,cv.CHAIN_APPROX_SIMPLE);
  let cnt=contours.get(0);
  let rect=cv.boundingRect(cnt);
  image=image.roi(rect);
  var height=image.rows;
  var width=image.cols;
  if(height>width)
  {
  	height=20;
  	const scalarfactor=image.rows/height;
  	width=Math.round(image.cols/scalarfactor);
  }
  else
  {
  	width=20;
  	const scalarfactor=image.cols/width;
  	height=Math.round(image.cols/scalarfactor);
  }
  //console.log(height,width);
	// testing only (delete later)
	let newsize=new cv.Size(width,height);
	cv.resize(image,image,newsize,0,0,cv.INTER_AREA);

	const left=Math.ceil(4+(20-width)/2);
	const right=Math.floor(4+(20-width)/2);
	const top=Math.ceil(4+(20-height)/2);
	const bottom=Math.floor(4+(20-height)/2);
//	console.log(` top : ${top}, bottom: ${bottom},left:${left} ,right:${right}`);
   
  
   const black=new cv.Scalar(0,0,0,0);
   cv.copyMakeBorder(image,image,top,bottom,left,right,cv.BORDER_CONSTANT,black);

   // center of mass 
 cv.findContours(image,contours,hierarchy,cv.RETR_CCOMP,cv.CHAIN_APPROX_SIMPLE);
 cnt =contours.get(0);
 const moments=cv.moments(cnt,false);
 const cx=moments.m10/moments.m00;
 const cy=moments.m01/moments.m00;
 //console.log(`  m00: ${moments.m00},cx:${cx}, cy:${cy}`)
 const x_shift=Math.round(image.cols/2.0-cy);
  const y_shift=Math.round(image.rows/2.0-cy);
newsize=new cv.Size(image.cols,image.rows);
const m=cv.matFromArray(2,3,cv.CV_64FC1,[1,0,x_shift,0,1,y_shift]);
cv.warpAffine(image,image,m,newsize,cv.INTER_LINEAR,cv.BORDER_CONSTANT,black);

  pixelvalues= image.data;
  pixelvalues=Float32Array.from(pixelvalues);
  //console.log(pixelvalues);

  pixelvalues=pixelvalues.map(function(item)
  {
return item/255.0;
  });
  //console.log(pixelvalues);
var x=tf.tensor(pixelvalues);
//console.log('shape of tensor',x.shape);
x=tf.reshape(x,[1,784])
//print(x.shape)
const result =model.predict(x);
//console.log(result);
//result.print();

//const outputcanvas=document.createElement('CANVAS');
//cv.imshow(outputcanvas,image);
  // document.body.appendChild(outputcanvas);

const output =result.dataSync()[0];


x.dispose();result.dispose();


 image.delete();
  contours.delete();
 cnt.delete();
  hierarchy.delete();
  return output;

}