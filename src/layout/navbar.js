import React from 'react';
import {Link} from 'react-router';
import OriginList from '../components/origin-list'

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-static-top">
          <div id="navbar" className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="/#/">
                Virtual CoffeeShop
              </a>
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">
                  Toggle Navigation
                </span>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
              </button>
            </div>
            <ul className="nav navbar-nav navbar-right collapse navbar-collapse">
              <li>
                <a href data-toggle="dropdown">
                  Origins
                  <span className="caret"/>
                </a>

                <OriginList></OriginList>

              </li>
              <li>
                <Link to="/subscription">Subscriptions</Link>
              </li>
              <li>
                <a href data-toggle="dropdown">
                  About
                  <span className="caret"/>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/story">Our Story</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                  <li className="divider"/>
                  <li>
                    <a href="http://facebook.com/kaijie.zhan.10" target="_blank">Facebook</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>

        {this.props.children}

      </div>
    );
  }
}
