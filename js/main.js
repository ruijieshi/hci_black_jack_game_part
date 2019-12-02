/*Global Variable*/
var card=new Array(53);
var bet_sore,ins_sore;
var y_sore=5000,c_sore=5000;
var y_A,c_A,y_sum,c_sum,y_mark,c_mark,y_num,c_num,num;
var y_x,y_y,c_x,c_y;

// Create a card
function Card(number) {
	this.value=Math.ceil(number/4);
	this.showcard=function(x,y,num,position) {
		$("#"+position).append($("<span/>").css({'left':x+num*15,'top':y}).append($("<img/>")
			.attr("src","picture/puker/"+number+".jpg")).fadeIn(500));
	}
}

function note(flag) {
	var text = "";
	if (flag==1){
		text = "Click the button to start the game."
	}else if (flag==2){
		text = "Confirm my bet and continue."
	}else if (flag==3){
		text = "All in my money as the bet."
	}else if (flag==4){
		text = "Reset the state of the bet."
	}else if (flag==5){
		text = "Ask for another card."
	}else if (flag==6){
		text = "Double your bet."
	}else if (flag==7){
		text = "Stand and stop asking for more cards."
	}else if (flag==8){
		text = "Surrender to your oppoenent."
	}else if (flag==9){
		text = "Buy the insurance."
	}else if (flag==10){
		text = "Start another game."
	}else{
		text = ""
	}
  	document.getElementById("box").innerHTML="<p>"+text+"</p>";
}

function start() {
$("#cards").fadeIn(1200,
	function(){
		document.getElementById("box").innerHTML="";
		cards_top=this.offsetTop;
		cards_left=this.offsetLeft;
		y_x=c_x=cards_left+510;
		c_y=cards_top-200;
		y_y=cards_top+200;
		bet();
	});	
}

function bet() {
	document.getElementById("box").innerHTML="";
	y_A=0,c_A=0,y_sum=0,c_sum=0,y_mark=0,c_mark=0,y_num=0,c_num=0,num=1;
	bet_sore=0,ins_sore=0;
	$("#sore").text("Money："+ y_sore);
	$("#ins").text("Insurance：No");
	$(".show").empty();
	$("#message").text("Please Pick A Bet");
	$("#center_message").html("<a href='#'>500</a><a href='#'>100</a><a href='#'>50</a><a href='#'>20</a><a href='#'>10</a>")
		.hide()
		.show(500);
	refresh();
	$(".message").hide().fadeIn(800);
	$("#center_message a").click(function(){bet_sore+=parseInt($(this).text());refresh();});
}

function refresh() {
	document.getElementById("box").innerHTML="";
	var options="";
	if(bet_sore==y_sore) {
		$("#message").text("You do no money left！");
		$("#center_message").fadeOut(500);
	}
	else if(y_sore-bet_sore<10) {
		bet_sore=Math.floor(y_sore/10)*10;
		$("#message").text("You do not have enough money"); 
		$("#center_message").fadeOut(500);
	}
	else {
		$("#center_message a").each(function(){
			if(y_sore-bet_sore<$(this).text()) {
				$(this).replaceWith($("<span>"+$(this).text()+"</span>").addClass('bet_sore'));
				$("#message").text("Your money left is less than "+$(this).text());
			}
		});
	}
	$("#bet").html("Bet："+ bet_sore);
	if(bet_sore) {
		options="<a href='#' id='game' class='custom_button'>Confirm</a><img onClick='note(2)' class='question' src='picture/desk/question.png'/>";
	}
	else {
		options="<br/>Confirm <img onClick='note(2)' class='question' src='picture/desk/question.png'/>";
	}
	if(y_sore-bet_sore>5)
		options+="<br/><a href='#' id='all_in' class='custom_button'>  All In  </a><img onClick='note(3)' class='question' src='picture/desk/question.png'/>";
	else
		options+="<br/>All In <img onClick='note(3)' class='question' src='picture/desk/question.png'/>";
	if(bet_sore)
		options+="<br/><a href='#' id='reset' class='custom_button'>  Reset  </a><img onClick='note(4)' class='question' src='picture/desk/question.png'/>";
	else
		options+="<br/>Reset <img onClick='note(4)' class='question' src='picture/desk/question.png'/>";
	$("#choose").html(options);
	$("#game").click(game);
	$("#all_in").click(all_in);
	$("#reset").click(bet);
}

function all_in(){
	document.getElementById("box").innerHTML="";
	bet_sore=Math.floor(y_sore/10)*10;
	refresh();
	if(y_sore%10)
		$("#message").text("5 dollars are not acceptable");
}

function cardsum(sum,value,A_num)
{
	document.getElementById("box").innerHTML="";
if(value>10)
value=10;
else if(value==1)
{
A_num++;
value=11;
}
sum+=value;
if(sum>21&&A_num!=0)
{
sum-=10;
A_num--;
}
return [sum,A_num];
}

