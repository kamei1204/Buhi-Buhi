import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookie from 'universal-cookie';
import React from 'react';


const cookie = new Cookie();

function LoginLayout() {
    // 関数内からページ遷移をしたい場合に使用できる
    const router = useRouter();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    // ログインモードとレジスターモード示すための
    const [isLogin, setIsLogin] = useState(true);

    const login = async () => {
        // このfetchの一連の処理をtry & catchで例外の処理をする。
        // この場合400番に当たった場合throwによってalertとして表示される
        try {
        await fetch(
            // await.fetchで環境変数のherokuのURL＋エンドポイントを足したものを取りに行く
            `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/auth/jwt/create/`,
            {
                method: "Post",
                // postmanでusernameとpasswordをPOSTメソッドで上記エンドポイントに渡すことで、レスポンスとしてアクセストークンを取得することができる
                body: JSON.stringify({username: username, password: password}),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        // レスポンスが帰ってきた時
        .then((res) => {
            // もしステータスが400番(つまりエラーが出た場合にはした記載を投げる)
            if(res.status === 400) {
                throw "authentication failed";
                // okの場合レスポンスをjson形式で変換して返却する
            } else if (res.ok) {
                return res.json();
            }
        })
        // この時取得したアクセストークンキーをクッキーに設定していく
        .then((data) => {
            const options = { path: "/" };
            // data.accessはアクセストークンの値を渡したもの access_tokenの箇所は自由に名前づけ可能 option
            // は上記path以降でcookieを使用できるようになる
            cookie.set("access_token", data.access, options);
        });
        // 成功した場合routerによって飛ぶようになる
        router.push("/Blog");
    } catch(err) {
        alert(err);
        }
    ;}
    
    // フォームでサブミットボタンが押された時の処理
    const authUser = async (e) => {
        // ボタンが押された時デフォルトでブラウザがリロードするためpreventDefaultでノーリロードにする
        e.preventDefault();
        if(isLogin) {
            // isLogin関数がTRUEだった場合
            login();
            // FALSEの場合
        } else {
            // registerモードの移行して新規作成を行う
            try {
            await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/register/`,{
                method: "Post",
                body: JSON.stringify({username: username, password: password}),
                headers: {"Content-Type": "application/json",
            },
            })
            .then((res) => {
                if(res.status === 400 ) {
                    throw "authentication failed";
                }
            });
            // 成功した場合loginを実行
            login();
        } catch(err) {
            alert(err);
        }
        }
    };

    // return (
    //     <div class="w-full max-w-xs py-40 min-h-full ml-auto mr-auto">
    //         <div>
    //             <h2 className="mt-6 text-center font-bold text-2xl text-white">
    //                 {/* registerモードかloginモードかに応じてテキストを変更する */}
    //                 { isLogin ? "login" : "sign-up"}
    //             </h2>
    //         </div>
    //         <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={authUser}>
    //         <div className="mb-4">
    //             <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
    //                 Username
    //             </label>
    //             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
    //                 name="username" type="text" placeholder="Username" autoComplete="username" 
    //                 value={username} onClick={(e) => {
    //                     setUserName(e.target.value);
    //                 }}/>
    //         </div>
    //         <div className="mb-6">
    //             <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
    //                 Password
    //             </label>
    //             <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
    //                 name="password" type="password" placeholder="******************"
    //                 value={password} onChange={(e) => {
    //                     setPassword(e.target.value);
    //                 }}
    //             />
    //             <p className="text-red-500 text-xs italic">Please choose a password.</p>
    //         </div>
    //         <div className="flex items-center justify-between">
    //             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
    //                 type="submit">
    //                     {isLogin ? "login JWT" : "create new user"}
    //             </button>
    //             <a onChange={() => setIsLogin(!isLogin)} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
    //                 change mode?
    //             </a>
    //         </div>
    //             </form>
    //             <p className="text-center text-gray-500 text-xs">
    //                 &copy;2020 Acme Corp. All rights reserved.
    //             </p>
    //     </div>
    // );}
    return (
            <div className="max-w-md w-full space-y-8 mr-auto ml-auto mt-40">
            <div>
                <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                {isLogin ? "Login" : "Sign up"}
                </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={authUser}>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <input
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    />
                </div>
                <div>
                    <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    />
                </div>
                </div>
        
                <div className="flex items-center justify-center">
                <div className="text-sm">
                    <span
                    onClick={() => setIsLogin(!isLogin)}
                    className="cursor-pointer font-medium text-white hover:text-indigo-500"
                    >
                    change mode ?
                    </span>
                </div>
                </div>
        
                <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </span>
                    {isLogin ? "Login with JWT" : "Create new user"}
                </button>
                </div>
            </form>
            </div>
        );
    }
    export default LoginLayout;