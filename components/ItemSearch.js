import React from 'react'

// style

import { Box } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'

const FREE_WORD = "フリーワード";
const ERROR_FREE_WORD = "フリーワードを入力してください";

const ItemSearch = ({ value, error, handleFreeWord, handleSubmit}) => {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete='off'
        >
            <TextField 
                id='freeWord'
                label={FREE_WORD}
                variant='outlined'
                name='freeWord'
                value={value.freeWord}
                onChange={handleFreeWord}
                error={error.freeWord && true}
                helperText={error.freeWord && ERROR_FREE_WORD}
            />
            <br></br>
            <Button
                variant='outlined' onClick={() => handleSubmit(value)}
            >
                Submit
            </Button>
        </Box>
    );
};

export default ItemSearch