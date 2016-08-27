import React from 'react';
import {Link} from 'react-router';
import CoffeeStore from "../stores/coffee-store";
import * as CoffeeActions from "../actions/coffee-actions";

export default class CoffeeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coffees: []
    };
    CoffeeActions.loadCoffee({coffeeId: this.props.coffeeId, originId: this.props.originId});
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    CoffeeStore.addChangeListener(this._onChange);
    //this._getCoffeeDataIfNeeded(this.props);
  }

  componentWillUnmount() {
    CoffeeStore.removeChangeListener(this._onChange);
  }

  componentWillReceiveProps(nextProps) {
    this._getCoffeeDataIfNeeded(this.props, nextProps);
  }

  _onChange() {
    const coffees = CoffeeStore.getAll();
    this.setState({coffees: coffees});
  }

  _getCoffeeDataIfNeeded(currentProps, nextProps) {
    if(this.props.coffeeId !== nextProps.coffeeId || this.props.originId !== nextProps.originId) {
      CoffeeActions.loadCoffee({coffeeId: nextProps.coffeeId, originId: nextProps.originId});
    }
  }

  render() {
    const {coffees} = this.state;
    if (coffees) {
      return (
        <div id="coffee-detail" className="container">
          {coffees.map((coffee) => (
            <div key={coffee.id} className="row col-sm-12">
              <div className="container col-sm-3">
                <img src={coffee.image[0]} className="img-responsive block-center"/>
              </div>
              <div id="coffee-detail-info" className="container col-sm-8 col-sm-offset-1 well">
                <h2 className="text-left">{coffee.name}</h2>
                <p className="text-left">
                  <span className="label label-info">{coffee.origin.name}</span>
                </p>
                <p className="text-left">{coffee.description}</p>
                <p>
                  <Link className="btn btn-primary" to={`/subscriptions/${coffee.id}`}>Subscribe Me!</Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
