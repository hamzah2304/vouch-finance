import { Box, Button, css, Grid, Skeleton, useTheme } from '@mui/material'

import React from 'react'
import { Background } from '../../../components/Background'

export function VouchTable(): React.ReactElement {
    return(
        <>
        <p>Hello World!</p>
        <table>
            <tr>
                <th>User address</th>
                <th>Loan status</th>
                <th>Loan start date</th>
                <th>Loan expiry date</th>
            </tr>
        </table>
        </>
    )
}