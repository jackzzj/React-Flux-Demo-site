import React from 'react';
import OriginStore from "../stores/origin-store";
import * as OriginActions from "../actions/origin-actions";

export default class OriginDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: {}
    };

    OriginActions.loadOriginDetail(this.props.originId);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    OriginStore.addChangeListener(this._onChange);
    //this._getCoffeeDataIfNeeded(this.props);
  }

  componentWillUnmount() {
    OriginStore.removeChangeListener(this._onChange);
  }

  componentWillReceiveProps(nextProps) {
    this._getCoffeeDataIfNeeded(this.props, nextProps);
  }

  _onChange() {
    const origin = OriginStore.getOriginDetail();
    this.setState({origin: origin});
  }

  _getCoffeeDataIfNeeded(currentProps, nextProps) {
    if(this.props.originId !== nextProps.originId) {
      OriginActions.loadOriginDetail(nextProps.originId);
    }
  }

  render() {
    const {origin} = this.state;
    if (origin) {
      return (
        <div id="origin-detail" className="container">
          <div id="origin-detail-info" className="row col-sm-12 well">
            <h2 className="text-left">{origin.name}</h2>
            <p className="text-left">{origin.description}</p>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
