var Client = require('node-rest-client').Client;

var client = new Client();

var books = [
    'breishit',
    'shmot',
    'leviticus',
    'numbers',
    'devarim'
];

var getAliot = function (sefer) {
    client.get("http://www.sefaria.org/api/v2/index/" + sefer, function (data, response) {
        for (var node of data.alts.Parasha.nodes) {
            var parsha = {};
            parsha.title = node.sharedTitle;
            parsha.aliahs = node.refs;
            console.log(parsha);
        }
    });
}

var getAllAliot = function(){
    for(sefer of books){
        getAliot(sefer);
    }
}

getAllAliot();