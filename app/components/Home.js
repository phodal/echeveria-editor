import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';
const { TextField,Snackbar,DatePicker } = require('material-ui');
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
      message: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
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

    var link = pinyin(e.target.value, {
      style: pinyin.STYLE_NORMAL // 设置拼音风格
    }).toString();
    link = link.replace(/,/g, '-');

    console.log(link);
    this.setState({
      title: e.target.value,
      link: link
    });
  };

  getStyles() {
    return {
      link: {
        marginLeft: "2em"
      }
    };
  };


  render() {
    var inlineStyles = this.getStyles();
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
                hintText="标题"/>
              <TextField
                style={inlineStyles.link}
                defaultValue={this.state.link}
                hintText="链接名,如: biaoti-2014"/>
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
