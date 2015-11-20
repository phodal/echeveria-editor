import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';
const { TextField } = require('material-ui');
var marked = require('marked');
import './github-markdown.css';

export default class Markdown extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
      url: "",
      date: "",
      article: ""
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
        article: data.article
      });
    }
  }

  createMarkup() {
    return {__html: marked(this.state.article)};
  }

  render() {

    return (
      <div className="markdown-body">
        <div dangerouslySetInnerHTML={this.createMarkup()} />
      </div>
    );
  }
}
