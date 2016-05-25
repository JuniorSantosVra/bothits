var express = require('express')
var bodyParser = require('body-parser')
var http = require('http')
var request = require('request')
var cron = require('node-cron')
var app = express()


cron.schedule('* * * * *', function(){
  console.log('running a task every minute');
});

app.set('port', (process.env.PORT || 5000))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot')
})

// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})


// new CronJob('00 50 00 * * 1-5', auto() , null, true, 'America/Sao_Paulo');


function verifica(user, categ){
request.post(
    'http://apphits.com.br/bots',
    { form: { id:user, categ:categ } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
           return body
        }
    }
);

}

// to post data
app.post('/webhook/', function (req, res) {
	messaging_events = req.body.entry[0].messaging
	for (i = 0; i < messaging_events.length; i++) {
		event = req.body.entry[0].messaging[i]
		sender = event.sender.id
		if (event.message && event.message.text) {
			text = event.message.text
			if (text == 'Pop' || text == "pop") {


				verifica(sender, 18)
				sendGenericMessage(sender, 18)
				continue
			}

			if (text == 'Sertanejo' || text == "sertanejo") {
				verifica(sender, 17)
				sendGenericMessage(sender, 17)
				continue
			}

				
			sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
		}
		if (event.postback) {
			text = JSON.stringify(event.postback)
			sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
			continue
		}
	}
	res.sendStatus(200)
})

var token = "EAAL9j9wpSoUBAMZB4CxsenV07hDRHUp0YXybpBoSm5c1kePsrJjxNwdhPLZAXYDCTZBg67QrB3AQP9IJ513pvQBZBDYLx2esPytUeVILlfV09VQnCa33UygffhfpQBAvHTdch3Gj5plpQFX6KCZBkS5MYC8ckt0vEgDCreFm0xAZDZD"

function sendTextMessage(sender, text) {
	messageData = {
		text:text
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}


// function auto(){
// 			 var options = {
// 			     url: 'http://apphits.com.br/lista',
// 			     port: app.get('port'),
// 			     method: 'GET',
// 			     json:true
// 			 }

// 			 request(options, function(error, response, body){

// 			    total = body.lista.length

// 				for (i = 0; i < total; i++) { 

				     
// 				    sendto = body.lista[i].sendto;
// 				    categ = body.lista[i].categ;

// 				    sendGenericMessage(sendto, categ)
// 				}

// 			 });		 

// }


function sendGenericMessage(sender, categoria) {

			 var options = {
			     url: 'http://apphits.com.br/registros/busca/'+categoria,
			     port: app.get('port'),
			     method: 'GET',
			     json:true
			 }
			 request(options, function(error, response, body){

			    titulo0     = body.posts[0].titulo
			    subtitulo0  = body.posts[0].subtitulo
			    link0       = body.posts[0].link
			    imagem0     = body.posts[0].imagem

			    titulo1     = body.posts[1].titulo
			    subtitulo1  = body.posts[1].subtitulo
			    link1       = body.posts[1].link
			    imagem1     = body.posts[1].imagem

			    titulo2     = body.posts[2].titulo
			    subtitulo2  = body.posts[2].subtitulo
			    link2       = body.posts[2].link
			    imagem2     = body.posts[2].imagem

			    titulo3     = body.posts[3].titulo
			    subtitulo3  = body.posts[3].subtitulo
			    link3       = body.posts[3].link
			    imagem3     = body.posts[3].imagem

			    titulo4     = body.posts[4].titulo
			    subtitulo4  = body.posts[4].subtitulo
			    link4       = body.posts[4].link
			    imagem4     = body.posts[4].imagem



			   
			 });
	
	messageData = {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",

				"elements": 

				[


				{
					"title": titulo0,
					"subtitle":subtitulo0,
					"image_url": imagem0,
					"buttons": [{
						"type": "web_url",
						"url": link0,
						"title": "Ver notícia"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": subtitulo0,
					}],
				}, 

				{
					"title": titulo1,
					"subtitle":subtitulo1,
					"image_url": imagem1,
					"buttons": [{
						"type": "web_url",
						"url": link1,
						"title": "Ver notícia"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": subtitulo1,
					}],
				},

				{
					"title": titulo2,
					"subtitle":subtitulo2,
					"image_url": imagem2,
					"buttons": [{
						"type": "web_url",
						"url": link2,
						"title": "Ver notícia"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": subtitulo2,
					}],
				},

				{
					"title": titulo3,
					"subtitle":subtitulo3,
					"image_url": imagem3,
					"buttons": [{
						"type": "web_url",
						"url": link3,
						"title": "Ver notícia"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": subtitulo3,
					}],
				},
				{
					"title": titulo4,
					"subtitle":subtitulo4,
					"image_url": imagem4,
					"buttons": [{
						"type": "web_url",
						"url": link4,
						"title": "Ver notícia"
					}, {
						"type": "postback",
						"title": "Postback",
						"payload": subtitulo4,
					}],
				},

				]
			}
		}
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {


		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})