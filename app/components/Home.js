import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';
const { TextField,Snackbar } = require('material-ui');
const GitHubApi = require("github-api");
import pinyin from "pinyin";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      autoHideDuration: 0,
      sending: 0,
      title: "",
      link: "",
      date: "",
      message: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
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
    repo.read('master', 'README.md', function (err, data) {
      that.setState({message: "上传成功" + data});
      that.refs.snackbar.show();
      that.setState({
        sending: 0
      });
    });
  };

  handleTitleChange(e) {
    var linkName = pinyin(e.target.value, {
      style: pinyin.STYLE_NORMAL // 设置拼音风格
    }).toString();
    linkName = linkName.replace(/,/g, '-');

    console.log(linkName);
    this.setState({
      title: e.target.value,
      link: linkName
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

  static getStyles() {
    return {
      link: {
        marginLeft: "2em"
      },
      author: {
        marginLeft: "2em",
        width: "4em"
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
                value={this.state.link}
                defaultValue={this.state.link}
                floatingLabelText="链接名"
                hintText="biaoti-2014"/>
              <TextField
                style={inlineStyles.link}
                defaultValue={this.state.date}
                onChange={this.handleDateChange}
                type="date"
                floatingLabelText="日期" />
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
