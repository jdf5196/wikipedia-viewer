$(document).ready(function(){
	var inputText;
	var array = [];
	$('#textInput').keydown(function(enter){
		inputText = $('#textInput').val()
		if(enter.keyCode == 13){
			if($('#textInput').val().length===0){
				alert('Search term required!')
			}
			else{
				getData();
				$('#textInput').val('')
			}
		}
	});
	function getData(){
		$.getJSON('https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch='+inputText+'&srnamespace=0&srinfo=suggestion&srprop=snippet&srlimit=20&callback=?&continue=', function(data){
			console.log(data)
			if(array.length>0){
				$('#resultsList').empty();
				array = [];
				getData()
			}
			else{
			for(var i = 0; i<data.query.search.length; i++){
				var title = data.query.search[i].title;
				var snippet = data.query.search[i].snippet
				$('#resultsList').append("<a id='link' href='http://en.wikipedia.org/wiki/"+title+"' target='_blank'><li id='result' class='container animated bounceInUp'><h4 id='title'>"+title+"</h4><p id='snippet'>"+snippet+"...</p></li></a>")
				array.push(data.query.search[i].title)
			}
		}
		});
	};
});