function insurance()
{
	document.getElementById("box").innerHTML="";
ins_sore=bet_sore/2;
$("#ins").text("Insurance：Yes");
choosemenu(card[1].value);
}

function choosemenu()
{
	document.getElementById("box").innerHTML="";
$("#message").text("Please take an action");
var options="<a href='#' id='hit' class='custom_button'>     Hit     </a><img onClick='note(5)' class='question' src='picture/desk/question.png'/>";
if(y_sore>2*bet_sore)
options+="<br/><a href='#' id='double' class='custom_button'>  Double  </a><img onClick='note(5)' class='question' src='picture/desk/question.png'/>";
else
options+="<br/>Double <img onClick='note(6)' class='question' src='picture/desk/question.png'/>";
options+="<br/><a href='#' id='stand' class='custom_button'>   Stand   </a><img onClick='note(7)' class='question' src='picture/desk/question.png'/>";
if(card[1].value!=1&&y_num==2)
options+="<br/><a href='#' id='surrender' class='custom_button'>Surrender</a><img onClick='note(8)' class='question' src='picture/desk/question.png'/>"
else
options+="<br/>Surrender <img onClick='note(8)' class='question' src='picture/desk/question.png'/>"
$("#choose").html(options).show();
$("#hit").click(hit);
$("#double").click(double);
$("#stand").click(stand);
$("#surrender").click(surrender);
}

function hit()
{
	document.getElementById("box").innerHTML="";
$("#choose a").each(function(){$(this).replaceWith($(this).text());});
deal(y_x,y_y,y_num,function(){
card[num].showcard(y_x,y_y,y_num++,"y_show");
var par=cardsum(y_sum,card[num++].value,y_A);
y_sum=par[0];
y_A=par[1];
if(y_sum<22&&y_num<5)
choosemenu();
else 
stand();
});
}

function double()
{
	document.getElementById("box").innerHTML="";
$("#choose a").each(function(){$(this).replaceWith($(this).text());});
deal(y_x,y_y,y_num,function(){
bet_sore*=2;
$("#bet").html("Bet："+bet_sore);
card[num].showcard(y_x,y_y,y_num++,"y_show");
var par=cardsum(y_sum,card[num++].value,y_A);
y_sum=par[0];
stand();
});
}

function stand()
{
	document.getElementById("box").innerHTML="";
var par;
$("#choose").empty();
if(y_num==5)
y_mark=2;
$("#c_show span:eq(1)").remove();
card[num].showcard(c_x,c_y,1,"c_show");
par=cardsum(c_sum,card[num++].value,c_A);
c_sum=par[0];
c_A=par[1];
if(c_sum==21)
c_mark=1; 
if(c_sum<17&&c_num<5)
deal(c_x,c_y,c_num,function(){
card[num].showcard(c_x,c_y,c_num++,"c_show");
par=cardsum(c_sum,card[num++].value,c_A);
c_sum=par[0];
c_A=par[1];
if(c_sum<17&&c_num<5)
deal(c_x,c_y,c_num,arguments.callee);
else
{
if(c_sum<22&&c_num==5)
c_mark=2;
vs();	
}
});
else
{
if(c_sum<22&&c_num==5)
c_mark=2;
vs();	
}
}

function surrender()
{
	document.getElementById("box").innerHTML="";
y_sore-=bet_sore/2;
$("#sore").text("Money："+y_sore);
$("#center_message").html("<img class='result' src='picture/desk/emotion8.png'>You have surrended！").hide().fadeIn(500,function(){
if(y_sore<10)//Check if game is over
{
$("#message").text("Sorry, you do not have enough money！");
$("#choose").text("Game Over！");
window.setTimeout(function(){$('.show,#center_message,#right_top,#choose,#cards').fadeOut(1200,function(){location.reload()})},5000);//游戏结束后，先淡出再刷新
}
else//single game over
{
$("#message").text("Game Over，click\"Continue\"to start a new game");
$("#choose").html("<a href='#' id='reset' class='custom_button'>Continue <img onClick='note(10)' class='question' src='picture/desk/question.png'/>").hide().fadeIn(500);
$("#reset").click(bet);
}
});
}

