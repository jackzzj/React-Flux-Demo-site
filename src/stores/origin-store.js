import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';

const ORIGIN_CHANGE = "ORIGIN_CHANGE";

class OriginStore extends EventEmitter {
  constructor() {
    super();
    this.origins = [];
  }

  loadOrigin(origins) {
    if (origins.constructor === Object) {
      this.origins.push(origins);
    } else {
      this.origins = origins;
    }
    this.emitChange();
  }

  getAll() {
    return this.origins;
  }

  emitChange() {
    this.emit(ORIGIN_CHANGE);
  }

  handleAction(action) {
    console.log(action.type);
    switch (action.type) {
      case "RECEIVE_ORIGIN":
        {
          this.loadOrigin(action.origins);
        }
        break;
    }
  }

  addChangeListener(callback) {
    this.on(ORIGIN_CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(ORIGIN_CHANGE, callback);
  }

}

const originStore = new OriginStore;
Dispatcher.register(originStore.handleAction.bind(originStore));

export default originStore;
