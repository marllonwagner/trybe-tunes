import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Album extends Component {
  state = {
    showInfo: false,
  };

  render() {
    const { showInfo } = this.state;

    const { artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } = this.props;
    return (
      <p
        onFocus={ () => undefined }
        onMouseOver={ () => {
          this.setState({
            showInfo: true,
          });
        } }
        onMouseLeave={ () => {
          this.setState({
            showInfo: false,
          });
        } }
        className="album-item-container"
      >
        {
          showInfo
         && <span className="legend">
           {' '}
           Album:
           {' '}
           { collectionName }
           {' '}
         </span>
        }
        { showInfo && <span className="legend">
          Artist:
          {' '}
          {artistName}
                      </span> }
        {/* {artistId} */}
        {/* {artistName} */}
        {/* {collectionId} */}
        {/* {collectionPrice} */}
        {/* {artworkUrl100} */}
        {/* {releaseDate} */}
        {/* {trackCount} */}
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <img
            className="album-img"
            src={ artworkUrl100 }
            alt=""
          />

        </Link>

      </p>
    );
  }
}
Album.propTypes = {
  artistName: PropTypes.string,
}.isRequired;

export default Album;
