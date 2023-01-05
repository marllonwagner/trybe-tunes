import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderAlbum from '../components/HeaderAlbum';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { readFavoriteSongs } from '../services/favoriteSongsAPI';
import '../css/favorites.css';

class Album extends Component {
  state = {
    artistName: '',
    collectionName: '',
    artworkUrl100: '',
    arrayOfMsc: [],
    arrayFavMsc: [],
  };

  componentDidMount() {
    this.fetchFromAPI();
  }

  // componentDidUpdate() {
  //   this.arrayFavMscBuilder();
  // }

  executeFunc = () => {
    this.arrayFavMscBuilder();
    this.arrayFavMscUpdater();
  };

  arrayFavMscUpdater = async () => {

  };

  saveFavs = () => {
    const { arrayFavMsc } = this.state;
    localStorage.setItem('fav_musics', JSON.stringify(arrayFavMsc));
  };

  arrayFavMscBuilder = () => {
    const { arrayOfMsc } = this.state;
    let array = [];
    for (let index = 0; index < readFavoriteSongs().length; index += 1) {
      array = [...array];
      array.push(arrayOfMsc
        .filter((e) => e.trackId === readFavoriteSongs()[index])[0]);
      this.setState({
        arrayFavMsc: array,
      }, () => this.saveFavs());
    }
  };

  fetchFromAPI = async () => {
    const { match: { params: { id } } } = this.props;
    const res = await getMusics(id);
    const filteredSong = res.filter(({ kind }) => kind);
    this.setState({ artistName: res[0].artistName });
    this.setState({ collectionName: res[0].collectionName });
    this.setState({ artworkUrl100: res[0].artworkUrl100 });
    this.setState({ arrayOfMsc: filteredSong });
  };

  render() {
    const { artistName, collectionName, arrayOfMsc,
      artworkUrl100 } = this.state;

    return (
      <div data-testid="page-album">
        <HeaderAlbum />
        <div className="search-options-container">
          {' '}
          <p
            className="artist-name"
            data-testid="artist-name"
          >
            Artista:
            {' '}
            {artistName}

          </p>
          <p
            className="collection-name"
            data-testid="album-name"
          >
            Album:
            {' '}
            {collectionName}

          </p>

        </div>

        <img className="albumImg" src={ artworkUrl100 } alt="" />

        <div className="container">
          <div className="main-audio-container">
            {arrayOfMsc.map((msc) => (<MusicCard
              { ...msc }
              key={ msc.trackName }
              executeFunc={ this.executeFunc }
            />))}
          </div>
        </div>
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default Album;
