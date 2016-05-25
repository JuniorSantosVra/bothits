var CronJob = require('cron').CronJob;
var express = require('express')
var bodyParser = require('body-parser')
var http = require('http')
var request = require('request')
var app = express()
app.set('port', (process.env.PORT || 5000))

new CronJob('00 26 23 * * 1-5', function() {
  console.log('You will see this message every second');
}, null, true, 'America/Sao_Paulo');