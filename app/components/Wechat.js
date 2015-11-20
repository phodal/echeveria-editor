import React, { Component, PropTypes } from 'react';
var ReactQuill = require('react-quill');
var marked = require('marked');

class Wechat extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
      url: "",
      date: "",
      article: "",
      htmlContent: ""
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
        article: data.article,
        htmlContent: marked(data.article)
      });
      console.log(this.state.htmlContent)
    }
  }

  render() {
    return (
      <div>
        <ReactQuill
          theme="snow"
          value={this.state.htmlContent} />
      </div>
    );
  }
}

export default Wechat;
