import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.module.css';
import GithubAPI from 'github-api';
import AlloyEditor from 'alloyeditor';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="article">
          <div className="titleLine">
            <div id="headline">
              <i className="fa fa-fw fa-edit mode"></i>
              <input type="text" id="title" placeholder="标题"/>
            </div>
            <div>
              <button id="publish" type="submit" className="fa fa-fw fa-paper-plane-o mode"></button>
            </div>
          </div>
          <div id="editor">
            说说你的故事...
          </div>
        </div>
      </div>
    );
  }
}
