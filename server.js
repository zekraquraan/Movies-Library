'use strict';
const express = require('express')
const cors=require('cors');
const app = express()
app.use(cors());
const port = 3000
const movieData=require("./Movie Data/data.json")
app.get('/',myMovieApp);
app.get('/favorite',myFirstMovie);
app.get('*',handlePageNotFoundError);
app.get('*',handleServerError);


function myMovieApp(req, res) {
  
  let newConst=new Constmovie(movieData.title,movieData.poster_path,movieData.overview);
  res.json(newConst);
}


function Constmovie(title,poster_path,overview){
this.title=title;
this.poster_path=poster_path;
this.overview=overview;
}



function myFirstMovie(req,res){
    res.send("Welcome to Favorite Page");
}


app.listen(port, () => {
  console.log(`Movie app listening on port ${port}`)
})



function handlePageNotFoundError() {
    res.status(404).send("NOT FOUND");
  }




  function handleServerError() {
    res.status(500).send ("Sorry, something went wrong");
    
  }