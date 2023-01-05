import React, { Component } from 'react';
import Header from '../components/Header';
import '../css/profile.css';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  // constructor(props) {
  //     super(props);
  // }

  state = {
    userName: '',
    userEmail: '',
    userDescription: '',
    userImg: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
  };

  componentDidMount() {
    this.getInfosFromUser();
  }

  getInfosFromUser = async () => {
    const userInfo = await getUser();

    this.setState({ userName: userInfo.name,
      userEmail: userInfo.email,
      userDescription: userInfo.description,
      userImg: userInfo.image });
  };

  redirecter = () => {
    const { history } = this.props;
    history.push('/profile/edit');
  };

  render() {
    const { nameInput, emailInput, descriptionInput, nameEdited } = this.props;
    const { userName, userEmail, userDescription, userImg } = this.state;
    const imgUrl = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

    return (
      <div data-testid="page-profile">

        <Header />

        <img src={ userImg === '' ? imgUrl : userImg } alt="" className="profile-img" />

        <div className="search-options-container" />

        <div className="profile-main-container">
          <div className="profile-container">
            <div className="profile-name-container">
              <span className="profile-legend">Nome</span>
              <span className="profile-infos">
                {nameEdited === ''
                  ? userName : nameEdited}

              </span>

            </div>
            <div className="profile-email-container">
              <span className="profile-legend">E-mail</span>
              <span className="profile-infos">{userEmail}</span>

            </div>

            <div className="profile-description-container">
              <span className="profile-legend"> Descrição</span>
              <span className="profile-infos">{userDescription}</span>

            </div>

            <button
              onClick={ this.redirecter }
              className="profile-btn"
              type="button"
            >
              <span className="profile-btn-text">Editar Perfil</span>
            </button>

          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
