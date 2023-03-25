'use strict';
const express = require('express')
const cors=require('cors');
const app = express()
const axios=require('axios');
app.use(cors());
const port = 3000;
const movieData=require("./Movie Data/data.json")
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.get('/',myMovieApp);
app.get('/favorite',myFirstMovie);
app.get('/trending',trendingHandler);
app.get('/search',searchHandler);
app.post('/addMovie',addMovieHandler);
app.get('*',handlePageNotFoundError);

const PORT=process.env.PORT;
const api_key=process.env.API_Key;

client.connect().then(()=>{
  app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)})
}).catch()



function addMovieHandler(req,res){
      
let{title,release_date,poster_path,overview}=req.body;

let sql=`INSERT INTO movie(title,release_date,poster_path,overview)
 VALUES ($1,$2,$3,$4);`
let values=[title,release_date,poster_path,overview]
client.query(sql,values).then(
    res.status(201).send("data successfully saved in db to server")
).catch()

 
}

function getMoviesHandeler(req,res){
  let sql=`SELECT * FROM movie;`
  client.query(sql).then((result)=>{
      console.log(result);
      res.json(result.rows)
  })
}






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


function trendingHandler(req,res){
let url=`https://api.themoviedb.org/3/trending/all/week?api_key=a6787f488adbc7363fab6b930e3aece3&language=en-US`
  axios.get(url)
  .then((result)=>{
    
    console.log(result.data.result)
let dataTrend=result.data.results.map((trending)=>
{ if(trending.title){
  return new Trend(trending.id,trending.title,trending.release_date,trending.poster_path,trending.overview)
}
else if(trending.name){
  return new Trend(trending.id,trending.name,trending.release_date,trending.poster_path,trending.overview) 
}
})
  
  res.json(dataTrend);
  })
  .catch((err)=>{
    console.log(err)
  })

}
  function Trend(id,title,releasedate,poster_path,overview){
    this.id=id;
    this.title=title;
    this.release_date=releasedate;
    this.poster_path=poster_path;
    this.overview=overview;
  }
  app.use (function handleServerError(err,req,res,next) {
    console.error(err.stack);
    res.status(500).send ({
      status:500,
   responseText: 'Sorry, something went wrong'
    
  });
});
 function searchHandler(req,res){
let url=`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${clientRequest}&page=2`
 axios.get(url)
 .then((result)=>{
  
  //console.log(result.data.result)
  let requestMo=result.data.results.map((movies)=>{
 return new Trend(movies.title,movies.poster_path,movies.overview)
 })
 res.json(requestMo)
})
.catch((err)=>{
  console.log(err)
})
}



function popularHandler(req,res)
{
  let url=`/discover/movie?sort_by=popularity.desc?api_key=${apiKey}`
  axios.get(url)
  .then((result)=>{
    let popH=result.data.results.map((movies)=>{
      return new Trend(movies.title,movies.poster_path,movies.overview)
    })
    res.json(popH)
    })
    .catch((err)=>{
      console.log(err)
    })
  }



  
function highestRated(req,res)
{
  let url=`/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc?api_key=${apiKey}`
  axios.get(url)
  .then((result)=>{
    let highR=result.data.results.map((movies)=>{
      return new Trend(movies.title,movies.poster_path,movies.overview)
    })
    res.json(highR)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
