import jQuery from 'jquery';
import Dispatcher from '../dispatcher';

export function loadSubscription() {
  Dispatcher.dispatch({
    type: "FETCH_SUBSCRIPTION"
  });

  let subscriptionUrl = '/api/subscription';

  jQuery.ajax({
    method: 'GET',
    url: subscriptionUrl,
    success: (subscriptions) => {
      Dispatcher.dispatch({
        type: "RECEIVE_SUBSCRIPTION",
        subscriptions
      });
    },
    error: (error) => {
      Dispatcher.dispatch({
        type: "RECEIVE_SUBSCRIPTION_ERROR",
        error
      });
    }
  });
}

export function addSubscription(subscription) {
  Dispatcher.dispatch({
    type: "SUBMIT_SUBSCRIPTION"
  });

  let subscriptionUrl = '/api/subscription';

  jQuery.ajax({
    method: 'POST',
    url: subscriptionUrl,
    data: subscription,
    success: (newSubscription) => {
      Dispatcher.dispatch({
        type: "ADDED_SUBSCRIPTION",
        newSubscription
      });
    },
    error: (error) => {
      Dispatcher.dispatch({
        type: "ADDED_SUBSCRIPTION_ERROR",
        error
      });
    }
  });
}
