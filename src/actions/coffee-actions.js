import jQuery from 'jquery';
import Dispatcher from '../dispatcher';

// export function getCoffee(coffeeId) {
//   Dispatcher.dispatch({
//     type: "GET_COFFEE",
//     coffeeId
//   });
// }

export function loadCoffee(coffeeOrigin) {
  Dispatcher.dispatch({
    type: "FETCH_COFFEE"
  });

  let coffeeUrl = '/api/coffee';
  if (coffeeOrigin === undefined) {// no params
    coffeeUrl = '/api/coffee';
  }else if(coffeeOrigin.coffeeId !== undefined && coffeeOrigin.originId === undefined) { //search by coffeeId
    coffeeUrl = '/api/coffee/' + coffeeOrigin.coffeeId;
  }else if(coffeeOrigin.coffeeId === undefined && coffeeOrigin.originId !== undefined) { //search by originId
    coffeeUrl = '/api/coffeeByOrigin/' + coffeeOrigin.originId;
  }

  jQuery.ajax({
    method: 'GET',
    url: coffeeUrl,
    success: (coffees) => {
      Dispatcher.dispatch({
        type: "RECEIVE_COFFEE",
        coffees
      });
    },
    error: (error) => {
      Dispatcher.dispatch({
        type: "RECEIVE_COFFEE_ERROR",
        error
      });
    }
  });
}

export function filterCoffeeBySearch(search) {
  Dispatcher.dispatch({
    type: "FILTER_COFFEE_SEARCH",
    search
  });
}

export function filterCoffeeByOriginId(originId) {
  Dispatcher.dispatch({
    type: "FILTER_COFFEE_ORIGIN",
    originId
  });
}
