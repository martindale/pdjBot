var AUTH = 'YaWSYYaeHU6iREzpHbGoG7PbbKI=?_expires=STEzNjk3NTc3NzUKLg==&user_id=Uyc1MGFlYjQxOGMzYjk3YTJjYjRjMzIwY2MnCnAxCi4='; // Put your auth token here, it's the cookie value for usr
var ROOM = 'coding-soundtrack';

var PlugAPI = require('plugapi'),
    repl = require('repl');

var bot = new PlugAPI(AUTH);
bot.connect(ROOM);

var messages = {
  snarl: "Ohaithar.  I'm a bot created by @remæus.  Blame him for any of my supposed mistakes."
};


bot.on('chat', function(data) {

  if (data.type == 'emote') {
    console.log(data.from+data.message);
  } else {
    console.log(data.from+"> "+data.message);
  }

  var cmd = data.message;
  var tokens = cmd.split(" ");
  tokens.forEach(function(token) {
    if (token.substr(0, 1) === '!') {
      data.trigger = token.substr(1);

      if (typeof(messages[data.trigger]) != 'undefined') {
        bot.chat(messages[data.trigger]);
      }

    }
  });
  
  

});

var _reconnect = function() { bot.connect('coding-soundtrack'); };
var reconnect = function() { setTimeout(_reconnect, 500); };
bot.on('close', reconnect);
bot.on('error', reconnect);

r = repl.start("node> ");
r.context.bot = bot;
