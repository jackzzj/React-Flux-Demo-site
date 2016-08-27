import jQuery from 'jquery';
import Dispatcher from '../dispatcher';

export function loadOrigin() {
  Dispatcher.dispatch({
    type: "FETCH_ORIGIN"
  });

  let originUrl = '/api/origin';

  jQuery.ajax({
    method: 'GET',
    url: originUrl,
    success: (origins) => {
      Dispatcher.dispatch({
        type: "RECEIVE_ORIGIN",
        origins
      });
    },
    error: (error) => {
      Dispatcher.dispatch({
        type: "RECEIVE_ORIGIN_ERROR",
        error
      });
    }
  });
}

export function loadOriginDetail(originId) {
  Dispatcher.dispatch({
    type: "FETCH_ORIGIN"
  });

  let originUrl = '/api/origin';
  originUrl = '/api/origin/' + originId;

  jQuery.ajax({
    method: 'GET',
    url: originUrl,
    success: (origin) => {
      Dispatcher.dispatch({
        type: "RECEIVE_SELECTED_ORIGIN",
        origin
      });
    },
    error: (error) => {
      Dispatcher.dispatch({
        type: "RECEIVE_SELECTED_ORIGIN_ERROR",
        error
      });
    }
  });
}
