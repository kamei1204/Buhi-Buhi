// ファイルオブジェクトに関するデータ型
export interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
}
// authSlice.ts
// 認証に関するデータ型
export interface PROPS_AUTHEN {
    email: string;
    password: string;
}

// profileに関するデータ型
export interface PROPS_PROFILE {
    id: number;
    nickname: string;
    // imgはない場合も考慮しユニオン型で定義しnullも許容する
    img: File | null;
}
// nicknameに関するデータ型
export interface PROPS_NICKNAME {
    nickname: string;
}
// authSlice.ts

// postSlice.ts
// 新規投稿時のデータ型
export interface PROPS_NEWPOST {
    title: string;
    img: File | null;
}
// いいねボタンが押された際の投稿の更新のデータ型
export interface PROPS_LIKED {
    id: number;
    title: string;
    current: number[];
    new: number;
}
// コメントを新規で作るときのデータ型
export interface PROPS_COMMENT {
    text: string;
    post: number;
}
// postSlice.ts

// Post.tsx

export interface PROPS_POST {
    postId: number;
    loginId: number;
    userPost: number;
    title: string;
    imageUrl: string;
    liked: number[];
}

