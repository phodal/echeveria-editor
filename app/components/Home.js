import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';
const { TextField,Snackbar } = require('material-ui');
const GitHubApi = require("github-api");


export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      autoHideDuration: 0,
      sending: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    var that = this;
    this.setState({
      sending: 1
    });
    var github = new GitHubApi({
      token: "",
      auth: "oauth"
    });
    var repo = github.getRepo("phodal-archive", "echeveria-content");
    repo.read('master', 'README.md', function (err, data) {
      that.refs.snackbar.show();
      that.setState({
        sending: 0
      });
    });
  };

  render() {
    return (
      <div>
        <div className={styles.article}>
          <div className={styles.titleLine}>
            <div className={styles.headLine}>
              <i className="fa fa-fw fa-edit mode"></i>
              <TextField
                hintText="标题"/>
            </div>
            <div className={styles.publish}>
              <button type="submit" className="fa fa-fw fa-paper-plane-o mode" onClick={this.handleSubmit} disabled={this.sending}/>
            </div>
          </div>
          <div id="editor" className={styles.editor}>
            说说你的故事...
          </div>
        </div>
        <Snackbar
          ref="snackbar"
          message="上传成功"
          autoHideDuration={this.state.autoHideDuration}/>
      </div>
    );
  }
}
