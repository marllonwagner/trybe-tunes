import React, { Component } from 'react';
import '../css/loading.css';
import loadingIcon from '../css/loadingIcon.svg';

class Loading extends Component {
  // constructor(props) {
  //     super(props);
  // }
  // state = {  }
  render() {
    return (
      <div
        className="loading-container"
      >
        <img
          className="loading-icon"
          src={ loadingIcon }
          alt=""
        />
        Carregando...

      </div>
    );
  }
}

export default Loading;
