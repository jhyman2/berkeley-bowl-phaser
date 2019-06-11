import { createStore } from 'redux';
import ui from 'state/ui/reducer';

const store = createStore(ui);

export default store;
