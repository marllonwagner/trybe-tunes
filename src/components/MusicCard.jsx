import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';
import '../css/selectedAlbum.css';
import '../css/checkBox.css';

class MusicCard extends Component {
  // constructor(props) {
  //     super(props);
  // }
  state = {
    checkClick: '',
    isLoading: false,
    // myFavoriteSongs: [],

  };

  componentDidMount() {
    this.getFavoriteSongs();
  }

  addSong = async () => {
    const { trackId, executeFunc } = this.props;
    // this.setState({ isLoading: true });
    await addSong(trackId);
    await executeFunc();
    // this.setState({ isLoading: false });
  };

  removeSong = async () => {
    const { trackId } = this.props;
    // this.setState({ isLoading: true });
    await removeSong(trackId);
    // this.setState({ isLoading: false });
  };

  subInfos3 = () => {
    const { checkClick } = this.state;
    if (checkClick === true) {
      this.setState({ checkClick: false });
      this.removeSong();
    } else {
      this.setState({ checkClick: true });
      this.addSong();
    }
    // chamaLog();
    // this.setState({ checkClick: true });
  };

  getFavoriteSongs = async () => {
    const { trackId } = this.props;
    // const { myFavoriteSongs } = this.state;
    const res = await getFavoriteSongs(trackId);

    if (res.some((e) => e === trackId)) {
      this.setState({ checkClick: true });
    } else {
      this.setState({ checkClick: false });
    }
    // this.setState({ myFavoriteSongs: getFavoriteSongs() });
    // getFavoriteSongs();
  };

  render() {
    const { trackName, previewUrl, trackId, executeFunc } = this.props;
    const { checkClick, isLoading } = this.state;

    // let { checkedBoxes } = this.state;

    return (

      <div className="audio-container">
        {isLoading ? <Loading /> : (
          <div className="audio-items-container">

            <p className="trackName">{trackName}</p>
            <audio
              className="audio-style"
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            {/* <label htmlFor="fav">

              <input
                data-testid={ `checkbox-music-${trackId}` }
                checked={ checkClick }
                onChange={ this.subInfos3 }
                type="checkbox"
                name="fav"
                id=""
              />
            </label> */}

            <label htmlFor="heart">
              <input
                // onClick={ executeFunc }
                checked={ checkClick }
                onChange={ this.subInfos3 }
                className="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                id="heart"
                name="heart"

              />

            </label>

          </div>)}
      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
}.isRequired;
export default MusicCard;
