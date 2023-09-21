const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const app = express();
const port = 3000;
// const config = require('../config');

app.use(express.json());

// const generateToken = (user) => {
//   return jwt.sign(user, 'thisissecret', { expiresIn: '1h' });
// };
// const invalidatedTokens = new Set();

// const generateToken = (user) => {
//   // Invalidate the previous token for the same user
//   if (user.previousToken) {
//     invalidatedTokens.add(user.previousToken);
//   }

//   const token = jwt.sign(user, 'thisissecret', { expiresIn: '1h' });

//   // Store the current token as the previous token
//   user.previousToken = token;
//   return token;
// };

const users = [{ username: 'nishajean_', password: 'jean' }, { username: 'nisha', password: 'jeje' }];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((data) => data.username === username && data.password === password);

  if (user) {
    try {
      const token = jwt.sign(user, 'thisissecret', { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error signing JWT:', error);
      res.status(500).json(error);
    }

    //   //   // const token = jwt.sign(user, 'thisissecret', { expiresIn: '1h' });
    //   //   // res.status(200).json({ token });
  } else {
    res.status(401).json({ error: 'Username or password is incorrect' });
  }
});

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  token = token.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'You didnt input the token' });
  }

  // // Check if the token is invalidated
  // if (invalidatedTokens.has(token)) {
  //   return res.status(403).json({ message: 'Forbidden - Invalid token' });
  // }

  jwt.verify(token, 'thisissecret', (err, user) => {
    if (err) {
      return res.status(403).json({ error: err.message });
    }
    req.user = user;
    next();
  });
}
// console.log(invalidatedTokens)

let takeSongList = fs.readFileSync('./songs.txt')
let songsList = JSON.parse(takeSongList);

//song by artist
function groupByArtist() {
  const byArtist = [...new Set(songsList.map(song => song.artist))];//array isi artist tanpa duplikat
  const groupedByArtist = {};

  byArtist.forEach(artist => {
    const songsByArtist = songsList.filter(song => song.artist === artist);
    groupedByArtist[artist] = songsByArtist;
    console.log(songsByArtist)
  });
  console.log(groupedByArtist)


  return groupedByArtist;
};

//song by genre
function groupByGenre() {
  const byGenre = [...new Set(songsList.map(song => song.genre))];//array isi genre                
  const groupedByGenre = {};

  byGenre.forEach(genre => {
    const songsByGenre = songsList.filter(song => song.genre === genre);
    groupedByGenre[genre] = songsByGenre;
  });

  return groupedByGenre;
}

//song by an hour or less
// let newSongList = [];
// let totalDuration = 0;
// let maxDuration = 60; //in minutes

function groupByAnHour() {
  let newSongList = [];
  let totalDuration = 0;
  let maxDuration = 60;

  while (totalDuration < maxDuration) {  //(totalDuration < maxDuration && songList.length>0) 
    const randomIndexForSong = Math.floor(Math.random() * songsList.length);
    const randomSong = songsList[randomIndexForSong];

    if (totalDuration + randomSong.duration <= maxDuration) {
      newSongList.push(randomSong);
      totalDuration += randomSong.duration;
    } else {
      break;
    }
    // songsList.splice(randomIndexForSong, 1); //splice mengurangi nilai index
  }
  return newSongList;
}

app.get('/groupByArtist', verifyToken, (req, res) => {
  try {
    const groupedArtists = groupByArtist();
    res.status(200).send(groupedArtists);
  } catch (error) {
    console.error('Error during picking song:', error);
    return res.status(400).send({ error: error.message });
  }
});

app.get('/groupByGenre', verifyToken, (req, res) => {
  try {
    const groupedGenres = groupByGenre();
    res.status(200).send(groupedGenres);
  } catch (error) {
    console.error('Error during picking song:', error);
    return res.status(400).send({ error: error.message });
  }
});

app.get('/groupByAnHour', verifyToken, (req, res) => {
  try {
    const groupedAnHour = groupByAnHour(songsList);
    res.status(200).send(groupedAnHour);
  } catch (error) {
    console.error('Error during picking song:', error);
    return res.status(400).send({ error: error.message });
  }
});

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5pc2hhIiwicGFzc3dvcmQiOiJqZWplIiwiaWF0IjoxNjk0Njg5NDIwLCJleHAiOjE2OTQ2OTMwMjB9.yvNpJOuLTtn3DdrZTF4E9TGXKeC_trLU8Xzh53EDz4s'; // Replace with the actual JWT token you received

// try {
//   const decodedToken = jwt.verify(token, 'thisissecret');
//   console.log(decodedToken);
// } catch (error) {
//   console.error('JWT verification failed:', error);
// }

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

