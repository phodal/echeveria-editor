import React, { Component } from 'react';
const { ClearFix, Snackbar, RaisedButton, TextField } = require('material-ui');

export default class SettingPage extends Component {
  constructor() {
    super();
    this.state = {
      autoHideDuration: 0
    };
    this.handleRepoChange = this.handleRepoChange.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRepoChange(e) {
    this.setState({
      repo: e.target.value
    });
  };

  handleTokenChange(e) {
    this.setState({
      token: e.target.value
    });
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
    console.log(this.state);

    return (
      <ClearFix>
        <div style={styles.group} >
          <TextField
            style={styles.textfield}
            hintText="Hint Text"
            defaultValue="phodal-archive/echeveria-editor"
            floatingLabelText="Github Repo Name"
            onChange={this.handleRepoChange}/>

          <TextField
            style={styles.textfield}
            hintText="Hint Text"
            defaultValue="xxx"
            floatingLabelText="Github Token"
            onChange={this.handleTokenChange} />

          <RaisedButton label="Save" secondary={true} onMouseDown={this.handleSubmit}/>
          <Snackbar
            ref="snackbar"
            message="Save Successful"
            autoHideDuration={this.state.autoHideDuration} />

        </div>
      </ClearFix>
    );
  }
}
