//get sub name from user and pass into api function
//TODO: must handle shitty submissions
$("#form-submit").submit(function(event){
	event.preventDefault();
	flairtexts={};
	$("#form-submit :input").prop('disabled',true);

	$("#response").removeClass("alert alert-success alert-warning alert-danger").addClass("alert alert-warning");
	$("#response").html("<i class='fas fa-spinner fa-spin'></i> Graph is currently loading");
	tally_scores($("#subreddit").val(),+ new Date());
});

//stores data
var flairtexts={};

//executes once recursion atually finish
function call_back(){
	$('#form-submit :input').prop('disabled',false);
	if(Object.keys(flairtexts).length==0){
		$("#response").removeClass("alert alert-success alert-warning alert-danger").addClass("alert alert-danger");
		$("#response").html("<i class='fas fa-bug'></i> This subreddit either does not exist or has no publicly available posts");
	}
	else{
		console.log(flairtexts);
		$("#response").removeClass("alert alert-success alert-warning alert-danger").addClass("alert alert-success");
		$("#response").html("<i class='fas fa-check-square'></i> Graph has finished processing");
	}
		}

//refrence: https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript
function sort_data(){
	var items = Object.keys(flairtexts).map(function(key) {
		  return [key, flairtexts[key]];
	});

	// Sort the array based on the second element
	items.sort(function(first, second) {
		  return second[1] - first[1];
	});

	// Create a new array with only the first 10 items
	return items.slice(0, 10);
}

//generates graph
function gen_graph(){
	var sorted_items = sort_data();
	var flair_labels=[];
	var scores=[];
	for(item of sorted_items){
		flair_labels.push(item[0]);
		scores.push(item[1]);
	}

	Chart.helpers.each(Chart.instances, function(instance){
		instance.chart.destroy();
	});

	var ctx = document.getElementById('canvas').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: flair_labels,
			datasets: [{
				label: '# of Scores',
				data: scores,
				backgroundColor: [
					"#0039A6",
					"#FF6319",
					"#6CBE45",
					"#996633",
					"#A7A9AC",
					"#FCCC0A",
					"#EE352E",
					"#00933C",
					"#B933AD",
					"#60269E"
				],
				borderColor: [],
				borderWidth: 1
			}]
		},
		options: {
			legend:{display:false},
			title:{
				display:true,
				text:"Subreddit Flair Graph",
			},
			animation:false,
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
}

//queries every 1000 posts recursively for consistently older posts
//stops when posts < 1000
function tally_scores(sub,tstmp){
	console.log("a");
	var result = $.get("https://api.pushshift.io/reddit/search/submission/?subreddit="+sub+"&sort=desc&sort_type=created_utc&after=1&before="+tstmp+"&size=10000",function(data){
		Array.from(data.data).forEach(child => {
			//in case pushshift didn't catch data
			if(child["link_flair_text"]==undefined){
				var result = $.get(child["full_link"]+".json",function(child_payload){
					var is_removed = child_payload[0].data.children[0].data["removed"];
					if(is_removed){return;}//ignore deleted posts
					else{child["link_flair_text"]=child_payload.data.children[0].data["link_flair_text"];}
				});
			}
			else if(flairtexts[child["link_flair_text"]]==undefined){
				flairtexts[child["link_flair_text"]]=1;
			}
			else{
				flairtexts[child["link_flair_text"]]++;
			}
		});
		if(Object.keys(data.data).length == 1000){
			gen_graph();
			tally_scores(sub,(data.data[999])["created_utc"]);
		}
		else{
			console.log(data.data[Object.keys(data.data).length-1]);
			call_back();
		}
	}).fail(function(){
		console.log("fail");
	});
}