/*Results*/
function vs()
{
	document.getElementById("box").innerHTML="";
var message,get_sore;
if(y_mark==2&&c_mark!=2&&y_sum<22)
{
message="<img class='result' src='picture/desk/emotion1.png'><p class='results'>You Win !</p>";
get_sore=2*bet_sore-ins_sore;
}
else if(c_mark==2&&y_mark!=2&&c_sum<22)
{
message="<img class='result' src='picture/desk/emotion7.png'><p class='results'>Your Oppoenent Win !</p>";
get_sore=-2*bet_sore-ins_sore;
}
else if(y_mark==2&&c_mark==2&&y_sum<22&&c_sum<22)
{
message="<img class='result' src='picture/desk/emotion4.png'><p class='results'>Draw !</p>";
get_sore=0;
}
else if(y_mark==1&&c_mark!=1)
{
message="<img class='result' src='picture/desk/emotion2.png'><p class='results'>You win with Black Jack</p>";
get_sore=1.5*bet_sore-ins_sore;
}
else if(y_mark!=1&&c_mark==1)
{
message="<img class='result' src='picture/desk/emotion6.png'><p class='results'>Your opponent win with Black Jack</p>";
get_sore=-1.5*bet_sore-ins_sore;
}
else if(y_mark==1&&c_mark==1)
{
message="<img class='result' src='picture/desk/emotion4.png'><p class='results'>You are your opponent both have Black Jack, Draw!</p>";
get_sore=0;
}
else if(y_sum>21&&c_sum<=21)
{
message="<img class='result' src='picture/desk/emotion5.png'><p class='results'>You Lose !</p>";
get_sore=-bet_sore-ins_sore;
}
else if(y_sum<=21&&c_sum>21)
{
message="<img class='result' src='picture/desk/emotion3.png'><p class='results'>You Win !</p>";
get_sore=bet_sore-ins_sore;
}
else if(y_sum>21&&c_sum>21)
{
message="<img class='result' src='picture/desk/emotion4.png'><p class='results'>Draw！</p>";
get_sore=0;
}
else if(y_sum<c_sum)
{
message="<img class='result' src='picture/desk/emotion5.png'><p class='results'>You Lose !</p>";
get_sore=-bet_sore-ins_sore;
}
else if(y_sum>c_sum)
{
message="<img class='result' src='picture/desk/emotion3.png'><p class='results'>You Win !</p>";
get_sore=bet_sore-ins_sore;
}
else if(y_sum==c_sum)
{
message="<img class='result' src='picture/desk/emotion4.png'><p class='results'>Draw！</p>";
get_sore=0;
}
y_sore+=get_sore;
$("#center_message").html(message).hide().fadeIn(500,function(){;
$("#sore").text("Moeny："+y_sore);
if(y_sore<10)//Check if game is over
{
$("#message").text("Sorry, you do not have enough moeny！");
$("#choose").text("Game over！");
window.setTimeout(function(){$('.show,#center_message,#right_top,#choose,#cards').fadeOut(1200,function(){location.reload()})},5000);//游戏结束后，先淡出再刷新
}
else
{
$("#message").text("Game Over，Click\"Continue\"to start a new game");
$("#choose").html("<a href='#' id='reset' class='custom_button'>Continue </a><img onClick='note(10)' class='question' src='picture/desk/question.png'/>").hide().fadeIn(500);
$("#reset").click(bet);
}
});
}


/*The Main function*/
function game() {
var par,j,temp;
$("#choose").empty().show();
$("#center_message").fadeOut(500,function(){
	$(this).empty().show();
	setTimeout(function(){	
		for(i=0;i<53;i++)
			card[i]=new Card(i);
		for(i=1;i<53;i++)
		{
			j=Math.floor(Math.random()*52)+1;
			temp=card[j];
			card[j]=card[i];
			card[i]=temp;
		}
		deal(c_x,c_y,c_num,function(){
			card[num].showcard(c_x,c_y,c_num++,"c_show");
			par=cardsum(c_sum,card[num++].value,c_A);
			c_sum=par[0];
			c_A=par[1];
			deal(c_x,c_y,c_num,function(){
				card[0].showcard(c_x,c_y,c_num++,"c_show");
				deal(y_x,y_y,y_num,function(){
					card[num].showcard(y_x,y_y,y_num++,"y_show");
					par=cardsum(y_sum,card[num++].value,y_A);
					y_sum=par[0];
					y_A=par[1];
					deal(y_x,y_y,y_num,function(){
						card[num].showcard(y_x,y_y,y_num++,"y_show");
						par=cardsum(y_sum,card[num++].value,y_A);
						y_sum=par[0];
						y_A=par[1];
						if(y_sum==21)
						{
						y_mark=1;
						stand();
						}
						else
						{
							if(card[1].value==1)
							{
								var options;
								if(y_sore>1.5*bet_sore)
								{
									$("#message").text("1 / 11? Do you want to buy insurance？");
									options="<a href='#' id='insurance'>Insurance </a><img onClick='note(9)' class='question' src='picture/desk/question.png'/>";
								}
								else
								{
									$("#message").text("You don't have enough money for insurance");
									options="Insurance <img onClick='note(9)' class='question' src='picture/desk/question.png'/>";
								}
								options+="<br/><a href='#' id='continue'>Continue </a><img onClick='note(10)' class='question' src='picture/desk/question.png'/>";
								$("#choose").html(options);
								$("#insurance").click(insurance);
								$("#continue").click(choosemenu);
							}
							else
							choosemenu();
						};
					});
				});
			});
		});
	},
	5200);
	shuffe();
	}
	);
}
