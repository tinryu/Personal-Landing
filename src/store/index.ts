import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import reducer from './reducer';

//-----------------------|| REDUX - MAIN STORE ||-----------------------//

const store = createStore(reducer);
const persister = persistStore(store);

export { store, persister };
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
