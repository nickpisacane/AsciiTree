// @flow

import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component<{}> {
  render() {
    return (
      <header className="header">
        <div className="header__title">
          ASCII Tree
        </div>
        <div className="header__links">
          <a
            className="header__link fa fa-github"
            href="https://github.com/nickpisacane/AsciiTree"
            target="_blank"
          />
        </div>
      </header>
    )
  }
}
