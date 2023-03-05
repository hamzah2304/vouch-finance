import { Box, Button, css, Grid, Skeleton, useTheme } from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import React, { useCallback, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { useCLStats } from '../../../hooks/useCLPoolContract'
import { useMQ } from '../../../hooks/useMQ'
import { usePoolInfo, usePoolName } from '../../../hooks/usePool'
import { useRefresh } from '../../../hooks/useRefresh'
import { formatMoney } from '../../../utils/number'
import { POOL_TYPE, PoolMap } from '../../../utils/pool'
import { timestampToLL } from '../../../utils/time'
import { CreditLineSDK } from '../../sdk/CreditLine/components'
import { ConnectWalletButton } from '../../wallet/components'
import { isEmpty } from '../../../utils/common'

import { routes } from '../../../Router'

import { PoolInfo } from '../../../components/layout/PoolInfo'
import { VouchTable } from './VouchTable'

type Props = {
    infoOneRow?: boolean
}

export function VouchForm({infoOneRow=false,}: Props): React.ReactElement {
  const { isActive } = useWeb3React()
  const theme = useTheme()
  const { isLgSize, isBelowXsSize, isSmSize, isMdSize, isXsSize } = useMQ()
  const buttonWidth = isLgSize ? 180 : 140
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const firstRowSize = infoOneRow ? 7 : 12
  const secondRowSize = infoOneRow ? 5 : 12

  const searchDescription = "Vouch for another user and increase their borrowing power."
  const tableDescription = "Information about loans taken out by users you have vouched for"

  const getPadding = () => {
    if (isSmSize) {
      return 32
    }
    return 48
  }

  const styles = {
    wrapper: css`
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
    infoWrapper: css`
      ${theme.cssMixins.rowSpaceBetweened}
    `,
    infoLeft: css`
      ${theme.cssMixins.rowSpaceBetweened}
      flex-direction: ${isSmSize ? 'column' : 'row'};
      justify-content: ${isMdSize ? 'flex-start' : 'space-between'};
      & > div {
        margin-bottom: ${isSmSize ? 20 : 0}px;
        margin-right: ${isMdSize ? 40 : 0}px;
      }
      & > div:last-of-type {
        margin-right: 0px;
        margin-bottom: 0px;
      }
    `,
    infoTitle: css`
      ${theme.cssMixins.rowVCentered}
      font-family: 'Uni-Neue-Bold';
      font-size: ${isLgSize ? 20 : 18}px;
      color: #76707e;
      margin-bottom: 8px;
    `,
    infoContent: css`
      font-family: 'Uni-Neue-Regular';
      font-size: ${isLgSize ? 32 : 26}px;
      color: #6b6572;
    `,
    infoRight: css`
      ${theme.cssMixins.rowFlexEnd}
      width: ${infoOneRow ? 'unset' : '100%'};
    `,
    buttonWrapper: (width: number) => css`
      width: ${infoOneRow ? 'unset' : '100%'};
      margin-right: ${isBelowXsSize ? 16 : 24}px;
      &:last-of-type {
        margin-right: 0;
      }
      & > button,
      & > a {
        height: 42px;
        width: ${infoOneRow ? `${width}px` : '100%'};
      }
    `,
  }

  const searchItems = useMemo(() => {
    const poolBalanceItem = {
      id: 'vouch',
      title: 'Search',
      value: <form>
        <input type="text" placeholder="0x1d...89dA"/>
      </form>,
      isLoading: false,
    }
    return [poolBalanceItem]
  }, [isActive])

  const searchButtons = useMemo(() => {
    if (!isActive) {
      return [
        <ConnectWalletButton text='CONNECT YOUR WALLET' variant='contained' />,
      ]
    }
    return [
      <Button
        variant='contained'
      >
        SEARCH
      </Button>,
    ]
  }, [isActive])

  const tableItems = useMemo(() => {
    const poolBalanceItem = {
      id: 'vouch-table',
      title: '',
      value: <VouchTable />,
      isLoading: false,
    }
    return [poolBalanceItem]
  }, [isActive])

  const tableButtons = [""]

  return (
    <>
    <PoolInfo
      id='vouch-search-form'
      title='Vouch'
      description={searchDescription}
      items={searchItems}
      buttons={searchButtons}   
      buttonWidth={255}
      infoOneRow={!isXsSize}
    />
    <br/>
    <PoolInfo
    id='vouch-table'
    title='Your vouch information'
    description={tableDescription}
    items={tableItems}
    buttons={tableButtons}
    buttonWidth={255}
    infoOneRow={!isXsSize}
  />
  </>
  )
}
