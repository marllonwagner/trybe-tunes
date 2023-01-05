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

class Header extends Component {
  state = {
    isLoading: false,
    userName: '',
    userImg: '',

  };

  componentDidMount() {
    this.getInfosFromUser();
  }

  getInfosFromUser = async () => {
    this.setState({ isLoading: true });
    const userInfo = await getUser();
    this.setState({ isLoading: false });
    this.setState({ userName: userInfo.name,
      userImg: userInfo.image });
  };

  render() {
    const { userName, isLoading, userImg } = this.state;
    const url = window.location.pathname;
    const imgUrl = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

    return (
      <header
        className="search-header"
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
            <img
              src={ userImg === ''
                ? imgUrl : userImg }
              alt=""
              className="header-profile-img"
            />

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
          className={ url === '/favorites'
            ? 'favorites-link-active' : 'favorites-link' }
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

export default Header;
