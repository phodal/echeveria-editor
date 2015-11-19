import React, { Component, PropTypes } from 'react';
var ReactQuill = require('react-quill');

class Wechat extends Component {

  render() {
    return (
      <div>
        <ReactQuill
          theme="snow"
          value="{}"/>
      </div>
    );
  }
}

export default Wechat;
