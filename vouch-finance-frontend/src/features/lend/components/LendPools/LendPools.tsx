import { Box, css } from '@mui/material'
import React from 'react'
import { Background } from '../../../../components/Background'

import { POOL_NAME, POOL_TYPE, PoolMap } from '../../../../utils/pool'
import { LendCreditLinePool } from './LendCreditLinePool'
import { LowLendCreditLinePool } from './LowLendCreditLinePool'
import { HighLendCreditLinePool } from './HighLendCreditLinePool'

export function LendPools(): React.ReactElement {
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
      <Box css={styles.poolWrapper}>
        <HighLendCreditLinePool poolName={creditLinePoolNames[0]} />
      </Box>
      <Box css={styles.poolWrapper}>
        <LowLendCreditLinePool poolName={creditLinePoolNames[0]} />
      </Box>
      <Background />
    </Box>
  )
}
