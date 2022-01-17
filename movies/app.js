var express = require('express');
var request = require('sync-request');

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
})
var infoBaseUrl = 'http://localhost:8080/info/'

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html')
});

app.get('/info/:movieNum', function(req, res){
    var targetUrl = infoBaseUrl+req.params.movieNum
    var data = {
        movieNumber : 0,
        title : "",
        content : ""
    }
    // 기본이 비동기라 외부 api호출 종료를 보장 후 다음으로 넘어가야한다
    var response = request('GET',targetUrl)

    var result = JSON.parse(response.getBody())
    data.movieNumber = result.movieNumber
    data.title = result.title
    data.content = result.content

    res.send(result)
});