import Emitter from 'eventemitter3';

export enum Events {
  CLOSE_MODAL = 'close_modal',
  FORM_MODIFY = 'form_modify',
}

const emitter = new Emitter();

export const EventEmitter = {
  dispatch: (event: Events, data?: any) => {
    emitter.emit(event, data);
  },
  subscribe: (event: Events, callback: (data: any) => any) => {
    emitter.on(event, callback);
  },
  unsubscribe: (event: Events) => {
    emitter.off(event);
  },
};

export default Object.freeze(EventEmitter);
