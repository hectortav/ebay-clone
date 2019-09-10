function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
  
readline.question(`What's your name?`, (name) => {
    console.log(`Hi ${name}!`)
    readline.close()
})