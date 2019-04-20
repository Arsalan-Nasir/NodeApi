const request=require('request')
const axios=require('axios')
const chalk=require('chalk')
const command=process.argv[2]

const getNews = countryId => {
    const url = `https://newsapi.org/v2/everything?q=${countryId}?&apiKey=a8d3c056a40d4e18841d2f4054399cb3`;
    request(url, (error, response) => {
      const info = JSON.parse(response.body);
  
      console.log(chalk.cyan.bold("News for " + countryId));
      for (let i = 0; i <= 4; i++) {
        console.log(chalk.red("Source: "), info.articles[i+2].author);
        console.log(chalk.blue("News: "), info.articles[i+2].title);
        console.log("\n");
      }
    });
  };

  getWeather=word=>{
      const  url='http://api.apixu.com/v1/current.json?key=678544291aed4cf6963215308191604&q='+word

      request(url,(error,response)=>{
      const pdata=JSON.parse(response.body)
      console.log('Temperature : '+pdata.current.temp_c+' C')
      }) 
  }
  getData = id => {
    if (!id) {
      console.log(chalk.white.inverse("Finding Thourgh IP..."));
      axios.get("https://ipapi.co/json").then(res => {
        const a = res.data.city;
        getData(a);
      });
    } else {
      const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=gX849xB9FJ7QTkvU5WoM9ORmurjZO2Zw&q=${id}`;
      request(url, (error, response) => {
        const data = JSON.parse(response.body);
        console.log(chalk.bold.green('Country : ')+data[0].Country.LocalizedName)
        console.log(chalk.bold.green('Region : ')+data[0].AdministrativeArea.LocalizedName)
        getWeather(id)
        getNews(data[0].LocalizedName)
      });
    }
  };

getData(command)
  