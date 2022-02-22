import { useEffect } from 'react';
import Auth from '../src/features/auth/Auth';

import styles from '../styles/Core.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { AppDisPatch } from '../src/app/store';

import { withStyles } from '@material-ui/core/node_modules/@material-ui/styles';
import {
    Button,
    Grid,
    Avatar,
    Badge,
    CircularProgress,
} from "@material-ui/core";
// カメラマークのアイコン
import { MdAddAPhoto } from "react-icons/md";

import { 
    editNickName,
    selectProfile,
    selectIsLoadingAuth,
    setOpenSignIn,
    resetOpenSignIn,
    setOpenSignUp,
    resetOpenSignUp,
    setOpenProfile,
    resetOpenProfile,
    fetchAsyncGetMyProfile,
    fetchAsyncGetProfiles,
} from '../src/features/auth/authSlice';

import { 
    selectPosts,
    selectIsLoadingPost,
    setOpenNewPost,
    resetOpenNewPost,
    fetchAsyncGetPosts,
    fetchAsyncGetComment,
} from '../src/features/post/postSlice';
import Post from '../src/features/post/Post';
import EditProfile from '../src/features/core/EditProfile';
import NewPost from '../src/features/core/NewPost';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: "#44b700",
        color: "#44b700",
        // boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "$ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
        },
    }))(Badge);
    
    

const Core: React.FC = () => {
    // dispatchの実態の定義
    const dispatch: AppDisPatch = useDispatch();
    // useSelectorによりreduxStoreを参照できるようにする
    // 例えばselectProfileならAuthSliceのなかのmyProfileにあたる
    const profile = useSelector(selectProfile);
    const posts = useSelector(selectPosts);
    const isLoadingPost = useSelector(selectIsLoadingPost);
    const isLoadingAuth = useSelector(selectIsLoadingAuth);

    // ブラウザが起動した時の最初の処理として,useEffectを使用してした記載の処理を実行する
    useEffect(() => {
        const fetchBootLoader = async () => {
            // まずlocalStorageにlocalJWTが保存されているか確認しに行く
            if (localStorage.localJWT) {
                // defaultでOpenSignInが立ち上がるようにしているので、クローズしておく
                dispatch(resetOpenSignIn());
                // JWTがある場合fetchAsyncGetMyProfileで自分のprofileを取りに行く
                const result = await dispatch(fetchAsyncGetMyProfile());
                // もしJWTの認証期限が過ぎている場合rejectedのstate帰ってくるので、その場合はsetOpenSignInを開いて関数を何も実行せず抜けるようにしている
                if(fetchAsyncGetMyProfile.rejected.match(result)) {
                    dispatch(setOpenSignIn());
                    return null;
                }
                // fetchAsyncGetMyProfileが受け取れたら処理を継続する
                // 投稿の一覧
                await dispatch(fetchAsyncGetPosts());
                // profileの一覧
                await dispatch(fetchAsyncGetProfiles());
                // コメントの一覧
                await dispatch(fetchAsyncGetComment());
            }
        };
        fetchBootLoader();
    }, [dispatch]);

    return (
    <div>
        <Auth />
        <EditProfile />
        <NewPost />
        <div className={styles.core_header}>
            <h1 className={styles.core_title}>SBS</h1>
            {/* ? = この場合profileが存在するときにこの式を評価する */}
            {/* 存在する場合はnicknameを探しに行き存在すれば、フラグメントを実行.そうでなければ<div></div>を実行 */}
            {/* これでログインしているかどうかの識別が可能になる */}
            {profile?.nickname ? (
            <>
                {/* ログインが成功した場合 */}
                <button
                    className={styles.core_btnModel}
                    onClick={() => {
                        // 新規投稿用のModalの立ち上げ
                        dispatch(setOpenNewPost());
                        // 
                        dispatch(resetOpenProfile());
                    }}
                >
                    {/* reactアイコン */}
                    <MdAddAPhoto />
                </button>
                {/* ログアウト機能 */}
                <div className={styles.core_logout}>
                    {/* || はどちらかがTrueの場合~を実行する. */}
                    {(isLoadingPost || isLoadingAuth) && <CircularProgress />}
                    <Button 
                        onClick={() => {
                            // ボタンが押された時、removeItemで内容を削除
                            localStorage.removeItem("localJWT");
                            // nickNameが入っている場合""でブランクにする
                            dispatch(editNickName(""));
                            dispatch(resetOpenProfile());
                            dispatch(resetOpenNewPost());
                            dispatch(setOpenSignIn());
                        }}
                    >
                        Logout
                    </Button>
                    <button
                        className={styles.core_btnModel}
                        onClick={() => {
                            // ボタンが押された際,編集用のModalを開くようにする
                            dispatch(setOpenProfile());
                            // 仮に新規作成用のModalが開いていた場合はリセット
                            dispatch(resetOpenNewPost());
                        }}
                    >
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                            }}
                            variant="dot"
                        >
                            {/* ログインしているユーザーのprofileのimg属性をsrcにしている */}
                            <Avatar alt="who?" src={profile.img}/>{""}
                        </StyledBadge>
                    </button>
                </div>
            </>) : (
                // ログインをする前
                <div>
                    <Button
                        onClick={() => {
                            dispatch(setOpenSignIn());
                            dispatch(resetOpenSignUp());
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(setOpenSignUp());
                            dispatch(resetOpenSignIn());
                        }}
                    >
                        SignUp
                    </Button>
                </div>
            )}
        </div>

        {profile?.nickname && (
        <>
            <div
                className={styles.core_posts}>
                    <Grid container spacing={4}>
                        {/* postのstateをreduxStoreからuseSelectorで呼び出したのでpostsにapiから取得したすべての情報が入る */}
                        {posts
                            // 一番最後に投稿(最新)を左上の持ってきたいので.reverseを変換
                            .slice(0)
                            .reverse()
                            // mapメソッドで一つずつ取り出してPostコンポーネントに格納する
                            .map((post) => (
                                // material-uiのGrid
                                <Grid key={post.id} item xs={12} md={4}>
                                    <Post 
                                        // それぞれの属性をPropsで渡していく
                                        postId={post.id}
                                        title={post.title}
                                        loginId={profile.userProfile}
                                        userPost={post.userPost}
                                        // 投稿のimageを文字列で渡している
                                        imageUrl={post.img}
                                        liked={post.liked}
                                    />
                                </Grid>
                            ))}
                    </Grid>

            </div>
        </>
        )}
    </div>
    );
};

export default Core;

