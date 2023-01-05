import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
import Album from '../components/Album';
import '../css/search.css';
import search from '../css/search.svg';

class Search extends Component {
  render() {
    const { isLoginBtnDisabled2, onInputChange2,
      subInfos2, nameInput2, isLoading,
      showResultText, inputArtist,
      arrayOfMusics } = this.props;

    const showArtistName = () => {
      const word = inputArtist;
      const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
      if (arrayOfMusics.length > 0) {
        return (
          <div>
            <h2
              className="result-text"
            >
              {`Resultado de álbuns de ${capitalized}:`}

            </h2>
            <div className="main-container">
              <span className="album-container">
                {arrayOfMusics.map((alb) => (<Album
                  { ...alb }
                  key={ alb.collectionId }
                />))}
              </span>
            </div>
          </div>
        );
      }
      return <h2>Nenhum álbum foi encontrado</h2>;
    };

    return (
      <div data-testid="page-search">
        <Header />

        {isLoading ? <Loading /> : (
          <div className="search-options-container">
            <div className="search-options">
              <form action="">
                <label htmlFor="search-bar">
                  <img
                    className="input-search-icon"
                    src={ search }
                    alt=""
                  />
                  <input
                    className="search-input"
                    placeholder="Digite a banda ou artista "
                    value={ nameInput2 }
                    onChange={ onInputChange2 }
                    data-testid="search-artist-input"
                    type="text"
                    name="search-bar"
                    id=""
                  />

                </label>
                {' '}
                <button
                  className="search-btn"
                  onClick={ subInfos2 }
                  disabled={ isLoginBtnDisabled2 }
                  data-testid="search-artist-button"
                  type="button"
                >
                  <span className="search-btn-text">
                    Pesquisar
                  </span>

                </button>
              </form>

            </div>
          </div>
        )}
        {showResultText && showArtistName()}

      </div>
    );
  }
}
Search.propTypes = {
  isLoginBtnDisabled2: PropTypes.bool,
}.isRequired;

export default Search;
