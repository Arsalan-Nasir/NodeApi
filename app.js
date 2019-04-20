 const yargs = require('yargs')
// const title = yargs.argv.title;
// const description = yargs.argv.description;
const command = yargs.argv._[0];
// const { addTodo, deleteTodo, showTodos, showSpecificTodo } = require('./todo');
const chalk = require('chalk');

// if (command === 'add') {
//     if (title && description)
//         addTodo(title, description)
//     else { console.log(chalk.red.bold('Please Provide Title and Description!')) }
// } else if (command === 'delete') {
//     if (title)
//         deleteTodo(title)
//     else { console.log(chalk.red.bold('Please Provide Title!')) }
// } else if (command === 'list') {
//     showTodos();
// } else if (command === "todo") {
//     if (title)
//         showSpecificTodo(title);
//     else { console.log(chalk.red.bold('Please Provide Title!')) }
// }

 const request=require('request')
// const IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');
// const ipgeolocationapi=new IPGeolocationAPI('fca121b09840465d90c185bad8c3a1e7')
//Dictionary code

var word=command

const dictonary={
    url:"https://od-api.oxforddictionaries.com:443/api/v1/entries/en/"+word,
    headers:{
        "Accept": "application/json",
        "app_id": "7a2584ba",
        "app_key": "79638a0caae7267aea4cc085e051db91"
      }
      
}

const callback=(error,response)=>{

    if (response.statusCode === 200){
        const data=response.body
        const pdata=JSON.parse(data)
        const def=pdata.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]
        console.log(def)
    }
    else{
        console.log('Error : '+error)
    }
}

//News Api code
const news={
    url:'https://newsapi.org/v2/top-headlines?country='+word+'&apiKey=a8d3c056a40d4e18841d2f4054399cb3'
}

const callback2=(error,response)=>{
    try{
    const pdata=JSON.parse(response.body)
    console.log('Source : '+pdata.articles[0].source.id)
    console.log('News : '+pdata.articles[0].description)
    }
    catch(error){
        console.log('Error : '+error)
    }
}

//Geo Location Code

const ip={
    url:'https://api.ipgeolocation.io/ipgeo?apiKey=fca121b09840465d90c185bad8c3a1e7&fields=geo'
}

const callback3=(error,response)=>{
    
    pdata=JSON.parse(response.body)
    if (command!=null){
    console.log('City : '+pdata.city)
    console.log('Province : '+pdata.state_prov)
    console.log('Country : '+pdata.country_name)


    }
    
}

//Weather
const weather={
    url:'http://api.apixu.com/v1/current.json?key=678544291aed4cf6963215308191604&q='+word
}

const callback4=(error,response)=>{
    if (command!=null){
    pdata=JSON.parse(response.body)
    console.log('Temperature : '+pdata.current.temp_c+' C')
    }
    else{
        console.log('26 C')
    }
}

//Common Call

if (command != null)
{word=command
request(ip,callback3)
request(news,callback2)
request(weather,callback4)}
else{
    request(ip,callback3)
    request(news,callback2)
    request(weather,callback4)
}

console.log(chalk.red.bold.inverse('Finding...'))