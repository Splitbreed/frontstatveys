var express     = require('express'),
    app         = express(),
    favicon     = require('serve-favicon'),
    port        = process.env.PORT || 4000;

// app.use(favicon(__dirname + '/favicon.ico'));

app.use(express.static(__dirname + '/public'));

app.use('/scripts', express.static(__dirname + '/bower_components'));

app.all('/*', function(req, res, next){
  res.sendFile('/public/index.html', { root: __dirname });
});

app.listen(port, function(){
  console.log('----====----====----');
  console.log('Running on port ' + port);
  console.log('----====----====----');
});
