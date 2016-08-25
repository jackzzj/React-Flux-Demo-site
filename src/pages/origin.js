import React from 'react';
import CoffeeDetail from "../components/coffee-detail";

export default class OriginPage extends React.Component {
  render() {
    return (
      <CoffeeDetail originId={this.props.params.originId}></CoffeeDetail>
    )
  }
}
