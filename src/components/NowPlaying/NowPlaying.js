
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NowPlaying.css';
import base from '../../base';

const baseURL = 'https://api.spotify.com/v1/tracks/'

class NowPlaying extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      current: {},
    };
  }

  componentWillMount() {
    this.ref = base.syncState('rooms/johns-room/current', {
      context: this,
      state: 'current',
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    this.getAlbumArtwork();
  }

  async getAlbumArtwork() {
    const response = await fetch(`${baseURL}${this.state.current['track-id']}`);
    const responseJson = await response.json();
    const artwork = responseJson.album.images[0].url;
    this.setState({ imageURL: artwork})
  }

  render() {
    return (
      <div className="now-playing">
        <h3>Now Playing:</h3>
        <img className="artwork" src={ this.state.imageURL } />
        <span className="rating">
          <i className="material-icons">favorite_border</i>
          <i className="material-icons">favorite_border</i>
          <i className="material-icons">favorite_border</i>
          <i className="material-icons">favorite_border</i>
          <i className="material-icons">favorite_border</i>
        </span>
        <div className="info">
          <div className="currently">Currently Playing</div>
          <div className="song">
            <span className="name">{ this.state.current.name },</span>
            <span className="artist">{ this.state.current.artist }</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(NowPlaying);
