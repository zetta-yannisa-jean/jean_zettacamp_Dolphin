// "Mid task of JavaScript. Will include all previous day's learning:
// Create a variable with type array of object to save song lists with song details
// Create a function to group song based on artists
// Create a function to group song based on genre
// Create a function to group song to play song less than 1 hour with random artists & genres"

let songsList = [
  {
    title: `If I Aint Got You`,
    artist: `Alicia Keys`,
    genre: `R&B`,
    duration: 2
  },

  {
    title: `Snooze`,
    artist: `SZA`,
    genre: `R&B`,
    duration: 11
  },

  {
    title: `Kiss Me More`,
    artist: `Doja Cat`,
    genre: `R&B`,
    duration: 3
  },

  {
    title: `Rules`,
    artist: `Doja Cat`,
    genre: `Hip-hop`,
    duration: 7
  },

  {
    title: `WAP`,
    artist: `Cardi B`,
    genre: `Hip-hop`,
    duration: 8
  },

  {
    title: `Please Me`,
    artist: `Bruno Mars`,
    genre: `Hip-hop`,
    duration: 5
  },

  {
    title: `When I Was Your Man`,
    artist: `Bruno Mars`,
    genre: `Pop`,
    duration: 10
  },

  {
    title: `Almost Is Never Enough`,
    artist: `Ariana Grande`,
    genre: `Pop`,
    duration: 7
  },

  {
    title: `7 rings`,
    artist: `Ariana Grande`,
    genre: `Trap`,
    duration: 6
  },

  {
    title: `Old Town Road`,
    artist: `Lil Nas`,
    genre: `Trap`,
    duration: 9
  }
];

//song by artist
function groupByArtist() {
  const byArtist = [...new Set(songsList.map(song => song.artist))];//array isi artist tanpa duplikat
  const groupedByArtist = {};

  byArtist.forEach(artist => {
    const songsByArtist = songsList.filter(song => song.artist === artist);
    groupedByArtist[artist] = songsByArtist;
  });

  return groupedByArtist;
}
// const groupedArtists = groupByArtist();
// console.log(`Song lists by Artists: `)
// console.log(groupedArtists);

// //song by genre
function groupByGenre() {
  const byGenre = [...new Set(songsList.map(song => song.genre))];//array isi genre                
  const groupedByGenre = {};

  byGenre.forEach(genre => {
    const songsByGenre = songsList.filter(song => song.genre === genre);
    groupedByGenre[genre] = songsByGenre;
    console.log(songsByGenre)
  });

  return groupedByGenre;
}
// const groupedGenres = groupByGenre();
// console.log(`Song lists by Genre: `)
// console.log(groupedGenres);

//song by an hour or less
let newSongList = [];
let totalDuration = 0;
let maxDuration = 60; //in minutes

function groupByAnHour() {

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
const groupedAnHour = groupByAnHour(songsList);
console.log(`Random Songs An Hour or less: `)
console.log(groupedAnHour);






























  // if (input == 'random') {
  //   function groupByAnHour() {
  //     return songsList[Math.floor(Math.random() * songsList.length)];
  //   }

  //   for (const song of songsList) {
  //     totalDuration += song.duration;
  //     if (totalDuration < maxDuration) {
  //       newSongLists.push(song);
  //     } else {
  //       break;
  //     }
  //   }
  //   let randomSong = console.log(newSongLists)
  //   return randomSong;
  // }
  // const groupedHour = groupByAnHour(songsList);
  // console.log(`Song lists by Random: `)
  // console.log(groupedHour);

// function groupByArtist(songsList) {
//   const uniqueArtists = [...new Set(songsList.map(song => song.artist))];
//   const groupedByArtist = {};

//   uniqueArtists.forEach(artist => {
//     const songsByArtist = songsList.filter(song => song.artist === artist);
//     groupedByArtist[artist] = songsByArtist;
//   });

//   return groupedByArtist;
// }

// function groupByGenre() {
//   const songGenre = songLists.filter(({ genre }) => genre === genre);
//   console.log(songGenre);
//   // const uniqueGenre = [...new Set(songsList.map(song => song.genre))];
//   // const groupedByGenre = {};

//   // uniqueGenre.forEach(genre => {
//   //   const songsByGenre = songsList.filter(song => song.genre === genre);
//   //   groupedByGenre[genre] = songsByGenre;
//   // });

//   // return groupedByGenre;
// }

// const groupedArtists = groupByArtist(songsLists);
// const groupedGenres = groupByGenre(songsLists);

// console.log(`Song lists by Artists: `)
// console.log(groupedArtists);
// console.log(`Song lists by Artists: `)
// console.log(groupedGenres);

// let songsByArtist = {};
// function songsBasedOnArtist(songs) {

//   for (const song of songs) {
//     if (!songsByArtist[song.artist]) {
//       songsByArtist[song.artist] = [];
//     }
//     songsByArtist[song.artist].push(song);
//   }
//   return songsByArtist;
// }

// let songsByGenre = {};

// function songsBasedOnGenre(songs) {

//   for (const song of songs) {
//     if (!songsByGenre[song.genre]) {
//       songsByGenre[song.genre] = [];
//     }
//     songsByGenre[song.genre].push(song);
//   }
//   return songsByGenre;
// }
// songsBasedOnArtist(songsLists);
// console.log(`Song lists based on the artists: `);
// for (const artist in songsByArtist) {
//   if (songsByArtist.hasOwnProperty(artist)) {
//     console.log(`Artist: ${artist}`)
//     for (const song of songsByArtist[artist]) {
//       console.log(`==>  ${song.title} (${song.genre})`);
//     }
//   }
// }
// console.log(`=================================================`)
// songsBasedOnGenre(songsLists);
// console.log(`Song lists based on the genre: `);
// for (const genre in songsByGenre) {
//   if (songsByGenre.hasOwnProperty(genre)) {
//     console.log(`Genre: ${genre}`)
//     for (const song of songsByGenre[genre]) {
//       console.log(`==>  ${song.title} (${song.artist})`);
//     }
//   }
// }
