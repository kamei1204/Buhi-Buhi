import React from 'react'
import { useState } from 'react'
import styles from "../../../styles/Post.module.css"
// material 関連
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Divider, Checkbox } from '@material-ui/core'
import { Favorite, FavoriteBorder } from '@material-ui/icons'

import  AvatarGroup  from '@material-ui/lab/AvatarGroup'

import { useSelector, useDispatch } from 'react-redux'
import { AppDisPatch } from '../../app/store'
// selectProfilesをimportすることによってauthSliceの中のstateの一覧を参照できるようになる
import { selectProfiles } from '../auth/authSlice'

// postSlice
import { 
    selectComments,
    fetchPostStart,
    fetchPostEnd,
    fetchAsyncPostComment,
    fetchAsyncPatchLiked,
} from './postSlice';

import { PROPS_POST } from '../types'

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
}));

const Post: React.FC<PROPS_POST> = ({
    postId,
    loginId,
    userPost,
    title,
    imageUrl,
    liked,
}) => {
    // useStylesを使用するために定義する
    const classes = useStyles();
    const dispatch: AppDisPatch = useDispatch();
    const profiles = useSelector(selectProfiles);
    const comments = useSelector(selectComments);
    // textの状態を保持するため
    const [text, setText] = useState("");

    // selectorでreduxから受け取ったすべてのcommentsの中からpostIdが一致するものだけを取り出しcommentsPostに格納
    const commentsOnPost = comments.filter((com) => {
        return com.post === postId;
    });
    // profileの一覧から投稿したユーザーのprofileを抜き出す
    const prof = profiles.filter((prof) => {
        return prof.userProfile === userPost;
    });

    // postボタンが押された時に実行する関数
    // 引数にe(eventObjectを受け取って)preventDefaultでフォルダのリフレッシュを無効化する
    const postComment = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        // packetオブジェクトを作成しユーザーから受け取ったtextの内容と投稿のidを使って非同期関数を実行する
        const packet = { text: text, post: postId };
        await dispatch(fetchPostStart());
        // packetを引数にとってコメントを更新する
        await dispatch(fetchAsyncPostComment(packet));
        await dispatch(fetchPostEnd());
        setText("");
    };

    // いいねボタンが押された時に更新する関数
    const handlerLiked = async () => {
        // PROPSから受け取ったもの
        const packet = {
            id: postId,
            title: title,
            current: liked,
            new: loginId,
        };
        await dispatch(fetchPostStart());
        await dispatch(fetchAsyncPatchLiked(packet));
        await dispatch(fetchPostEnd());

    };
    // 投稿のtitleが存在する場合 ない場合はnullを返す
    if (title) {
        return (
        <div className={styles.post}>
            <div className={styles.post_header}>
                <Avatar className={styles.post_avatar} src={prof[0]?.img}/>
                <h3>{prof[0]?.nickname}</h3>
            </div>
            <img className={styles.post_image} src={imageUrl} alt="" />
            <h4 className={styles.post_text}>
                {/* お気に入りボタン */}
                <Checkbox 
                    className={styles.post_checkBox}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    // true.falseを設定する事で、いいねのチェックと解除ができる
                    // ログインしているユーザーと一致しているかを確認する
                    checked={liked.some((like) => like === loginId)}
                    onChange={handlerLiked}
                />
                <strong>{prof[0]?.nickname}</strong> {title}
                <AvatarGroup max={7}>
                    {/* likedに入っているユーザーのavatar画像を展開する */}
                    {liked.map((like) => (
                        <Avatar 
                            className={styles.post_avatarGroup}
                            key={like}
                            src={profiles.find((prof) => prof.userProfile === like)?.img}
                        />
                    ))}
                </AvatarGroup>
            </h4>
            {commentsOnPost.map((comment) => (
                <div key={comment.id} className={styles.post_comments}>
                    <Avatar
                        src={
                            // comment.userCommentにコメントを投稿したユーザーのIDが入っているので,
                            // そこからprofilesのprofと一致するものを探して(find)そこに入っているimgをsrcに使う
                            profiles.find((prof) => prof.userProfile === comment.userComment)?.img
                        }
                        className={classes.small}
                    />
                    <p>
                        <strong className={styles.post_strong}>
                            {
                                // 上記同様profileと一致するcommentを探し,見つかったprofileのnicknameをつける
                                profiles.find((prof) => prof.userProfile === comment.userComment)?.nickname
                            }
                        </strong>
                        {comment.text}
                    </p>
                </div>
            ))}
            <form className={styles.post_commentBox}>
                <input 
                    className={styles.post_input}
                    type="text"
                    placeholder='コメントを追加'
                    value={text}
                    // useStateで定義したsetText(更新関数)で投稿された際の書き換えを行う
                    onChange={(e) => setText(e.target.value)}
                />
                <button 
                    // 文字列が入っていない場合はボタンを押せないようdisabledをTrueにする
                    disabled={!text.length}
                    className={styles.post_button}
                    type='submit'
                    onClick={postComment}
                >
                    Post
                </button>
            </form>
        </div>
        );
    }
    return null;
};
    
    export default Post;

