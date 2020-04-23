import { Machine, send, assign } from 'xstate';

// Guards
const iftarMessageShown = (context, _event) => context.iftarMessageWasShown;
const iftarMessageNotShown = (context, _event) =>
  context.iftarMessageWasShown === false;

// Actions
const markIftarMessageAsShown = assign({ iftarMessageWasShown: () => true });
const resetIftarMessage = assign({ iftarMessageWasShown: () => false });

// 5mins
export const IFTAR_DURATION_IN_MS = 300000;

export default Machine({
  id: 'screen',
  initial: 'home',
  context: { iftarMessageWasShown: false },
  states: {
    home: {
      on: {
        OPEN_MENU: 'menu',
        IFTAR_STARTED: { target: 'iftar', cond: iftarMessageNotShown },
        RESET: { actions: resetIftarMessage, cond: iftarMessageShown }
      },
      // delay has to be longer than how long we want the iftar message to come after
      // fast is over
      entry: send('RESET', { delay: IFTAR_DURATION_IN_MS })
    },
    iftar: {
      on: {
        DISMISS: 'home'
      },
      after: {
        10000: 'home'
      },
      exit: markIftarMessageAsShown
    },
    menu: { on: { CLOSE_MENU: 'home' } },
    eid: {}
  },
  actions: {
    markIftarMessageAsShown,
    resetIftarMessage
  },
  guards: {
    iftarMessageShown,
    iftarMessageNotShown
  }
});
