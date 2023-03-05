import { Box, Button, css, Grid, Skeleton, useTheme } from '@mui/material'
import { useSpectral } from '@spectral-finance/spectral-modal'

import React, { useState, useEffect } from 'react'
import { Background } from '../../../components/Background'
import { VouchForm } from './VouchForm'
import { VouchTable } from './VouchTable'
import { ScoreSDK } from '../../score/components/ScoreSDK'
import { Score } from '../../score/components/Score'

export function Vouch() {
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

  // const { start, score } = useSpectral()
  // const [myScore, setMyScore] = useState()

  // function scoreRequired() {
  //   if (!score) {
  //     console.log('Score not calculated')
  //     return <ScoreSDK />
  //   }
  //   console.log(`Hooray! your score is ${score}`)
  //   setMyScore(score)
  //   return (
  //     <Box css={styles.wrapper}>
  //       <Box css={styles.poolWrapper}>
  //         <VouchForm />
  //       </Box>
  //       <Background />
  //     </Box>
  //   )
  // }

  // useEffect(() => {
  //   scoreRequired()
  // }, [score])

  return (
    <Box css={styles.wrapper}>
      <Box css={styles.poolWrapper}>
        <Score />
      </Box>
      <Box css={styles.poolWrapper}>
        <VouchForm />
      </Box>
      <Background />
    </Box>
  )
}
