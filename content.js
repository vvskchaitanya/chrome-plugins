var app=window.json;
console.log("Hello content..");
setTimeout(function(){
	if(window.location.href.indexOf("/login")>-1){
		console.log("Login page....");
	$("input[placeholder='Email or Username']")[0].value=app.uname;
	$("input[placeholder='Password']")[0].value=app.pwd;
	$("button[type=submit]").click();
	}
	else if(window.location.href.indexOf("/dashboard")>-1){
		console.log("Dashboard page....");
		window.location.href=app.urls[0];
	}
	else{
		for(var i=0;i<app.urls.length;i++){
			if(window.location.href.toLowerCase().indexOf(app.urls[i].toLowerCase())>-1){
				console.log("URL : "+app.urls[i]);
				try{
				$("textarea[placeholder='What makes you the best candidate for this project?']")[0].value=app.prjs[i];
				if(app.placeBid)$("button:contains(' Place Bid ')").click();
				}catch(err){
					console.log(err);
				}
				setTimeout(function(){window.location.href=app.urls[++i];},5000);
				break;
			}
		}
	}
},10000);

