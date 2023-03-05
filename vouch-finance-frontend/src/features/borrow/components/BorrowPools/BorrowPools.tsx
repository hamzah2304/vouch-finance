import { Box, css } from '@mui/material'
import React from 'react'
import { Background } from '../../../../components/Background'

import { POOL_NAME, POOL_TYPE, PoolMap } from '../../../../utils/pool'
import { BorrowCreditLinePool } from './BorrowCreditLinePool'
import { PoolInfo } from '../../../../components/layout/PoolInfo'
import { useMQ } from '../../../../hooks/useMQ'
import { Score } from '../../../score/components/Score'

export function BorrowPools(): React.ReactElement {
  const { isLgSize, isBelowXsSize, isSmSize, isMdSize, isXsSize } = useMQ()

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
    boxWrapper: css`
      width: 100%;
      max-width: 1307px;
      margin: 0 auto;
      padding: ${isBelowXsSize ? 24 : 48}px;
      background: linear-gradient(180deg, #ffffff 0%, #ffffff 100%);
      border: 1px solid #ffffff;
      border-radius: 24px;
    `,
    title: css`
      font-family: 'Uni-Neue-Regular';
      font-size: ${isLgSize ? 32 : 26}px;
      color: #6b6572;
      margin-bottom: 15px;
    `,
    description: css`
      font-family: 'Uni-Neue-Regular';
      font-size: 16px;
      letter-spacing: 0.15px;
      color: #6b6572;
    `,
  }

  // HARDCODING FOR DEMO PURPOSES
  const score = 600
  const vouched = true

  if (!score) {
    return (
      <Box css={styles.wrapper}>
        <Box css={styles.poolWrapper}>
          <Score infoOneRow='true' />
        </Box>
        <Background />
      </Box>
    )
  }

  if (score < 650) {
    if (!vouched) {
      return (
        <Box css={styles.wrapper}>
          <Box css={styles.poolWrapper}>
            <Box css={styles.boxWrapper}>
              <Box css={styles.title}>Insufficient credit score</Box>
              <Box css={styles.description} marginBottom='47px'>
                You must be vouched for to access a credit line. Please direct
                another user to http://localhost:3000/#/vouch
              </Box>
            </Box>
          </Box>
          <Background />
        </Box>
      )
    }
    return (
      <Box css={styles.wrapper}>
        <Box css={styles.poolWrapper}>
          <Box css={styles.boxWrapper}>
            <Box css={styles.title}>Someone has vouched for you!</Box>
            <Box css={styles.description} marginBottom='47px'>
              Congratulations! Click "check credit line" below to see the terms
              of your loan. Your staker will be notified of their collateral
              payment once you have confirmed the terms.
            </Box>
          </Box>
        </Box>
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

  return (
    <Box css={styles.wrapper}>
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
