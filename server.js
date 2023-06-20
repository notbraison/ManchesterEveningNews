//npm init npm install  cheerio express

const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');

const PORT =8000;//the port we will be running on

const app = express()//app is how we have initialised. It can be named whatever. express which comes with all these other wonderful methods

const url = "https://www.manchestereveningnews.co.uk/";

axios(url)
.then(response => {
    const html = response.data//this is the a variable that stores whatever we got from the website
    const $ = cheerio.load(html)//use cheerio to pick out some html $ is variable name
    const Articles =[];//Array to store the values we have scraped
    $('.headline',html).each(function(){//class name of the exact element we want to pick out , we use a dot before it because it is a class name
    //here I have used headline because it is a common class for the titles of various articles found on homepage of url
    const title = $(this).text()//grab the text in the link
    const url = $(this).attr(('href'));//precisely find the href attribute in our a tag and grab it
    
    Articles.push({//push article data in form of a javascript object into the array using built in function
        title,//create a javascript object ,hence that is what we are pushing
        url
    })

    })

    console.log(Articles);//display the scraped stuff    
}).catch(err=> console.log(err));//catch any erros like this

app.listen(PORT,() => console.log(`server running on port ${PORT}` ))//will listen for any changes we made on the app


