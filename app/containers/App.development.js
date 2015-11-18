import React, { Component, PropTypes} from 'react';
import DevTools from './DevTools';


export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div>
        <div className="header">
          <ul className="horizontal">
            <li><a href="#"><i className="fa fa-fw fa-edit mode"></i></a></li>
            <li><a href="#"><i className="fa fa-fw fa-wechat mode"></i></a></li>
            <li><a href="#"><i className="fa fa-fw fa-medium mode"></i></a></li>
            <li><a href="#"><i className="fa fa-fw fa-gears mode"></i></a></li>
          </ul>
        </div>
        {this.props.children}
        <DevTools />
      </div>
    );
  }
}

