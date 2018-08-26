import React, { Component } from 'react';
import config from '../../config';

import './Login.css';

class LogIn extends Component {

  redirect() {
    const url = `${config.genius.url}/oauth/authorize?client_id=${config.genius.client_id}&redirect_uri=http://localhost:3000/sia&scope=me&state=ok&response_type=token`;
    window.location.assign(url);
  }

  render() {
    return (
      <div id='login'>
        <div id='title'><h1>WELCOME TO SIA MUSIC</h1></div>
        <button id='login-btn' onClick={ () => this.redirect() }>
            DISCOVER WITH GENIUS
        </button>
      </div>

    );
  }
}

export default LogIn;
