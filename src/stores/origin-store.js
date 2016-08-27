import {EventEmitter} from 'events';
import Dispatcher from '../dispatcher';

const ORIGIN_CHANGE = "ORIGIN_CHANGE";

class OriginStore extends EventEmitter {
  constructor() {
    super();
    this.origins = [];
    this.selectedOrigin = {};
  }

  loadOrigin(origins) {
    this.origins = origins;
    this.emitChange();
  }

  loadOriginDetail(origin) {
    this.selectedOrigin = origin;
    this.emitChange();
  }

  getOriginDetail() {
    return this.selectedOrigin;
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
      case "RECEIVE_SELECTED_ORIGIN":
        {
          this.loadOriginDetail(action.origin);
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
