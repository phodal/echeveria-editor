import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';
const { TextField } = require('material-ui');
var marked = require('marked');

export default class Markdown extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
      url: "",
      date: "",
      content: ""
    };
  }

  componentDidMount() {
    if (localStorage.getItem('data') !== null) {
      var data = JSON.parse(localStorage.getItem('data'));
      this.setState({
        title: data.title,
        author: data.author,
        url: data.url,
        date: data.date,
        content: data.blogpost
      });
    }
  }

  createMarkup() {
    return {__html: marked(this.state.content)};
  }

  render() {

    return (
      <div>
        <div dangerouslySetInnerHTML={this.createMarkup()} />
      </div>
    );
  }
}
