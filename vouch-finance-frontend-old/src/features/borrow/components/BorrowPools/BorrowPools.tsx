import { Box, css } from '@mui/material'
import React from 'react'
import { Background } from '../../../../components/Background'

import { POOL_NAME, POOL_TYPE, PoolMap } from '../../../../utils/pool'
import { BorrowCreditLinePool } from './BorrowCreditLinePool'

import { Score } from '../../../score/components/Score'

export function BorrowPools(): React.ReactElement {
  const creditLinePoolNames = Object.keys(
    PoolMap[POOL_TYPE.CreditLine],
  ) as POOL_NAME[]

  const styles = {
    wrapper: css`
      position: relative;
      padding-bottom: 260px;
      max-width: 1307px;
      margin: 0 auto;
    `,
    poolWrapper: css`
      position: relative;
      margin-bottom: 40px;
      z-index: 1;
    `,
  }

  return (
    <Box css={styles.wrapper}>
      {/* <Box css={styles.poolWrapper}>
        <Score />
      </Box> */}
      {creditLinePoolNames.map((creditLinePoolName) => (
        <Box css={styles.poolWrapper} key={creditLinePoolName}>
          <BorrowCreditLinePool
            poolName={creditLinePoolName}
            key={creditLinePoolName}
          />
        </Box>
      ))}
      <Background />
    </Box>
  )
}
