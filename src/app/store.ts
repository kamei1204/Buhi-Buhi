import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/post/postSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
// TypeScriptを使う場合dispatchに対しても型定義を行う必要がある
// TypeScriptのtypeofを使ってstore.dispatchを取得しAppDisPatchとゆうtypeに入れてexportしている
export type AppDisPatch = typeof store.dispatch;