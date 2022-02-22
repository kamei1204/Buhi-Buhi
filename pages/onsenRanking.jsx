import React from 'react'
import { useState } from 'react'
// customHooksのimport
import useFetchData from "../src/hooks/useFetchData"

// styles
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

// component
import Result from "../components/Result"
import ItemSearch from '../components/ItemSearch';


const onsenRanking = () => {
    // custom hookでreturnされたobjectのvalue
    const {error, setError, loading, result, handleSubmit} = useFetchData();
    // customHookに渡すstate
    const [value, setValue] = useState({
        freeWord: '',
    });

    // 検索フィールドの監視
    const handleFreeWord = (e) => {
        // 文字が入ってきたらstateを初期化
        setError({
            freeWord: false,
        });
        // 入力文字を{ freeWord: '' }の形でstateで管理
        setValue({ [e.target.name]: e.target.value});
    };

    return (
        <>
            <ItemSearch 
                value={value}
                error={error}
                handleFreeWord={handleFreeWord}
                handleSubmit={handleSubmit}
            />
            <Grid
                container
                direction='row'
                justifyContent='center'
                alignItems='center'
            >
                {/* フェッチ中はローディングがクルクルする */}
                {loading ? (
                <Box m={10}>
                    <CircularProgress />
                </Box>
                ) : (
                // フェッチが完了したらレスポンスデータを表示
                <Result result={result} />
                )}
            </Grid>
        </>
    )
}

export default onsenRanking