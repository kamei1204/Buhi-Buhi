import React from 'react'
import  Modal from 'react-modal'
import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'

import styles from "../../../styles/Core.module.css"

import { File } from '../types'

import { 
    selectOpenNewPost,
    resetOpenNewPost,
    fetchPostStart,
    fetchPostEnd,
    fetchAsyncNewPost,
} from '../post/postSlice'

import { Button, TextField, IconButton } from '@material-ui/core';
import  MdAddToPhoto, { MdAddAPhoto }  from 'react-icons/md'
import { AppDisPatch } from '../../app/store'

const customStyles = {
    content: {
        top: "55%",
        left: "50%",

        width: 200,
        height: 220,
        padding: "50px",

        transform: "translate(-50%, -50%)",
    }
}


const NewPost : React.FC = () => {

    const dispatch: AppDisPatch = useDispatch();
    const openNewPost = useSelector(selectOpenNewPost);

    const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState("");

    const handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput?.click();
    };

    const newPost = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        // オブジェクトの形で取得されたtitle,選択されたimageを割り当てておく
        const packet = { title: title, img: image };
        await dispatch(fetchPostStart());
        await dispatch(fetchAsyncNewPost(packet));
        await dispatch(fetchPostEnd())
        // 処理がうまう行ったら初期化を行う
        setTitle("");
        setImage(null);
        dispatch(resetOpenNewPost());
    };

    return (
        <>
            <Modal
                isOpen={openNewPost}
                onRequestClose={async () => {
                    await dispatch(resetOpenNewPost());
                }}
                style={customStyles}
            >
                <form className={styles.core_signUp}>
                    <h1 className={styles.core_title}>SBS</h1>

                    <br />
                    <TextField
                    placeholder="Please enter caption"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="file"
                        id="imageInput"
                        hidden={true}
                        onChange={(e) => setImage(e.target.files![0])}
                        />
                        <br />
                        <IconButton onClick={handleEditPicture}>
                            <MdAddAPhoto />
                        </IconButton>
                        <br />
                        <Button 
                            // 両方設定しないとボタンが押せない
                            disabled={!title || !image}
                            variant="contained"
                            color="primary"
                            onClick={newPost}
                        >
                            New post
                        </Button>
                </form>


            </Modal>
        </>
    )
}

export default NewPost
