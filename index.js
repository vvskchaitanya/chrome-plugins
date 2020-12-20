var app=new Vue({
	el:"#app",
	data:{
	uname:"",
	pwd:"",
	urls:[],
	prjs:[],
	wbk:null,
	index:0,
	placeBid:false
	},
	created:function(){},
	methods:{
	processURLFile:function(event){
	var file=event.target.files[0];
	var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary'
      });
      console.log(workbook);
	  for(var i=1;workbook.Sheets[workbook.SheetNames[0]]["A"+i]!=null;i++){app.urls.push(workbook.Sheets[workbook.SheetNames[0]]["A"+i].v);}
	  console.log("URLS :",app.urls);
	  app.$forceUpdate();
    };
    reader.onerror = function(ex) {
      console.error("Error reading excel file ",ex);
    };
    reader.readAsBinaryString(file);
	},
	processProjectFile:function(event){
	var file=event.target.files[0];
	var reader = new FileReader();
    reader.onload = function(e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary'
      });
      console.log(workbook);
	  for(var i=1;workbook.Sheets[workbook.SheetNames[0]]["A"+i]!=null;i++){app.prjs.push(workbook.Sheets[workbook.SheetNames[0]]["A"+i].v);}
	  console.log("PRJS :",app.prjs);
	  app.$forceUpdate();
    };
    reader.onerror = function(ex) {
      console.error("Error reading excel file ",ex);
    };
    reader.readAsBinaryString(file);
	},
	submit:function(){
		chrome.tabs.create({
	  'url': "https://www.freelancer.com/login"
	  }, function(tab){
		  console.log("Tab opened",tab);
		  chrome.tabs.onUpdated.addListener(function(tabId,changeInfo){
			  console.log(changeInfo.url);
			  console.log(changeInfo);
			  app.process(tab,tabId,changeInfo);
			});
	});
	},
	process:function(tab,tabId,changeInfo){
		if(tab.id==tabId && changeInfo.status == 'complete')
		chrome.tabs.executeScript(tab.id,{runAt:"document_end",code:"window.json="+JSON.stringify(app.$data)+";console.log(window.json);"},function(){
			console.log("Script Executed at tab : "+tab.id);
			chrome.tabs.executeScript(tab.id,{runAt:"document_end",file:"jquery.min.js"},function(){
				console.log("Jquery Loaded");
				chrome.tabs.executeScript(tab.id,{runAt:"document_end",file:"content.js"},function(){
				console.log("content script Loaded");
				
				});
			});
		});
	}
	}
	});
	