const FAVORITE_SONGS_KEY = 'favorite_songs';
const FAVORITE_SONGS_KEY2 = 'fav_musics';
const TIMEOUT = 500;
const SUCCESS_STATUS = 'OK';

if (!JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY))) {
  localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify([]));
}
export const readFavoriteSongs = () => JSON
  .parse(localStorage.getItem(FAVORITE_SONGS_KEY));

export const readFavoriteSongs2 = () => JSON
  .parse(localStorage.getItem(FAVORITE_SONGS_KEY2));

const saveFavoriteSongs = (favoriteSongs) => localStorage
  .setItem(FAVORITE_SONGS_KEY, JSON.stringify(favoriteSongs));

const saveFavoriteSongs2 = (favoriteSongs) => localStorage
  .setItem(FAVORITE_SONGS_KEY2, JSON.stringify(favoriteSongs));

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// Esse tipo de função que "chama outra função" é chamada de
// "currying function" https://javascript.info/currying-partials
// não se preocupe, estudaremos isso futuramente.
// --------------------------------------------------------------------

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getFavoriteSongs = () => new Promise((resolve) => {
  const favoriteSongs = readFavoriteSongs();
  simulateRequest(favoriteSongs)(resolve);
});

export const getFavoriteSongs2 = () => new Promise((resolve) => {
  const favoriteSongs = readFavoriteSongs2();
  simulateRequest(favoriteSongs)(resolve);
});

export const addSong = (song) => new Promise((resolve) => {
  if (song) {
    const favoriteSongs = readFavoriteSongs();
    saveFavoriteSongs([...favoriteSongs, song]);
  }
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const removeSong = (song) => new Promise((resolve) => {
  const favoriteSongs = readFavoriteSongs();
  saveFavoriteSongs(favoriteSongs.filter((e) => e !== song));
  simulateRequest(SUCCESS_STATUS)(resolve);
  const favoriteSongs2 = readFavoriteSongs2();
  saveFavoriteSongs2(favoriteSongs2.filter((e) => e.trackId !== song));
});

export const chamaLog = () => {
  console.log('chamou o teste');
};
