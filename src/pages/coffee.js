import React from 'react';
import CoffeeDetail from "../components/coffee-detail";

export default class CoffeePage extends React.Component {
  render() {
    return (
      <CoffeeDetail coffeeId={this.props.params.coffeeId}></CoffeeDetail>
    )
  }
}
