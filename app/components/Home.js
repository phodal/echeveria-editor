import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';
const { TextField,Snackbar } = require('material-ui');
const GitHubApi = require("github-api");
var moment = require('moment');
var marked = require('marked');
var toMarkdown = require('to-markdown');

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      autoHideDuration: 0,
      sending: 0,
      title: "",
      author: "白米君",
      url: "",
      date: moment(Date.now()).format('YYYY-MM-DD'),
      message: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
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
      document.getElementById('editor').innerHTML = data.contentHTML;
    }
  }

  handleSubmit() {
    var that = this;
    this.setState({
      sending: 1
    });

    if (localStorage.getItem('token') === null || localStorage.getItem('repo') === null) {
      that.setState({message: "跳转到设置中..."});
      that.refs.snackbar.show();
      return;
    }

    var token = localStorage.getItem('token');
    var username = localStorage.getItem('repo').split("/")[0];
    var reponame = localStorage.getItem('repo').split("/")[1];

    var github = new GitHubApi({
      token: token,
      auth: "oauth"
    });
    var repo = github.getRepo(username, reponame);

    var options = {
      author: {name: username, email: 'robot@baimizhou.net'},
      committer: {name: username, email: 'robot@baimizhou.net'},
      encode: true
    };

    var innerHTML = document.getElementById('editor').innerHTML;
    var md = toMarkdown(innerHTML);

    var data = {
      title: that.state.title,
      author: that.state.author,
      url: that.state.url,
      date: that.state.date,
      contentHTML: innerHTML,
      blogpost: md
    };

    var stringifyData = JSON.stringify(data);
    localStorage.setItem('data', stringifyData);

    repo.write('master', 'contents/' + data.url + '.json', stringifyData, 'Robot: add article ' + data.title, options, function (err, data) {
      if(data.commit){
        that.setState({message: "上传成功" + JSON.stringify(data)});
        that.refs.snackbar.show();
        that.setState({
          sending: 0
        });
      }
    });
  };

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  };

  handleAuthorChange(e) {
    this.setState({
      author: e.target.value
    });
  };

  handleDateChange(e) {
    this.setState({
      date: e.target.value
    });
  };

  handleURLChange(e) {
    this.setState({
      url: e.target.value
    });
  };

  static getStyles() {
    return {
      link: {
        marginLeft: "2em"
      },
      author: {
        marginLeft: "2em",
        width: "4em"
      },
      date: {
        marginLeft: "2em",
        width: "10em"
      }
    };
  };


  render() {
    var inlineStyles = Home.getStyles();
    var Message = this.state.message;

    return (
      <div>
        <div className={styles.article}>
          <div className={styles.titleLine}>
            <div className={styles.headLine}>
              <i className="fa fa-fw fa-edit mode"></i>
              <TextField
                defaultValue={this.state.title}
                onChange={this.handleTitleChange}
                floatingLabelText="标题"
                hintText="标题"/>

              <TextField
                style={inlineStyles.author}
                defaultValue={this.state.author}
                onChange={this.handleAuthorChange}
                floatingLabelText="作者"
                hintText="白米粥"/>

              <TextField
                style={inlineStyles.link}
                defaultValue={this.state.url}
                value={this.state.url}
                onChange={this.handleURLChange}
                floatingLabelText="链接名"
                hintText="baimizhou-2014"/>

              <TextField
                style={inlineStyles.date}
                defaultValue={this.state.date}
                onChange={this.handleDateChange}
                type="date"
                floatingLabelText="日期"/>

            </div>
            <div className={styles.publish}>
              <button type="submit" className="fa fa-fw fa-paper-plane-o mode" onClick={this.handleSubmit}
                      disabled={this.sending}/>
            </div>
          </div>
          <div id="editor" className={styles.editor}>
            说说你的故事...
          </div>
        </div>
        <Snackbar
          ref="snackbar"
          message={Message}
          autoHideDuration={this.state.autoHideDuration}/>
      </div>
    );
  }
}
