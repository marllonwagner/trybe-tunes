import React, { Component } from 'react';
import HeaderFavorites from '../components/HeaderFavorites';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs2 } from '../services/favoriteSongsAPI';
import '../css/favorites.css';

class Favorites extends Component {
  state = {
    arrayFavMsc: [],
  };

  componentDidMount() {
    this.getFavoriteMusics();
  }

  getFavoriteMusics = async () => {
    const favMusics = await getFavoriteSongs2();

    this.setState({ arrayFavMsc: favMusics });
  };

  render() {
    const { arrayFavMsc } = this.state;

    return (
      <div data-testid="page-favorites">
        <HeaderFavorites />
        <div className="search-options-container">
          <p className="fav-musics-text">Musicas Favoritas</p>
        </div>
        <div className="favs-container">
          <div className="favs-main-audio-container">
            {arrayFavMsc !== null && arrayFavMsc
              .map((msc) => (<MusicCard { ...msc } key={ msc.trackName } />))}
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
