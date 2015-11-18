import React, { Component, PropTypes} from 'react';
import DevTools from './DevTools';
var Link = require('react-router').Link;

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        <div className="header">
          <ul className="horizontal">
            <li><Link to="/"><i className="fa fa-fw fa-edit mode"></i></Link></li>
            <li><Link to="/wechat"><i className="fa fa-fw fa-wechat mode"></i></Link></li>
            <li><Link to="/markdown"><i className="fa fa-fw fa-medium mode"></i></Link></li>
            <li><Link to="/setting"><i className="fa fa-fw fa-gears mode"></i></Link></li>
          </ul>
        </div>
        {this.props.children}
        <DevTools />
      </div>
    );
  }
}

