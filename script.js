var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

var params = {q: 'retweet to win rt RT competition', retweeted_status: 'null', result_type: 'recent', count: '50', lang: 'en' };

//loops for ever every half an hour.
function getTweet(){
	client.get('search/tweets', params, function(error, tweets, response){
		if (!error){
			var length = tweets.statuses.length;
			for (i = 0; i < length; i++){
				var tid = tweets.statuses[i].id_str;
				var uid = tweets.statuses[i].user.id_str;
				follow(uid);
				retweet(tid);
				favourite(tid);
			}	
			
		}
		else {
			console.log(error);
		}
		sleep(1800000);
		getTweet();
	}
)};

//retweets a tweet when passed a valid tweet id.
function retweet(tid){
	client.post('statuses/retweet/'+ tid, function(error, tweet, response){
		if (!error) {
			console.log("retweeted tweet id: " + tid);
		}
		else {
			console.log(error)
		}
	});
	
}

// favourites a tweet given a valid tweet id.
function favourite(n){
	client.post('favorites/create', {id:n}, function(error, tweet, response){
		if (response != null){
			console.log("favourited tweet: " + n);		
		}
		else {
			console.log("failed to favourite tweet id: " + n);
		}
	});
	
}

//follows an account based on being passed a user id.
function follow(u){

	client.post('friendships/create', {user_id:u}, function(error, user, response){
		if (!error){
			console.log("followed user id: " + u);		
		}
		else{
			console.log(error);
		}
	});
	
}

//hangs the program for a specified time in order to avoid reaching twitter rate limits and attempting to retweet your own tweets.
function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
            
}

getTweet();




