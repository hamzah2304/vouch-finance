import { useSpectral } from '@spectral-finance/spectral-modal'
import React, { useState, useEffect } from 'react'
import { Box, Button, css, Grid, Skeleton, useTheme } from '@mui/material'
import { Background } from '../../../components/Background'
import { Score } from './Score'

export const ScoreSDK = () => {
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
        <Score />
      </Box>
      <Background />
    </Box>
  )
}
