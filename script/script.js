import {authorization} from './modules/control.js';

{
  const init = () => {
    authorization();
  };

  window.todoAppInit = init;
}
