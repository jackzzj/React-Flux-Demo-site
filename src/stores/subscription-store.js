import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';

const SUBSCRIPTION_CHANGE = "SUBSCRIPTION_CHANGE";
const SUBSCRIPTION_ADDED = "SUBSCRIPTION_ADDED";

class SubscriptionStore extends EventEmitter {
  constructor() {
    super();
    this.subscriptions = [];
  }

  loadSubscription(subscriptions) {
    this.subscriptions = subscriptions;
    this.emitChange();
  }

  addSubscription(subscription) {
    this.subscriptions.push(subscription);
    this.emitAdded();
  }

  getAll() {
    return this.subscriptions;
  }

  emitChange() {
    this.emit(SUBSCRIPTION_CHANGE);
  }

  emitAdded() {
    this.emit(SUBSCRIPTION_ADDED);
  }

  handleAction(action) {
    console.log(action.type);
    switch (action.type) {
      case "RECEIVE_SUBSCRIPTION":
        {
          this.loadSubscription(action.subscriptions);
        }
      break;
      case "ADDED_SUBSCRIPTION": {
        this.addSubscription(action.newSubscription);
      }
    }
  }

  addChangeListener(callback) {
    this.on(SUBSCRIPTION_CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(SUBSCRIPTION_CHANGE, callback);
  }

  addAddedListener(callback) {
    this.on(SUBSCRIPTION_ADDED, callback);
  }

  removeAddedListener(callback) {
    this.removeListener(SUBSCRIPTION_ADDED, callback);
  }
}

const subscriptionStore = new SubscriptionStore;
Dispatcher.register(subscriptionStore.handleAction.bind(subscriptionStore));

export default subscriptionStore;
