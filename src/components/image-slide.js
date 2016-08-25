import React from 'react';
import ClassNames from 'classnames';
import CoffeeStore from "../stores/coffee-store";
import * as CoffeeActions from "../actions/coffee-actions";

export default class ImageSlide extends React.Component {
  constructor() {
    super();
    this.state = {
      coffees: []
    };

    CoffeeActions.loadCoffee();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    CoffeeStore.addChangeListener(this._onChange);
    //this._getCoffeeDataIfNeeded(this.props);
  }

  componentWillUnmount() {
    CoffeeStore.removeChangeListener(this._onChange);
  }

  // componentWillReceiveProps(nextProps) {
  //   this._getCoffeeDataIfNeeded(nextProps);
  // }

  _onChange() {
    const coffees = CoffeeStore.getAll();
    this.setState({coffees: coffees});
  }

  render() {
    const {coffees} = this.state;
    if (coffees) {
    return (
      <div id="slide-show" className="carousel slide hidden-sm hidden-xs" data-ride="carousel">

        <ol className="carousel-indicators">
          {coffees.map((coffee) => (
            <li key={coffee.id} data-target="#slide-show" data-slide-to={coffee.id} className={ClassNames({
              'active': (coffee.id == 1)
            })}></li>
          ))}
        </ol>

        <div className="carousel-inner" role="listbox">
          {coffees.map((coffee) => (
            <div key={coffee.id} className={ClassNames({
              'item': true,
              'active': (coffee.id == 1)
            })}>
              <img src={coffee.image[1]} alt={coffee.name}></img>
            </div>
          ))}
        </div>

        <a className="left carousel-control" href="#slide-show" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#slide-show" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }else {
    return <div>Loading...</div>;
  }
  }
}
