import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
// TS_typesで作ったデータ型をimport
import { PROPS_NEWPOST, PROPS_LIKED, PROPS_COMMENT} from "../types";
import { title } from "process";
// django_api_endpointを定数で定義する場合、urlをnext.jsの環境変数に入れる
// process.env.環境変数名を書くことでURLを取得できる ブラウザ側でも見れるようNEXT_PUBLICを忘れずに 
const apiUrlPost = `${process.env.NEXT_PUBLIC_RESTAPI_URL}buhi_api/post/`;
const apiUrlComment = `${process.env.NEXT_PUBLIC_RESTAPI_URL}buhi_api/comment/`;

export const fetchAsyncGetPosts = createAsyncThunk("post/get", async () => {
    const res = await axios.get(apiUrlPost, {
        headers: {
            Authorization: `JWT ${localStorage.localJWT}`,
        },
    });
    return res.data;
});

export const fetchAsyncNewPost = createAsyncThunk(
    "post/post", async(newPost: PROPS_NEWPOST) => {
        const uploadData = new FormData();
        uploadData.append("title", newPost.title);
        newPost.img && uploadData.append("img", newPost.img, newPost.img.name);
        const res = await axios.post(apiUrlPost, uploadData, {
            headers: {
                "content-Type": "application/json",
                Authorization: `JWT ${localStorage.localJWT}`,
            },
        });
        return res.data;
    }
);

export const fetchAsyncPatchLiked = createAsyncThunk(
    "post/patch",
    async (liked: PROPS_LIKED) => {
        // 現在のいいねボタンが押された際の投稿の更新のデータを格納
        const currentLiked = liked.current;
        // new FormDataで新しい箱を作っておく
        const uploadData = new FormData();
        // isOverlapped=stateの管理(boolean)
        let isOverlapped = false;
        currentLiked.forEach((current) => {
            if(current === liked.new) {
                isOverlapped = true;
            } else {
                uploadData.append("liked", String(current));
            }
        });

        if (!isOverlapped) {
            // 新しいナンバーをたす
            uploadData.append("liked", String(liked.new));
        } else if (currentLiked.length === 1) {
            uploadData.append("title", liked.title);
            const res = await axios.put(`${apiUrlPost}${liked.id}/`, uploadData, {
                headers: {
                    "content-Type": "application/json",
                    Authorization: `JWT ${localStorage.localJWT}`,
                },
            });
            return res.data;
        }
        const res = await axios.patch(`${apiUrlPost}${liked.id}/`, uploadData, {
            headers: {
                "content-Type": "application/json",
                Authorization: `JWT ${localStorage.localJWT}`,
            },
        });
        return res.data;
    }
);

// getメソッドでコメントの一覧を取得する関数
export const fetchAsyncGetComment = createAsyncThunk(
    "comment/get",
    async () => {
        const res = await axios.get(apiUrlComment, {
            headers: {
                Authorization: `JWT ${localStorage.localJWT}`,
            }, 
        });
        return res.data;
    }
);

// コメント新規作成
export const fetchAsyncPostComment = createAsyncThunk(
    "comment/post",
    async (comment: PROPS_COMMENT) => {
        const res = await axios.post(apiUrlComment, comment, {
            headers: {
                Authorization: `JWT ${localStorage.localJWT}`,
            }, 
        });
        return res.data;
    }
)

export const postSlice = createSlice({
    name: "post",
    // modalの取り扱いによってTRUEとFALSEの使い分けをREDUXで管理したいのでinitial_stateに書いていく
    initialState: {
        isLoadingPost: false,
        // 新規投稿ようのModalの立ち上げ
        openNewPost: false,
        // djangoのposts,commentのmodelに対応するパラメータを配列でオブジェクトを定義
        posts: [
            {
                id: 0,
                title: "",
                userPost: 0,
                created_on: "",
                img: "",
                liked: [0],

            },
        ],
        comments: [
            {
                id: 0,
                text: "",
                userComment: 0,
                post: 0,
            },
        ],
    },
    reducers: {
        fetchPostStart(state) {
            state.isLoadingPost = true;
        },
        fetchPostEnd(state) {
            state.isLoadingPost = false;
        },
        setOpenNewPost(state) {
            state.openNewPost = true;
        },
        resetOpenNewPost(state) {
            state.openNewPost = false;
        },
    },
// extraReducers(非同期関数の後処理)

// builderのaddCaseを使って非同期関数(fetchAsyncLoginが正常終了した時)localStorageにsetする
// action.payload(returnしたdata)を受け取れる
// JWTにはaccessとrefreshの二つの属性がある 今回はaccessを使用
extraReducers: (builder) => {
    // 正常終了時postに格納
    builder.addCase(fetchAsyncGetPosts.fulfilled, (state, action) => {
        return {
            ...state,
            posts: action.payload,
        };
    });
    // 新規で投稿を作成して通常終了した場合
    builder.addCase(fetchAsyncNewPost.fulfilled, (state, action) => {
        return {
            ...state,
            // 既存のpostをスプレッド構文で展開して、一番最後の要素にたす処理
            posts: [...state.posts, action.payload],
        };
    }); 
    // コメントの一覧を取得した後にstoreのcommentsのstateに格納している
    builder.addCase(fetchAsyncGetComment.fulfilled, (state, action) => {
        return {
            ...state,
            comments: action.payload,
        };
    });
    // 新規でコメントを作った際の後処理
    builder.addCase(fetchAsyncPostComment.fulfilled, (state, action) => {
        return {
            ...state,
            // 既存のコメントをスプレッドで展開して、配列の一番最後の要素に追加する
            comments: [...state.comments, action.payload],
        };
    });
    builder.addCase(fetchAsyncPatchLiked.fulfilled, (state, action) => {
        return {
            ...state,
            posts: state.posts.map((post) =>
                // 更新したpostと一致する要素の部分だけを更新した要素に置き換える
                post.id === action.payload.id ? action.payload : post
            ),
        };
    });

},
});
// 状態管理を定義したものをreactで使用するためexportする
export const { 
    fetchPostStart,
    fetchPostEnd,
    setOpenNewPost,
    resetOpenNewPost,
} = postSlice.actions;


// TypeScriptのRootStateは全部のstateをひとまとめにしたもの
// useSelectorでstoreの中のstateを参照できるようにexportしておく
export const selectIsLoadingPost = (state: RootState) => state.post.isLoadingPost;
export const selectOpenNewPost = (state: RootState) => state.post.openNewPost;
export const selectPosts = (state: RootState) => state.post.posts;
export const selectComments = (state: RootState) => state.post.comments;

export default postSlice.reducer;



            

