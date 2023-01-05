import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import logo from '../css/logo.svg';
import searchBold from '../css/searchBold.svg';
import search from '../css/search.svg';
import star from '../css/star.svg';
import starBold from '../css/starBold.svg';
import profile from '../css/profile.svg';
import profileBold from '../css/profileBold.svg';
import '../css/favorites.css';

class HeaderFavorites extends Component {
  state = {
    isLoading: false,
    userName: '',

  };

  componentDidMount() {
    this.getInfosFromUser();
  }

  getInfosFromUser = async () => {
    this.setState({ isLoading: true });
    const userInfo = await getUser();
    this.setState({ isLoading: false });
    this.setState({ userName: userInfo.name });
  };

  render() {
    const { userName, isLoading } = this.state;
    const url = window.location.pathname;

    return (
      <header
        className="search-header-favorites"
        data-testid="header-component"
      >
        <img
          className="header-logo"
          src={ logo }
          alt=""
        />
        {isLoading === true ? <Loading /> : (
          <p
            className="user-name"
            data-testid="header-user-name"
          >
            {userName}
          </p>)}

        <Link
          className={ url === '/search' ? 'search-link-active' : 'search-link' }
          to="/search"
          data-testid="link-to-search"
        >
          <img
            className="search-svg"
            src={ url === '/search' ? searchBold : search }
            alt=""
          />

          Pesquisa

        </Link>

        <Link
          to="/favorites"
          className={ url === '/favorites' ? 'favorites-link-active' : 'favorites-link' }
          data-testid="link-to-favorites"
        >
          <img
            className="star-svg"
            src={ url === '/favorites' ? starBold : star }
            alt=""
          />
          Favoritas

        </Link>
        <Link
          to="/profile"
          className={ url === '/profile' ? 'profile-link-active' : 'profile-link' }
          data-testid="link-to-profile"
        >

          <img
            className="profile-svg"
            src={ url === '/profile' ? profileBold : profile }
            alt=""
          />
          Perfil

        </Link>
      </header>
    );
  }
}

export default HeaderFavorites;
