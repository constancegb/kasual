import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SiaMusic from './Components/SiaMusic/SiaMusic';
import Song from './Components/Song/Song';
import LogIn from './Components/Login/LogIn';
import './App.css';
import { getSongs } from './services/genius';
import { login } from './actions/auth';
import { setSongs } from './actions/sia';
import blurBackground from './images/blur.jpg';

const background = {
  width: '100vw',
  height: '100vh',
  backgroundImage: `url(${blurBackground})`,
  'background-size': 'cover',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
  }

  componentDidMount() {
    this.init(window.location.hash);
  }

  async init(hash) {
    const token = hash.split('&')[0].split('=')[1] || this.props.token;
    if (token !== undefined && token !== null) {
      const songs = await getSongs(token);
      this.setState({ listOfSongs: songs });
      this.props.dispatch(login(token));
      this.props.dispatch(setSongs(songs));
    }
  }

  render() {
    return (
      <div className="App" >
        <div style={ background }>
          {
            (this.props.isLoggedIn)
            ? <SiaMusic listOfSongs={ this.state.listOfSongs }/>
            : <LogIn />
          }
          <Route exact path='/song/:songs_id' component={ Song }/>
          <Route exact path='/sia' component={ SiaMusic }/>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isLoggedIn: !!state.auth.token
  };
}

export default withRouter(connect(mapStateToProps)(App));
