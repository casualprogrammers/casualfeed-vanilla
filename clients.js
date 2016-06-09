window.onload = function(){
  //get https://www.reddit.com/r/all.json
  var utils = new Reddit().init(document.getElementById('news'));
};

var Reddit = function(){
  this.feedUrl = 'https://www.reddit.com/r/all.json';
};

Reddit.prototype.init = function(targetEl){
  this.targetEl = targetEl;
  this.loadAPI(this.feedUrl, this.displayNews.bind(this));
};

Reddit.prototype.displayNews = function(feed){
  if(typeof(feed.data) != "undefined"){
    this.targetEl.innerHTML = '';
    for(var i = (feed.data.children.length - 1); i >= 0; i--){
      var post = feed.data.children[i].data;
      var li = document.createElement('li');
      li.innerHTML = '<a href="' + post.url  + '">' + post.title + '</a>';
      this.targetEl.appendChild(li);
      console.log(feed.data.children[i]); 
    }
  }
};

Reddit.prototype.loadAPI = function(URL, callback) {
  var xmlhttp;
  if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
  } else { // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          callback(JSON.parse(xmlhttp.responseText));
      }
  };
  xmlhttp.open("GET", URL, true);
  xmlhttp.setRequestHeader('Accept', 'application/json');
  xmlhttp.send();
};