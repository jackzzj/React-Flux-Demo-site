import React from 'react';
import ClassNames from 'classnames';
import * as CoffeeActions from "../actions/coffee-actions";
import * as OriginActions from "../actions/origin-actions";
import OriginStore from "../stores/origin-store";

export default class OriginSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origins: [],
      selected: 0
    };

    OriginActions.loadOrigin(this.props.originId);
    this._onChange = this._onChange.bind(this);
    this._handleSearch = this._handleSearch.bind(this);
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
      <div className="sort-menu">
        <h2>Origins</h2>
        <div className="card">
          <div id="search" className="form-group col-sm-12 text-left">
            <ul className="list-unstyled">
              <li>
                <small>
                  {`Search in selected origin: `}
                  <input type="text" ref={(input) => this.search = input} onChange={this._handleSearch.bind(this)}/>
                </small>
              </li>
              <li>
                <a href="#" className={ClassNames({
                  'sort-menu-item': true,
                  'col-xs-12': true,
                  'active': this.state.selected===0
                })} onClick={this._handleOriginSelect.bind(this, 0)}>Show All Origins</a>
              </li>

              {origins.map((origin) => (
                <li key={origin.id}>
                  <a href="#" onClick={this._handleOriginSelect.bind(this, origin.id)}
                    className={ClassNames({
                      'sort-menu-item': true,
                      'col-xs-12': true,
                      'active': this.state.selected===origin.id
                    })}>
                    {origin.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  _handleSearch(event) {
    event.preventDefault();
    CoffeeActions.filterCoffeeBySearch(this.search.value);
  }

  _handleOriginSelect(originId, event) {
    event.preventDefault();
    this.search.value = "";
    CoffeeActions.filterCoffeeByOriginId(originId);
    this.setState({selected: originId});
  }

}

OriginSelector.proTypes = {
  origins: React.PropTypes.func.isRequired
}
