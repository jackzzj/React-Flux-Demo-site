import React from 'react';
import SubscriptionStore from "../stores/subscription-store";
import * as SubscriptionActions from "../actions/subscription-actions";

export default class OriginList extends React.Component {
  constructor() {
    super();
    this.state = {
      subscriptions: []
    };
    SubscriptionActions.loadSubscription();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    SubscriptionStore.addChangeListener(this._onChange);
    SubscriptionStore.addAddedListener(this._onChange);
    //this._getCoffeeDataIfNeeded(this.props);
  }

  componentWillUnmount() {
    SubscriptionStore.removeChangeListener(this._onChange);
    SubscriptionStore.removeAddedListener(this._onChange);
  }

  _onChange() {
    const subscriptions = SubscriptionStore.getAll();
    this.setState({subscriptions: subscriptions});
  }

  render() {
    const {subscriptions} = this.state;
    if (subscriptions) {
      return (
        <div id="subscription-list" className="container">
          {subscriptions.map((subscription) => (
            <div>
              <div key={subscription.id} id="subscription-info" className="row col-sm-5">
                <div id="subscription-coffee" className="container col-sm-6">
                  <p className="text-left">{subscription.coffee.name}</p>
                  <img src={subscription.coffee.image[0]} className="img-responsive block-center"/>
                </div>
                <div id="subscription-user" className="container col-sm-6">
                  <p className="text-left">{subscription.userName}</p>
                  <p className="text-left">
                    <span className="label label-info">{subscription.quantityPerMonth} Bag(s) per month</span>
                  </p>
                  <p className="text-left">From {new Date(subscription.startDate).toString()}</p>
                </div>
              </div>
              {(subscription.id%2==0) ? <div className="clearfix"></div> : null}
            </div>

          ))}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

OriginList.proTypes = {
  origins: React.PropTypes.func.isRequired
}
