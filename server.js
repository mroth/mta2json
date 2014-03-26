var http = require("http");
var ProtoBuf = require("protobufjs");
var dotenv = require('dotenv');
var express = require('express');
var app = express();

dotenv.load();
var MTA_KEY     = process.env.MTA_KEY;
var MTA_FEED_ID = process.env.MTA_FEED_ID || 0;
var PORT        = process.env.PORT || 3000;
var URL         = "http://datamine.mta.info/mta_esi.php?key=" + MTA_KEY
                + "&feed_id=" + MTA_FEED_ID;

var builder = ProtoBuf.loadProtoFile("lib/protos/nyct-subway.proto");
var decoder = builder.build("transit_realtime").FeedMessage;

app.get('/', function(req, out) {
  return http.get(URL, function(res) {
    var data;
    data = [];
    res.on("data", function(chunk) {
      return data.push(chunk);
    });
    return res.on("end", function() {
      var msg;
      data = Buffer.concat(data);
      msg = decoder.decode(data);
      console.log("proxying request for " + req.ip);
      return out.send(msg);
    });
  });
});

server = app.listen(PORT, function() {
  console.log("mta2json - Listening on port " + server.address().port + "...");
});
