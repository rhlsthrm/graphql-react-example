import React, { Component } from "react";
import query from "../queries/fetchSong";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

class SongDetail extends Component {
  render() {
    console.log(this.props);
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{this.props.data.song.title}</h3>
        <LyricList lyrics={this.props.data.song.lyrics} songId={this.props.params.id} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(query, {
  options: props => {
    return { variables: { id: props.params.id } };
  }
})(SongDetail);
