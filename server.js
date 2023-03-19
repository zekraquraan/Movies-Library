'use strict';
const express = require('express')
const app = express()
const port = 3000
const data=require("./Movie Data/data.json")
app.get('/movieApp',myMovieApp);
function myMovieApp(req, res) {
  
  let newConst=new Constmovie(data.title,data.poster_path,data.overview);
  res.json(newConst);
}


function Constmovie(title,poster_path,overview){
this.title=title;
this.poster_path=poster_path;
this.overview=overview;
}



app.get('/favorite',myFirstMovie);
function myFirstMovie(req,res){
    res.send("Welcome to Favorite Page");
}
app.listen(port, () => {
  console.log(`Movie app listening on port ${port}`)
})

function handlePageNotFoundError() {
    const response = {
      status: 404,
      responseText: "Sorry, the page you requested could not be found"
    };
    // do something with the response, such as display an error message to the user
    console.log(response);
  }

  function handleServerError() {
    const response = {
      status: 500,
      responseText: "Sorry, something went wrong"
    };
    // do something with the response, such as display an error message to the user
    console.log(response);
  }