import React, { Component } from 'react';
const { ClearFix, AppCanvas, TextField } = require('material-ui');

export default class SettingPage extends Component {
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
            hintText="Hint Text"
            defaultValue="phodal-archive/echeveria-editor"
            floatingLabelText="Github Repo Name"/>

          <TextField
            style={styles.textfield}
            hintText="Hint Text"
            defaultValue="xxx"
            floatingLabelText="Github Token"/>
        </div>
      </ClearFix>
    );
  }
}
