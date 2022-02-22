import React from 'react'
import { useState } from 'react'
import  Modal  from 'react-modal'

import { useDispatch, useSelector } from 'react-redux'
import { AppDisPatch } from '../../app/store'
import styles from "../../../styles/Core.module.css"
import { File } from '../types'

import { 
    editNickName,
    selectProfile,
    fetchCredStart,
    fetchCredEnd,
    fetchAsyncUpdateProfile,
    selectOpenProfile,
    resetOpenProfile,
} from '../auth/authSlice'

import { Button, TextField, IconButton } from "@material-ui/core";
import { MdAddAPhoto } from 'react-icons/md'

const customStyles = {
    content: {
        top: "55%",
        left: "50%",

        width: 280,
        height: 350,
        padding: "50px",

        transform: "translate(-50%, -50%)",
    },
};


const EditProfile: React.FC = () => {
    const dispatch: AppDisPatch = useDispatch();
    const openProfile = useSelector(selectOpenProfile);
    const profile = useSelector(selectProfile);
    const [image, setImage] = useState<File | null>(null);

    // Modalでアップデートのボタンが押された際に実行
    const updateProfile = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const packet = { id: profile.id, nickname: profile.nickname, img: image};

        await dispatch(fetchCredStart());
        await dispatch(fetchAsyncUpdateProfile(packet));
        await dispatch(fetchCredEnd());
        await dispatch(resetOpenProfile());
    }

    const handleEditPicture = () => {
        // Idを持ったDOM要素を取得しDOMに対しクリックを実行する
        // これによりアイコンをクリックしたら、inputの実態(file)を選択することができる
        const fileInput = document.getElementById("imageInput");
        fileInput?.click();
    }

    return( 
    <>
        <Modal
            isOpen={openProfile}
            // Modal以外の場所クリックした場合はresetOpenProfileでModalを閉じる
            onRequestClose={async () => {
                await dispatch(resetOpenProfile());
            }}
            style={customStyles}
        >
            <form className={styles.core_signUp}>
                <h1 className={styles.core_title}>SBS</h1>

                <br />
                <TextField 
                    placeholder="nickname"
                    type="text"
                    value={profile?.nickname}
                    onChange={(e) => dispatch(editNickName(e.target.value))}
                />

                <input 
                    type="file"
                    id='imageInput'
                    hidden={true}
                    onChange={(e) => setImage(e.target.files![0])}
                />
                <br />
                <IconButton onClick={handleEditPicture}>
                    <MdAddAPhoto />
                </IconButton>
                <br />
                <Button
                    // nicknameがからの時ボタンを無効化する
                    disabled={!profile?.nickname}
                    variant='contained'
                    color="primary"
                    type='submit'
                    onClick={updateProfile}
                >
                    Update
                </Button>
            </form>

        </Modal>
    </>
    )}

export default EditProfile
