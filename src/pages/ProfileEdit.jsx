import React, { Component } from 'react';
import Header from '../components/Header';
import { createUser } from '../services/userAPI';
import '../css/editProfile.css';

class ProfileEdit extends Component {
  // constructor(props) {
  //     super(props);
  // }
  state = {
    userImg: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
  };

  redirectAndSave = () => {
    const { history } = this.props;

    this.saveUserInfos();
    history.push('/profile');
  };

  saveUserInfos = async () => {
    const { emailInput, descriptionInput, nameEdited, imageInput } = this.props;
    await createUser({ email: emailInput,
      description: descriptionInput,
      name: nameEdited,
      image: imageInput });
  };

  render() {
    const { emailChange, emailInput, descriptChange,
      descriptionInput, nameChange, nameEdited, imageChange, imageInput } = this.props;

    const { userImg } = this.state;
    const imgUrl = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <img src={ userImg === '' ? imgUrl : userImg } alt="" className="profile-img" />

        <div className="search-options-container" />

        <div className="edit-form-container">
          <form className="edit-form">

            <label
              className="input-label"
              htmlFor="name"
            >
              <span className="input-text"> Nome </span>
              <span className="input-subText">
                Fique a vontade para usar seu nome social
              </span>
              <input
                className="input"
                onChange={ nameChange }
                value={ nameEdited }
                placeholder="Seu nome"
                type="text"
                name="name"
                id="name"
              />
            </label>

            <label
              className="input-label"
              htmlFor="email"
            >
              {' '}
              <span className="input-text"> E-mail </span>
              <span className="input-subText">
                Escolha um e-mail que consulte diariamente
                {' '}

              </span>
              <input
                className="input"
                onChange={ emailChange }
                value={ emailInput }
                placeholder="exemplo@email.com.br"
                type="email"
                name="email"
                id="email"
              />
            </label>
            <label
              className="input-label"
              htmlFor="description"
            >
              {' '}
              <span className="input-text"> Descrição </span>
              <textarea
                className="textArea"
                maxLength={ 500 }
                placeholder="Sobre mim"
                value={ descriptionInput }
                onChange={ descriptChange }
                name="description"
                id="description"
                cols="30"
                rows="10"
              />
            </label>
            <button
              className="edit-btn"
              onClick={ this.redirectAndSave }
              type="button"
            >
              <span className="edit-text-btn">Salvar</span>

            </button>
          </form>
          <input
            className="input-url"
            onChange={ imageChange }
            value={ imageInput }
            placeholder="url da imagem"
            type="url"
            name=""
            id=""
          />
        </div>

      </div>
    );
  }
}

export default ProfileEdit;
