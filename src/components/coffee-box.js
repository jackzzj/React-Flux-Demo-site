import React from 'react';
import {Link} from 'react-router';
import CoffeeStore from "../stores/coffee-store";
import * as CoffeeActions from "../actions/coffee-actions";

export default class CoffeeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coffees: []
    };

    CoffeeActions.loadCoffee({originId: this.props.originId});
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
    const coffees = CoffeeStore.getFiltered();//get filteredCoffees
    this.setState({coffees: coffees});
  }

  render() {
    const {coffees} = this.state;
    if (coffees) {
      return (
        <div className="row">
          {coffees.map((coffee) => (
            <div key={coffee.id} id="coffee-item" className="col-xs-6 col-lg-4">
              <Link to={`/coffee/${coffee.id}`}><img src={coffee.image[0]} className="img-responsive block-center"/></Link>
              <h4 className="text-left">
                <Link to={`/coffee/${coffee.id}`}>{coffee.name}</Link>
              </h4>
              <p className="text-left">
                <span className="label label-info">{coffee.origin.name}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }else {
      return <div>Loading...</div>;
    }
  }
}
