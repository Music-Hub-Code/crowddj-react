import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Song.css';
import base from '../../base';
import { voteSong } from '../../core/utils';

class Song extends React.Component {
  constructor(props) {
    super(props);

    this.upvote = this.upvote.bind(this);

    this.state = {
      voteCount: props.song.voteCount
    };
  }

  componentWillMount() {
    this.ref = base.syncState(`rooms/johns-room/queue/${this.props.song.key}/voteCount`, {
      context: this,
      state: 'voteCount'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    const { song } = this.props;
    return (
      <tr>
        <td className="ranking">1</td>
        <td className="name-artist">
          <span className="name">{ song.name }</span>
          <span className="artist">{ song.artist }</span>
        </td>
        <td className="vote" onClick={ this.upvote }>
          <i className="material-icons">thumb_up</i>
          <span className="upvotes">{ song.upvoteCount }10</span>
        </td>
      </tr>
    );
  }

  upvote() {
    if (voteSong(this.props.song)) {
      let state = { ...this.state };
      state.voteCount += 1;
      this.setState(state);
    }
  }
}

export default withStyles(s)(Song);
