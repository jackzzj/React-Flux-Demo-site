import React from 'react';
import {Link} from 'react-router';
import * as OriginActions from "../actions/origin-actions";
import OriginStore from "../stores/origin-store";

export default class OriginList extends React.Component {
  constructor() {
    super();
    this.state = {
      origins: []
    };

    OriginActions.loadOrigin();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    OriginStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    OriginStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    const origins = OriginStore.getAll();
    this.setState({origins: origins});
  }

  render() {
    const {origins} = this.state;
    return (
        <ul className="dropdown-menu">
          {origins.map((origin) => (
            <li key={origin.id}>
              <Link to={`/origin/${origin.id}`}>{origin.name}</Link>
            </li>
          ))}
        </ul>
    )
  }
}

OriginList.proTypes = {
  origins: React.PropTypes.func.isRequired
}
