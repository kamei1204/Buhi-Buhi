// 非同期の関数も作っていくためcreateAsyncThunkを使う
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
// TS_typesで作ったデータ型をimport
import { PROPS_AUTHEN, PROPS_PROFILE, PROPS_NICKNAME} from "../types";
// django_api_endpointを定数で定義する場合、urlをnext.jsの環境変数に入れる
// process.env.環境変数名を書くことでURLを取得できる ブラウザ側でも見れるようNEXT_PUBLICを忘れずに 
const apiUrl = process.env.NEXT_PUBLIC_RESTAPI_URL;

// 非同期の処理は関数の外に書くのが決まり
export const fetchAsyncLogin = createAsyncThunk(
    // 下の文字列がactionの名前になる(好きな名前)
    "auth/post",
    // async/awaitで非同期系を同期系に変えている
    // authenにPROPS_AUTHENからemailとpasswordを引き受けてaxiosの第二引数に渡す
    async (authen: PROPS_AUTHEN) => {
        // 下記載でポストマンのようにアクセストークンが帰ってくるのでresに格納する
        const res = await axios.post(`${apiUrl}authen/jwt/create/`, authen, {
            // axiosのpostメソッドの場合 headersに"Content-Type": "application/json",を指定する必要がある
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    }
);
// ログイン成功時の後処理としては、reactのローカルストレージに格納して、その後のapi処理の際にローカルストレージから取得したアクセストークンを使用してviewを見れるようになる

// 新規ユーザーを作る非同期の関数
export const fetchAsyncRegister = createAsyncThunk(
    "auth/register",
    async (auth: PROPS_AUTHEN) => {
        // 新規で作ったユーザーの情報(data)をresに入れて返す
        const res = await axios.post(`${apiUrl}buhi_api/register/`, auth, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    }
);

// profileを新規で作成する非同期の関数
export const fetchAsyncCreateProfile = createAsyncThunk(
    "profile/post",
    async (nickname: PROPS_NICKNAME) => {
        const res = await axios.post(`${apiUrl}buhi_api/profile/`, nickname, {
            headers: {
                "Content-Type": "application/json",
                // `JWT ${localStorage.localJWT}`でtokenの内容を取ってくる
                Authorization: `JWT ${localStorage.localJWT}`,
            },
        });
        return res.data;
    }
);

// profileを更新する非同期関数
export const fetchAsyncUpdateProfile = createAsyncThunk(
    "profile/put",
    async (profile: PROPS_PROFILE) => {
        // 新しくFormDataを作成し、uploadDataに格納
        const uploadData = new FormData();
        // appendでuploadDataに追加していく
        uploadData.append("nickname", profile.nickname);
        // 渡されたdataにimgが含まれる場合のみappendで追加していく
        profile.img && uploadData.append("img", profile.img, profile.img.name);
        // 更新なのでaxiosのputメソッドを使って更新していく
        const res = await axios.put(
            // どのprofileの更新をするか判別するために末尾にidを付け足す
            `${apiUrl}buhi_api/profile/${profile.id}/`,
            uploadData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            }
        );
        return res.data;
    }
);

// ログインしているユーザー自身のprofileを取得する非同期関数
export const fetchAsyncGetMyProfile = createAsyncThunk(
    "profile/get", async () => {
        const res = await axios.get(`${apiUrl}buhi_api/myprofile/`, {
            headers: {
                Authorization: `JWT ${localStorage.localJWT}`,
            },
        });
        // 配列の1番目の要素を取り出したい
        // django側でfilterを使っているので中身が一つでも配列で帰ってくるので、returnのdataで配列指定する
        return res.data[0];
    }
);

// 存在するprofileの全てを取得する非同期関数
export const fetchAsyncGetProfiles = createAsyncThunk(
    "profiles/get", async () => {
        const res = await axios.get(`${apiUrl}buhi_api/profile/`, {
            headers: {
                Authorization: `JWT ${localStorage.localJWT}`,
            },
        });
        return res.data;
    }
);


export const authSlice = createSlice({
    name: "auth",
    // modalの取り扱いによってTRUEとFALSEの使い分けをREDUXで管理したいのでinitial_stateに書いていく

    initialState: {
        // ログイン用のmodal ログインを促すためmodalをtrueとした
        openSignIn: true,
        // register用のmodal
        openSignUp: false,
        // profile用
        openProfile: false,
        // apiにアクセス中のloadingをTRUEの処理にする
        isLoadingAuth: false,
        // ログインしているユーザを管理する
        // バックエンドmodelsのprofileと紐づけた
        myProfile: {
            id: 0,
            nickname: "",
            userProfile: 0,
            created_on: "",
            img: "",
        },
        // profileのリスト 存在するprofileを格納保持をするため
        profiles: [ 
            {
                id: 0,
                nickname: "",
                userProfile: 0,
                created_on: "",
                img: "",
            },
        ],
    },
    reducers: {
        // fetchのstartとendの状態管理を行う
        fetchCredStart(state) {
            state.isLoadingAuth = true;
        },
        fetchCredEnd(state) {
            state.isLoadingAuth = false;
        },
        // dispatch経由で呼ばれた際の切り替え
        setOpenSignIn(state) {
            state.openSignIn = true;
        },
        resetOpenSignIn(state) {
            state.openSignIn = false;
        },

        // register用の表示.非表示の関数
        setOpenSignUp(state) {
            state.openSignUp = true;
        },
        resetOpenSignUp(state) {
            state.openSignUp = false;
        },
        // profileの編集用modalの表示.非表示の関数
        setOpenProfile(state) {
            state.openProfile = true;
        },
        resetOpenProfile(state) {
            state.openProfile = false;
        },
        // reactコンポーネントからユーザーが入力した文字列を(action)で受け取ってaction.payloadで内容にアクセスしてnickname属性に上書きする
        editNickName(state, action) {
            state.myProfile.nickname = action.payload;
        },
    },
// extraReducers(非同期関数の後処理)

// builderのaddCaseを使って非同期関数(fetchAsyncLoginが正常終了した時)localStorageにsetする
// action.payload(returnしたdata)を受け取れる
// JWTにはaccessとrefreshの二つの属性がある 今回はaccessを使用
extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
        localStorage.setItem("localJWT", action.payload.access);
    });
    // build.addCaseで追加していく
    builder.addCase(fetchAsyncCreateProfile.fulfilled, (state, action) =>{
        state.myProfile = action.payload;        
    }); 
    builder.addCase(fetchAsyncGetMyProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload;
    });
    builder.addCase(fetchAsyncGetProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload;
    });
    builder.addCase(fetchAsyncUpdateProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload;
    // SPA(シングルアプリケーション)を実現するために下三行
    state.profiles = state.profiles.map((profile) =>
        // 更新したprofileのidに一致する場合のみ更新後のデータに置き換える
        profile.id === action.payload.id ? action.payload : profile 
        );
    });
},
});
// 状態管理を定義したものをreactで使用するためexportする
export const { 
    fetchCredStart, 
    fetchCredEnd, 
    setOpenSignIn, 
    resetOpenSignIn, 
    setOpenSignUp, 
    resetOpenSignUp, 
    setOpenProfile, 
    resetOpenProfile, 
    editNickName,
} = authSlice.actions;

// authSliceのisLoadingAuthを返してくれる authはstoreのauthと一致する必要がある
// TypeScriptのRootStateは全部のstateをひとまとめにしたもの
export const selectIsLoadingAuth = (state: RootState) => state.auth.isLoadingAuth;
export const selectOpenSignIn = (state: RootState) => state.auth.openSignIn;
export const selectOpenSignUp = (state: RootState) => state.auth.openSignUp;
export const selectOpenProfile = (state: RootState) => state.auth.openProfile;
export const selectProfile = (state: RootState) => state.auth.myProfile;
export const selectProfiles = (state: RootState) => state.auth.profiles;

export default authSlice.reducer;


            