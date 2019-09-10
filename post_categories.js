var fs = require("fs");
const axios = require('axios'); //npm install axios

var text = fs.readFileSync("./categories.txt");
var textByLine = text.toString().split("\n")
const url='http://localhost:3000/categories/';
var array = [];

var config = {
    headers: {'Content-Type': 'application/xml'}
};
var lines = textByLine;
    for(var line = 0; line < lines.length; line++){
        //console.log(lines[line]);
        if (!array.includes(lines[line]))
        {
            axios.post(url, lines[line], config)
            .then(res => {
                console.log(lines[line]);
                //console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
            array.push(lines[line]);
        }
    }