import React from 'react'

// style

import { Card } from '@mui/material'
import { CardContent } from '@mui/material'
import { CardMedia } from '@mui/material'
import { Typography } from '@mui/material'
import { CardActionArea } from '@mui/material'
import { Grid } from '@mui/material'

// 商品名45文字目以降を...にする    
function convertSubString(string) {
    const name = string;
    if(name.length > 45) {
        // substring() メソッドは string オブジェクトの開始・終了位置の間、または文字列の最後までの部分集合を返します
        const splitName = name.substring(0, 45)
        return splitName + '...'
    } else {
        return name;
    }
}

const Result = ({ result }) => {
    return (
        <>
            <Grid container spacing={2}>
        {result?.Items?.length >= 1
            ? result.Items.map((item, index) => (
                <Grid item xs={2} key={index}>
                    <Card sx={{ maxWidth: 300, height: 320 }}>
                    <CardActionArea>
                        <CardMedia
                        component='img'
                        height='140'
                        image={item.Item.mediumImageUrls[0].imageUrl}
                        alt={item.Item.mediumImageUrls[0].imageUrl}
                        />
                        <CardContent>
                        <Typography gutterBottom variant='h6' component='div'>
                            {/* toLocaleString() メソッドは、言語に合わせた日時の文字列を返します。 */}
                            {item.Item.itemPrice.toLocaleString()}円
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            {convertSubString(item.Item.itemName)}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Card>
                </Grid>
                ))
            : null}
        </Grid>
        </>
    )
}

export default Result