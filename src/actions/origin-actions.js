import jQuery from 'jquery';
import Dispatcher from '../dispatcher';

// export function getCoffee(coffeeId) {
//   Dispatcher.dispatch({
//     type: "GET_COFFEE",
//     coffeeId
//   });
// }

export function loadOrigin(originId) {
  Dispatcher.dispatch({
    type: "FETCH_ORIGIN"
  });

  let originUrl = '/api/origin';
  if (originId === undefined) {
    originUrl = '/api/origin';
  } else {
    originUrl = '/api/origin/' + originId;
  }

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
