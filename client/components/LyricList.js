import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import query from "../queries/fetchSong";

class LyricList extends Component {
  renderLyrics() {
    const lyrics = this.props.lyrics;
    return lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <span>({likes})</span>
          <i className="material-icons" onClick={() => this.onLyricLike(id)}>
            delete
          </i>
        </li>
      );
    });
  }

  onLyricLike(id) {
    this.props
      .mutate({
        variables: { id },
        refetchQueries: [{ query, variables: { id: this.props.songId } }]
      })
      .then(resp => console.log(resp));
  }

  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    );
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(LyricList);