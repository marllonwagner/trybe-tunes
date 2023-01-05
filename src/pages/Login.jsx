import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import '../css/login.css';
import logo from '../css/logo.svg';
import effects from '../css/effects.svg';

class Login extends Component {
  render() {
    const { isLoginBtnDisabled, onInputChange,
      subInfos, isLoading, nameInput } = this.props;
    return (
      <main className="main-login">
        <div
          className="login-back"
          data-testid="page-login"
        >
          <img
            className="effects"
            src={ effects }
            alt=""
          />

          {
            isLoading ? <Loading /> : (
              <form
                className="white-box"
                action=""
              >
                <div>
                  <img src={ logo } alt="" />

                </div>
                <div className="btn-input-box">
                  <label htmlFor="inputName">
                    <input
                      className="name-input"
                      placeholder="qual é seu nome?"
                      value={ nameInput }
                      onChange={ onInputChange }
                      data-testid="login-name-input"
                      type="text"
                      name="inputName"
                      id=""
                    />

                  </label>

                  <button
                    className="login-btn"
                    onClick={ subInfos }
                    disabled={ isLoginBtnDisabled }
                    type="button"
                    data-testid="login-submit-button"
                  >
                    <span className="login-btn-text">
                      Entrar
                    </span>

                  </button>

                </div>
              </form>)
          }
          {/* {isLoading && <p><Loading /></p> : <p />} */}
        </div>
      </main>
    );
  }
}
Login.propTypes = {
  isLoginBtnDisabled: PropTypes.bool,
}.isRequired;

export default Login;
