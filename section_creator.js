var shortParshios = require('./short_parshios');
var fs = require('fs');

var sectionWritePath = "./shortfiles/short_section.json";
var groupsWritePath = "./shortfiles/short_textgroups.json";
var elementsWritePath = "./shortfiles/short_elements.json";

var section = {
    "evaluation": {
        "elements": [
            {
                "Chanuka": false,
                "FastDay": false,
                "Mussaf": false,
                "Purim": false,
                "Thursday": true,
                "TishaBAv": false,
                "operator": 0
            },
            {
                "Chanuka": false,
                "FastDay": false,
                "Monday": true,
                "Mussaf": false,
                "Purim": false,
                "TishaBAv": false,
                "operator": 0
            },
            {
                "IsShabbos": true,
                "Mincha": true,
                "operator": 0
            }
        ],
        "operator": 1
    },
    textGroupIds: {}
};
var textGroups = {};
var textElements = {};

var aliahNames = [
    "rishon",
    "sheini",
    "shlishi",
    "revii",
    "chamishi",
    "shishi",
    "shvii"
];

var parshaToSectionName = function (parshaName) {
    return 'short_kria_' + parshaName;
}

section.textGroupIds['ashkenaz'] = [];
for (var parsha of shortParshios.chumash) {
    section.textGroupIds['ashkenaz'].push(parshaToSectionName(parsha.parsha));
}


for (var chumashName of shortParshios.chumashim) {
    var parshios = shortParshios[chumashName];
    for (var parsha of parshios) {
        textGroups[parshaToSectionName(parsha.parsha)] = {
            evaluation: {
                parsha: parsha.parsha
            },
            elements: {
                ashkenaz: []
            }
        }
        for (var i = 0; i < parsha.aliahs.length; i++) {
            textGroups[parshaToSectionName(parsha.parsha)].elements.ashkenaz.push(aliahNames[i] + '_header');
            var aliah = parsha.aliahs[i];
            if (aliah.endChapter) {
                var startElementName = parsha.parsha + "_" + aliahNames[i] + '_one';
                var endElementName = parsha.parsha + "_" + aliahNames[i] + '_two';
                textGroups[parshaToSectionName(parsha.parsha)].elements.ashkenaz.push(startElementName);
                textGroups[parshaToSectionName(parsha.parsha)].elements.ashkenaz.push(endElementName);
                textElements[startElementName] = {
                    book: shortParshios.bookDictionary[chumashName],
                    chapter: aliah.startChapter,
                    startVerse: aliah.startVerse
                };
                textElements[endElementName] = {
                    book: shortParshios.bookDictionary[chumashName],
                    endVerse: aliah.endVerse,
                    chapter: aliah.endChapter
                }
            }
            else {
                var elementName = parsha.parsha + "_" + aliahNames[i];
                textElements[elementName] = {
                    book: shortParshios.bookDictionary[chumashName],
                    startVerse: aliah.startVerse,
                    chapter: aliah.startChapter,
                    endVerse: aliah.endVerse
                };
                textGroups[parshaToSectionName(parsha.parsha)].elements.ashkenaz.push(elementName);
            }
        }
    }
}

fs.writeFile(groupsWritePath, JSON.stringify(textGroups), function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

fs.writeFile(elementsWritePath, JSON.stringify(textElements), function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

fs.writeFile(sectionWritePath, JSON.stringify(section), function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});