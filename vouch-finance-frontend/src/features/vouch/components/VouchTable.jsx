import { Box, Button, css, Grid, Skeleton, useTheme } from '@mui/material'

import React from 'react'
import { Background } from '../../../components/Background'

export function VouchTable() {
  return (
    <table style={{ width: '900px' }}>
      <tr>
        <th>User address</th>
        <th>Loan status</th>
        <th>Loan start date</th>
        <th>Loan expiry date</th>
      </tr>
      <tr>
        <th>
          <span style={{ fontWeight: 'bold' }}>0x1d...89dA</span>
        </th>
        <th>
          <Button>
            <span style={{ fontWeight: 'bold' }}>Pay collateral</span>
          </Button>
        </th>
        <th>
          <span style={{ fontWeight: 'bold' }}>Pending...</span>
        </th>
        <th>
          <span style={{ fontWeight: 'bold' }}>Pending...</span>
        </th>
      </tr>
      <tr>
        <th>
          <span style={{ fontWeight: 'bold' }}>0xD2...8ik2</span>
        </th>
        <th>
          <Button>
            <span style={{ fontWeight: 'bold' }}>
              Withdraw collateral and yield
            </span>
          </Button>
        </th>
        <th>
          <span style={{ fontWeight: 'bold' }}>03/05/23</span>
        </th>
        <th>
          <span style={{ fontWeight: 'bold' }}>03/04/23</span>
        </th>
      </tr>
    </table>
  )
}
