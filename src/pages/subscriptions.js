import React from 'react';
import ReactDOM from 'react-dom';
import SubscriptionStore from "../stores/subscription-store";
import * as SubscriptionActions from "../actions/subscription-actions";
import SubscriptionList from "../components/subscription-list";
import CoffeeStore from "../stores/coffee-store";
import * as CoffeeActions from "../actions/coffee-actions";
import ClassNames from 'classnames';

export default class SubscriptionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      emailHasError: false,
      nameHasError: false,
      addHasError: false,
      phoneHasError: false,
      emailHasSuccess: false,
      nameHasSuccess: false,
      addHasSuccess: false,
      phoneHasSuccess: false,
      hideCompleteWarning: true,
      coffees: [],
      subscription: {
        name: {},
        address: {},
        phone: {},
        email: {},
        quantity: {},
        months: {}
      },
      subscribeStatus: "Subscribe"
    };
    const coffeeId = this.props.params.coffeeId;
    if (coffeeId != 0) {
      CoffeeActions.loadCoffee({coffeeId: coffeeId});
    }
    this._onCoffeeChange = this._onCoffeeChange.bind(this);
    this._onSubscriptionChange = this._onSubscriptionChange.bind(this);
    this._handleShowMore = this._handleShowMore.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleSubscribe = this._handleSubscribe.bind(this);
  }
  componentDidMount() {
    CoffeeStore.addChangeListener(this._onCoffeeChange);
    SubscriptionStore.addAddedListener(this._onSubscriptionChange);
  }

  componentWillUnmount() {
    CoffeeStore.removeChangeListener(this._onCoffeeChange);
    SubscriptionStore.removeAddedListener(this._onSubscriptionChange);
  }

  _onCoffeeChange() {
    const coffees = CoffeeStore.getAll();
    this.setState({coffees: coffees});
  }

  _onSubscriptionChange() {
    if(document.getElementById("subscription-form") !== null) {
      document.getElementById("subscription-form").reset();
    }
    this.setState({
      subscribeStatus: "Subscribe",
      emailHasError: false,
      nameHasError: false,
      addHasError: false,
      phoneHasError: false,
      emailHasSuccess: false,
      nameHasSuccess: false,
      addHasSuccess: false,
      phoneHasSuccess: false,
      hideCompleteWarning: true
    });
  }

  render() {
    const coffeeId = this.props.params.coffeeId;
    const coffees = this.state.coffees;
    if (coffeeId != 0) {
      if (coffees.length != 0) {
        return (
          <div id="subscription-page" className="container">
            <form id="subscription-form" className="form-horizontal">
              <div className="form-group">
                <label htmlFor="inputCoffee" className="col-sm-3 control-label">Selected Coffee</label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" id="inputCoffee" value={coffees[0].name} readOnly/>
                </div>
              </div>
              <div className={ClassNames({
                  "form-group": true,
                  "has-error": this.state.nameHasError,
                  "has-success": this.state.nameHasSuccess
                })}>
                <label htmlFor="inputName" className="col-sm-3 control-label">Name</label>
                <div className="col-sm-7">
                  <input ref={(input) => this.state.subscription.name = input} onChange={this._handleChange} type="text" className="form-control" id="inputName" placeholder="Name"/>
                </div>
              </div>
              <div className={ClassNames({
                  "form-group": true,
                  "has-error": this.state.addHasError,
                  "has-success": this.state.addHasSuccess
                })}>
                <label htmlFor="inputAddress" className="col-sm-3 control-label">Shipping Address</label>
                <div className="col-sm-7">
                  <input ref={(input) => this.state.subscription.address = input} onChange={this._handleChange} type="text" className="form-control" id="inputAddress" placeholder="Shipping Address"/>
                </div>
              </div>
              <div className={ClassNames({
                  "form-group": true,
                  "has-error": this.state.phoneHasError,
                  "has-success": this.state.phoneHasSuccess
                })}>
                <label htmlFor="inputPhone" className="col-sm-3 control-label">Phone Numer</label>
                <div className="col-sm-7">
                  <input ref={(input) => this.state.subscription.phone = input} onChange={this._handleChange} type="text" className="form-control" id="inputPhone" placeholder="Phone Number"/>
                </div>
              </div>
              <div className={ClassNames({
                  "form-group": true,
                  "has-error": this.state.emailHasError,
                  "has-success": this.state.emailHasSuccess
                })}>
                <label htmlFor="inputEmail" className="col-sm-3 control-label">Email</label>
                <div className="col-sm-7">
                  <input ref={(input) => this.state.subscription.email = input} onChange={this._handleChange} type="email" className="form-control" id="inputEmail" placeholder="Email"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputQuantity" className="col-sm-3 control-label">Quantity per Month</label>
                <div className="col-sm-7">
                  <select ref={(input) => this.state.subscription.quantity = input} className="form-control" id="inputQuantity">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputMonths" className="col-sm-3 control-label">Months</label>
                <div className="col-sm-7">
                  <select ref={(input) => this.state.subscription.months = input} className="form-control" id="inputMonths">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>6</option>
                    <option>12</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-7">
                  <button aria-describedby="helpBlock" type="submit" className="btn btn-primary" onClick={this._handleSubscribe}>{this.state.subscribeStatus}</button>
                  <span id="helpBlock" className={ClassNames({
                      "helpBlock": true,
                      "hidden": this.state.hideCompleteWarning
                    })}> Please fill in each field.</span>
              </div>
              </div>
            </form>
            <div id="showmore" className={ClassNames({
                "container": true,
                "text-center": true,
                "hidden": this.state.hidden
              })}><a href="#" onClick={this._handleShowMore}>Show More Subscriptions</a></div>
            <div id="show-more-subscription"></div>
          </div>
        );
      } else {
        return <div>Loading...</div>;
      }
    } else {
      return (
        <SubscriptionList></SubscriptionList>
      );
    }
  }

  _handleSubscribe(event) {
    event.preventDefault();
    if(this.state.emailHasSuccess && this.state.nameHasSuccess && this.state.addHasSuccess && this.state.phoneHasSuccess) {
      let newSubscription = {};
      newSubscription.userName = this.state.subscription.name.value;
      newSubscription.coffeeId = parseInt(this.state.coffees[0].id);
      newSubscription.email = this.state.subscription.email.value;
      newSubscription.phone = this.state.subscription.phone.value;
      newSubscription.startDate = new Date().toJSON();
      newSubscription.quantityPerMonth = this.state.subscription.quantity.value;
      newSubscription.months = this.state.subscription.months.value;
      SubscriptionActions.addSubscription(newSubscription);
      this.setState({hideCompleteWarning: true, subscribeStatus: "Submitting..."});
    }
    else {
      this.setState({hideCompleteWarning: false});
    }
  }

  _handleShowMore(event) {
    event.preventDefault();
    this.setState({hidden: true});
    ReactDOM.render(<SubscriptionList></SubscriptionList>, document.getElementById("show-more-subscription"));
  }

  _handleChange(event) {
    const target = event.target;
    if(this._notEmpty(target.value)) {
      switch(target.id) {
        case "inputName": {
          this.setState({nameHasError: false, nameHasSuccess: true});
        }
        break;
        case "inputAddress": {
          this.setState({addHasError: false, addHasSuccess: true});
        }
        break;
        case "inputPhone": {
          if(this._validatePhone(target.value)) {
            this.setState({phoneHasError: false, phoneHasSuccess: true});
          }else {
            this.setState({phoneHasError: true, phoneHasSuccess: false});
          }
        }
        break;
        case "inputEmail": {
          if(this._validateEmail(target.value)) {
            this.setState({emailHasError: false, emailHasSuccess: true});
          }else {
            this.setState({emailHasError: true, emailHasSuccess: false});
          }
        }
        break;
      }
    }else {
      switch(target.id) {
        case "inputName": {
          this.setState({nameHasError: true, nameHasSuccess: false});
        }
        break;
        case "inputAddress": {
          this.setState({addHasError: true, addHasSuccess: false});
        }
        break;
        case "inputPhone": {
          this.setState({phoneHasError: true, phoneHasSuccess: false});
        }
        break;
        case "inputEmail": {
          this.setState({emailHasError: true, emailHasSuccess: false});
        }
        break;
      }
    }
  }

  _notEmpty(ans) {
    return ans.length != 0;
  }

  _validateEmail(email) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  _validatePhone(phone) {
    let regex = /^\d{10}$/;
    return regex.test(phone);
  }
}
