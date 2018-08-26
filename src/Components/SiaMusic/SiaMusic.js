import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './SiaMusic.css';

class SiaMusic extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      listOfSongs: this.props.listOfSongs || this.props.location.state.listOfSongs,
      filteredListOfSongs: this.props.listOfSongs || this.props.location.state.listOfSongs,
      input:'',
      pageNum: 1,
      displayedSongs: [],
      previousButton: 'disabled',
      nextButton: '',
      songsContainer: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.setSongs();
  }

  setSongs() {
    const r = _.dropRight(this.state.listOfSongs, (this.state.listOfSongs.length-5));
    this.setState({ displayedSongs: r });
  }

  collapseSongs(that) {
    if (this.state.songsContainer === '') that.setState({ songsContainer: 'hidden' });
    if (this.state.songsContainer === 'hidden') that.setState({ songsContainer: '' });
  }

  handleInputChange(e) {
    const input = e.target.value;
    this.setState({ input });
    this.searchSongs(input);
  }

  searchSongs(string) {
    const songs = [];
    this.state.filteredListOfSongs.map(song => {
      if (_.lowerCase(song.title.substring(0, string.length)) === _.lowerCase(string)) {
        songs.push(song);
      }
    });
    this.setState({ displayedSongs: songs.slice(0, 5) });
  }

  goNext(songs) {
    const p = this.state.pageNum;
    if (p >= 4) this.setState({ nextButton: 'disabled' });
    if (p > 0) this.setState({ previousButton: '' });
    this.setState({
      pageNum: this.state.pageNum + 1,
      displayedSongs: songs.slice((p*5), (p*5) + 5)
    });
  }

  goPrevious(songs) {
    const p = this.state.pageNum;
    if (p <= 2) this.setState({ previousButton: 'disabled' });
    if (p >= 4) this.setState({ nextButton: '' });
    this.setState({
      pageNum: this.state.pageNum - 1,
      displayedSongs: songs.slice((((p-1)*5)-5), ((p-1)*5))
    });
  }

  isDispplayed() {
    return (this.state.songsContainer === '') ? 'disabled' : 'enabled';
  }

  render() {
    return (
      <div id="sia-music">

        <div id='title-section'>
          <h1>{ "DISCOVER YOUR FAVORITE SONGS!" }</h1>
        </div>

        <div id={ this.state.songsContainer }>
          <input type='text' name='user-entry' id='search-input'
            placeholder='Search songs'
            value={ this.state.input }
            onChange={ this.handleInputChange }
          />
          <div id='songs-container'>
            {
              this.state.displayedSongs.map(song => {
                return (
                  <div id='song-item'>
                    <div id='link' onClick={ () => this.collapseSongs(this) }>
                      <Link to={{
                        pathname: `/song/${song.id}`,
                        state: { songId: song.id }
                      }}>
                        { song.title }
                      </Link>
                    </div>
                  </div>
                );
            })}
          </div>

          <div id='pagination'>
            <div id='previous'>
              <button onClick={ () => this.goPrevious(this.state.listOfSongs) }
                disabled={ this.state.previousButton }>
                { '<' }
              </button>
            </div>
            <div id='page-num'><p>{ this.state.pageNum }</p></div>
            <div id='next'>
              <button onClick={ () => this.goNext(this.state.listOfSongs) }
                disabled={ this.state.nextButton }>
                { '>' }
              </button>
            </div>
          </div>
        </div>

        <div id={ this.isDispplayed() } onClick={ () => this.collapseSongs(this) }>
          <Link to={{
            pathname: '/',
            state: { listOfSongs: this.props.songs }
          }}>
            Back to browse
          </Link>
        </div>

      </div>
    );
  }
}

SiaMusic.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    songs: state.sia.songs
  };
}

export default connect(mapStateToProps)(SiaMusic);
