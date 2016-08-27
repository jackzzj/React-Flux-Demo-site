import React from 'react';
import CoffeeDetail from "../components/coffee-detail";
import OriginDetail from "../components/origin-detail";

export default class OriginPage extends React.Component {
  render() {
    return (
      <div className="container">
        <OriginDetail originId={this.props.params.originId}></OriginDetail>
        <CoffeeDetail originId={this.props.params.originId}></CoffeeDetail>
      </div>

    )
  }
}
