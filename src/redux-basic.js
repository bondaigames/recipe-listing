const redux = require("redux");
const createStore = redux.createStore;

const initialState = {
  counter: 0
};

//Reducer
const rootReducer = (state = initialState, action) => {
  return state;
};

//Store
const store = createStore(rootReducer);

//Subscription
store.subscribe(() => {
  console.log("[Subscription]", store.getState());
});

//Dispatching Action
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "ADD_COUNTER", value: 10 });
