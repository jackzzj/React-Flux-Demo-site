import {
  EventEmitter
} from 'events';
import Dispatcher from '../dispatcher';

const COFFEE_CHANGE = "COFFEE_CHANGE";

class CoffeeStore extends EventEmitter {
  constructor() {
    super();
    this.coffees = [];
    this.filteredCoffees = [];
    this.oldCollection = [];
  }

  loadCoffee(coffees) {
    if (coffees.constructor === Object) {
      this.coffees = []; //clear before pushing to prevent unwanted behaviour
      this.coffees.push(coffees);
    } else {
      this.coffees = coffees;
    }
    this.filteredCoffees = this.coffees; //make sure coffees equals filteredCoffees
    this.oldCollection = this.coffees;
    this.emitChange();
  }

  filterCoffeeBySearch(search) {
    const newCollection = [];
    search = search.toLowerCase();
    this.oldCollection.map((coffee) => {
      if(coffee.name.toLowerCase().indexOf(search) !== -1 ||
        coffee.description.toLowerCase().indexOf(search) !== -1 ||
        coffee.origin.name.toLowerCase().indexOf(search) !== -1) {
        newCollection.push(coffee);
      }
    });
    this.filteredCoffees = newCollection;
    this.emitChange();
  }

  filterCoffeeByOriginId(originId) {
    if (originId == 0) {
      this.filteredCoffees = this.coffees; //reset
    } else {
      this.filteredCoffees = this.coffees; //reset
      const newCollection = [];
      this.filteredCoffees.map((coffee) => {
        if (coffee.originId === originId) {
          newCollection.push(coffee);
        }
      });
      this.filteredCoffees = newCollection;
    }
    this.oldCollection = this.filteredCoffees; //save any filtered data generated by filteredByOrigin
    this.emitChange();
  }

  getAll() {
    return this.coffees;
  }

  getFiltered() {
    return this.filteredCoffees;
  }

  emitChange() {
    this.emit(COFFEE_CHANGE);
  }

  handleAction(action) {
    console.log(action.type);
    switch (action.type) {
      case "FILTER_COFFEE_SEARCH":
        {
          this.filterCoffeeBySearch(action.search);
        }
        break;
      case "FILTER_COFFEE_ORIGIN":
        {
          this.filterCoffeeByOriginId(action.originId);
        }
        break;
      case "RECEIVE_COFFEE":
        {
          this.loadCoffee(action.coffees);
        }
        break;
    }
  }

  addChangeListener(callback) {
    this.on(COFFEE_CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(COFFEE_CHANGE, callback);
  }

}

const coffeeStore = new CoffeeStore;
Dispatcher.register(coffeeStore.handleAction.bind(coffeeStore));

export default coffeeStore;
