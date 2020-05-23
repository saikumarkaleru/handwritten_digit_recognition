var answer;
var score=0;
var backgroundimages=[];
function nextquestion() {
	// body...
	const n1=Math.floor(Math.random()*5);
	document.getElementById('n1').innerHTML=n1;
	const n2=Math.floor(Math.random()*6);
	document.getElementById('n2').innerHTML=n2;
	answer=n1+n2;
}
function checkanswer()
{
	const prediction=predictimage();
	console.log(prediction,answer);
	if(prediction==answer)
	{
		score+=1;
		if(score<=6){
		backgroundimages.push(`url('images/background${score}.svg')`);
		document.body.style.backgroundImage=backgroundimages;}
		else
		{
			alert("hey you won the game..garden is full !!");
			score=0;
			backgroundimages=[];
			document.body.style.backgroundImage=backgroundimages;
		}
	}
	else
	{
		if(score!=0)
	         	score-=1;
		alert(' try again ..draw correctly');

		setTimeout(function()
		{
backgroundimages.pop();
document.body.style.backgroundImage=backgroundimages;
		},1000);
	}

}