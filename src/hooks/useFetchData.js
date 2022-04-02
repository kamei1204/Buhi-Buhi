import { useState } from "react";
import axios from "axios";


// 楽天APIエンドポイント
const BASE_URL ="https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&";

// エラーを管理するstate
const useFetchData = () => {
    const [error, setError] = useState({
        freeWord: false,
    });
    
    // loading
    const [loading, setLoading] = useState(false);
    
    // レスポンスの格納
    const [result, setResult] = useState({});
    
    // submitボタン押下
    const handleSubmit = (value) => {
        const params = value.freeWord;
    
    // params(value.freeWord)が入ってきたらloadingを開始
    if (params) {
        setLoading(true);
        
        const encodedParams = encodeFreeWord(params);
        
        // APIコール
        axios.get(
            `${BASE_URL}&keyword=${encodedParams}&page=1&applicationId=1070278709261281218`
            )
            .then((res) => {
                // レスポンスを格納
                setResult(res.data);
                // loading終了
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        } else {
            // nullの時はときはエラー
            console.log("検索条件を入力してください");
            setError({
                freeWord: true,
            });
            setLoading(false);
        }
    };
        
        // エンコードする関数
  // 日本語 => エンコードされる
  // ex) アイフォン => %E3%82%A2%E3%82%A4%E3%83%95%E3%82%A9%E3%83%B3
  // 英語 => そのまま
  // ex) iphone => iphone

const encodeFreeWord = (params) => {
    var urlEncode = require('urlencode');
    return urlEncode(params);
};

// レスポンスをデータ型で返す
return { error, setError, loading, result, handleSubmit };
};
export default useFetchData;


// axiosを使ってapiを叩く際にapplication_secretをクエリパラメータで渡す必要があるので、
// .envファイルとwebpack.config.jsファイルをルートディレクトリに作成します