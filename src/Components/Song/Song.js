import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSongInfo } from '../../services/genius';

import './Song.css';

class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getSong();
  }

  async getSong() {
    const songId = this.props.location.state.songId;
    const song = await getSongInfo(songId, this.props.token);
    const producers = this.formatList(song.producer_artists);
    const writers = this.formatList(song.writer_artists);
    console.log(song);
    this.setState({
      songCover: song.song_art_image_url,
      albumName: song.album.name || '-',
      releaseDate: song.release_date,
      songTitle: song.title,
      writers,
      producers
    });
  }

  formatList(list) {
    const array = [];
    list.map(item => {
      array.push(item.name);
    });
    return array.slice(0, 4).join(', ');
  }

  render() {
    return (
      <div className="song">
        <div id='img-container'>
          <img className='img' src={ this.state.songCover }/>
        </div>
        <div id='info-container'>
          <h2>{ this.state.songTitle }</h2>
          <p id='artist'>Sia</p>
          <p className='info' >Release Date: { this.state.releaseDate }</p>
          <p className='info' >Album: { this.state.albumName }</p>
          <p className='info' >Writer(s): { this.state.writers }</p>
          <p className='info' >Producer(s): { this.state.producers }</p>
        </div>

      </div>
    );
  }
}

Song.propTypes = {
  token: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    token: state.auth.token
  };
}

export default connect(mapStateToProps)(Song);
