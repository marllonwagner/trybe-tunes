import React, { Component } from 'react';
import '../css/checkBox.css';

export default class CheckBox extends Component {
  render() {
    return (

      <div>
        <input
          className="checkbox"
      
          type="checkbox"
          name="fav"
        />
        <label htmlFor="heart">
          Check me!
        </label>
      </div>

    );
  }
}
