var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const axios = require('axios')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

//This is the route the API will call
app.post('/new-message', function(req, res) {
  const{message} = req.body

  var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=sn&dt=t&q=' + message.text
  console.log(url)
  var translation;
    axios.post(url)
    .then(response => {
      // We get here if the message was successfully posted
      translation = response.data[0][0][0]
      console.log(translation)
     return   axios.post('https://api.telegram.org/botAPI_Key/sendMessage', {
       chat_id: message.chat.id,
       text: translation
     });
    }) .then(response => {
       // We get here if the message was successfully posted
       console.log('Message posted')
       res.end('ok')
     })
    .catch(err => {
      // ...and here if it was not
      console.log('Error :', err)
      res.end('Error :' + err)
    })
});

function callThisGuy(translation,message){
  axios.post(/*'https://api.telegram.org/bot270485614:AAHfiqksKZ8WmR2zSjiQ7_v4TMAKdiHm9T0/sendMessage'*/
           'https://api.telegram.org/botAPI_Key/sendMessage', {
 chat_id: message.chat.id,
 text: translation
})
 .then(response => {
   // We get here if the message was successfully posted
   console.log('Message posted')
   res.end('ok')
 })
 .catch(err => {
   // ...and here if it was not
   console.log('Error :', err)
   res.end('Error :' + err)
 })
}


// Finally, start our server
app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!');
});
