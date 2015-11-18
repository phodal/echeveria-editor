import React, { Component } from 'react';
const { ClearFix, Snackbar, RaisedButton, TextField } = require('material-ui');

export default class Setting extends Component {
  constructor() {
    super();
    this.state = {
      autoHideDuration: 0,
      repo: localStorage.getItem('repo'),
      token: localStorage.getItem('token')
    };
    this.handleRepoChange = this.handleRepoChange.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRepoChange(e) {
    this.setState({
      repo: e.target.value
    });
    localStorage.setItem('repo', e.target.value)
  };

  handleTokenChange(e) {
    this.setState({
      token: e.target.value
    });
    localStorage.setItem('token', e.target.value)
  };

  handleSubmit() {
    this.refs.snackbar.show();
  };

  getStyles() {
    let styles = {
      group: {
        width: '100%',
        float: 'left',
        marginLeft: 32,
        marginBottom: 32
      },
      textfield: {
        display: "block",
        marginTop: 18
      }
    };
    return styles;
  };

  render() {
    var styles = this.getStyles();

    return (
      <ClearFix>
        <div style={styles.group}>
          <TextField
            style={styles.textfield}
            hintText="phodal-archive/echeveria-content"
            defaultValue={this.state.repo}
            floatingLabelText="Github Repo Name"
            onChange={this.handleRepoChange}/>

          <TextField
            style={styles.textfield}
            hintText="789e99d9c009...."
            defaultValue={this.state.token}
            floatingLabelText="Github Token"
            onChange={this.handleTokenChange}/>

          <RaisedButton label="Save" secondary={true} onMouseDown={this.handleSubmit}/>
          <Snackbar
            ref="snackbar"
            message="Save Successful"
            autoHideDuration={this.state.autoHideDuration}/>

        </div>
      </ClearFix>
    );
  }
}
