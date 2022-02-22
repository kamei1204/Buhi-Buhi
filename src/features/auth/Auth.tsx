import React from 'react';
import { AppDisPatch } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../../styles/Auth.module.css";
import Modal from "react-modal";
import * as Yup from "yup";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import { Formik } from 'formik';

import {  
    // useSelect関係
    selectIsLoadingAuth,
    selectOpenSignIn,
    selectOpenSignUp,
    // Reducer関係
    setOpenSignIn,
    resetOpenSignIn,
    setOpenSignUp,
    resetOpenSignUp,
    // 非同期関数
    fetchCredStart,
    fetchCredEnd,
    fetchAsyncLogin,
    fetchAsyncRegister,
    fetchAsyncGetMyProfile,
    fetchAsyncGetProfiles,
    fetchAsyncCreateProfile,
} from "./authSlice";
import { fetchAsyncGetComment, fetchAsyncGetPosts } from '../post/postSlice';


// カスタムしたmodal
const customStyle = {
    overlay: {
        backgroundColor: "#777777",
    },
    content: {
        top: "55%",
        left: "50%",
    
        width: 380,
        height: 430,
        padding: "50px",
        // topとleftで指定した位置を戻す
        transform: "translate(-50%, -50%)",
    },
};


const Auth: React.FC = () => {
    // modalの設置 domのidを指定する必要があり 大本のindexの中のdocumentに記載されているidを書く
    Modal.setAppElement('#__next');
    // useSelectorでstore内のstateを参照しローカル変数に入れておく
    const openSignIn = useSelector(selectOpenSignIn); 
    const openSignUp = useSelector(selectOpenSignUp);
    const isLoadingAuth = useSelector(selectIsLoadingAuth);
    // dispatchの実態を作っておく
    const dispatch: AppDisPatch = useDispatch();


    return (
    <>
        {/* signUp用 */}
        <Modal 
            isOpen={openSignUp}
            // Modal以外のスペースがクリックされた時disPatchのアクションによりModalが非表示になる
            onRequestClose={async () => {
                await dispatch(resetOpenSignUp());
            }}
            // Modalのstyle
            style={customStyle}
        >
            <Formik
                // 初期状態でのエラーを定義することができる
                initialErrors={{ email: "required"}}
                initialValues={{ email: "", password: ""}}
                // このformでsubmitが押された時の処理を必ず書いていく
                onSubmit={async (values) => {
                    // start(true)ローディング開始
                    // dispatch=複数のプログラムを実行中のマルチタスクオペレーティングシステムにおいて、プログラムに実行権を渡すこと
                    // dispatchでどんどん処理をつないでいく
                    await dispatch(fetchCredStart());
                    // dispatch経由で新規ユーザーを作成しresultRegに格納
                    const resultReg = await dispatch(fetchAsyncRegister(values));
                    // resultRegとfulfilledがmatchした場合,成功とみなされたときemailとpasswordを使って下記載の関数が実行される(ログイン)
                    if (fetchAsyncRegister.fulfilled.match(resultReg)) {
                        // アクセストークンを取得
                        await dispatch(fetchAsyncLogin(values));
                        
                        await dispatch(fetchAsyncCreateProfile({ nickname: "anonymous"}));

                        await dispatch(fetchAsyncGetProfiles());
                        await dispatch(fetchAsyncGetPosts());
                        await dispatch(fetchAsyncGetComment());
                        await dispatch(fetchAsyncGetMyProfile());
                    }
                    await dispatch(fetchCredEnd());
                    // end (false)
                    // signUp画面に戻る
                    await dispatch(resetOpenSignUp());
                }}
                // FomikとYupの肝の部分
                // テンプレートになっていて,カスタムする部分はvalidationのパラメーター今回はemailとpassword
                // validationとは入力内容や記述内容が要件を満たしているか、妥当性を確認すること
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        // チェック事項を . で連結していく()内はエラーメッセージを自由に書く                       
                        .email("email format is wrong")
                        .required("email is must"),
                    password: Yup.string().required("password is must").min(4),
                })}

            >
                {({
                    // Formikの雛形
                    // Formikであらかじめ準備されているした記載をアロー関数の引数にとって実態を返す
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    isValid,
                }) => 
                    <div>
                        {/* submitは送信すること */}
                        <form onSubmit={handleSubmit}>
                            <div className={styles.auth_signUp}>
                                <h1 className={styles.auth_title}>SBS</h1>
                                <br />
                                <div className={styles.auth_progress}>
                                    {/* CircularProgress=material_icon load中の表示 */}
                                    {isLoadingAuth && <CircularProgress />}
                                </div>
                                <br />
                                { /*TextField=materialUi */}
                                <TextField 
                                    placeholder='email'
                                    type="input"
                                    name="email"
                                    // ユーザーがform内で文字に何らかの変更を加えた時にFomikのhandleChangeがvalidation(入力チェックを)をしてくれる
                                    onChange={handleChange}
                                    // handleBlurはfocusから外れた際に上記と同じ処理をしてくれる
                                    onBlur={handleBlur}
                                    // valueに現在の値が入っている中のemail
                                    value={values.email}                                
                                />
                                <br />
                                {/* エラーメッセージを表示 */}
                                {/* 論理式 この場合両方がtrueの場合、エラーを返す */}
                                {touched.email && errors.email ? (
                                    <div className={styles.auth_error}>{errors.email}</div>
                                ) : null}
                                
                                <TextField 
                                    placeholder='password'
                                    type="input"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}   
                                />
                                <br />
                                {touched.password && errors.password ? (
                                    <div className={styles.auth_error}>{errors.password}</div>
                                ) : null}
                                <br />
                                <br />
                                {/* Button=materialUi */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    // !isValidで入力されていない場合無効化する
                                    disabled={!isValid}
                                    type="submit"
                                >
                                    Register
                                </Button>
                                <br />
                                <br />
                                <span
                                    // モード切り替え
                                    className={styles.auth_text}
                                    onClick={async () => {
                                        await dispatch(setOpenSignIn());
                                        await dispatch(resetOpenSignUp());
                                    }}
                                >
                                    アカウントをお持ちですか？
                                </span>
                            </div>
                        </form>
                    </div>}
            </Formik>
            </Modal>   

            <Modal 
                isOpen={openSignIn}
                onRequestClose={async () => {
                    await dispatch(resetOpenSignIn());
                }}
                style={customStyle}
            >
                <Formik
                    initialErrors={{ email: "required" }}
                    initialValues={{ email: "", password: "" }}
                    onSubmit={async (values) => {
                        await dispatch(fetchCredStart());
                        const result = await dispatch(fetchAsyncLogin(values));
                        if (fetchAsyncLogin.fulfilled.match(result)) {
                            await dispatch(fetchAsyncGetProfiles());
                            await dispatch(fetchAsyncGetPosts());
                            await dispatch(fetchAsyncGetComment());
                            await dispatch(fetchAsyncGetMyProfile());
                        }
                        await dispatch(fetchCredEnd());
                        await dispatch(resetOpenSignIn());
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .email("email format is wrong")
                            .required("email is must"),
                        password: Yup.string().required("password is must").min(4),
                    })}                
                >
                    {({
                    // Formikの雛形
                    // Formikであらかじめ準備されているした記載をアロー関数の引数にとって実態を返す
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    isValid,
                    }) => (
                        <div>
                            {/* submitは送信すること */}
                            <form onSubmit={handleSubmit}>
                                <div className={styles.auth_signUp}>
                                    <h1 className={styles.auth_title}>SBS</h1>
                                    <br />
                                    <div className={styles.auth_progress}>
                                        {isLoadingAuth && <CircularProgress />}
                                    </div>
                                    <br />
                                    <TextField 
                                        placeholder='email'
                                        type="input"
                                        name="email"
                                        // ユーザーがform内で文字に何らかの変更を加えた時にFomikのhandleChangeがvalidation(入力チェックを)をしてくれる
                                        onChange={handleChange}
                                        // handleBlurはfocusから外れた際に上記と同じ処理をしてくれる
                                        onBlur={handleBlur}
                                        // valueに現在の値が入っている中のemail
                                        value={values.email}                                
                                    />
                                    {/* エラーメッセージを表示 */}
                                    {/* 論理式 この場合両方がtrueの場合、エラーを返す */}
                                    {touched.email && errors.email ? (
                                        <div className={styles.auth_error}>{errors.email}</div>
                                    ) : null}
                                    <br />
                                    
                                    <TextField 
                                        placeholder='password'
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}   
                                    />
                                    {touched.password && errors.password ? (
                                        <div className={styles.auth_error}>{errors.password}</div>
                                    ) : null}
                                    <br />
                                    <br />
                                    {/* Button=materialUi */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        // !isValidで入力されていない場合無効化する
                                        disabled={!isValid}
                                        type="submit"
                                    >
                                        Login
                                    </Button>
                                    <br />
                                    <br />
                                    <span
                                    // モード切り替え
                                    className={styles.auth_text}
                                    onClick={async () => {
                                        await dispatch(resetOpenSignIn());
                                        await dispatch(setOpenSignUp());
                                    }}
                                    >
                                        アカウントをお持ちですか？
                                    </span>
                                </div>
                            </form>
                        </div>
                    )}
                </Formik>
                
            </Modal> 
        </>
    )
};

export default Auth;


                                






