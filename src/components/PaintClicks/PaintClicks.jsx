import { useContext, useEffect, useState } from 'react';
import { useTelegram } from '../Hooks/useTelegram'
import './PaintClicks.scss'
import { main_context } from '../Hooks/useStats_main';
import { getCurrentNumberOfClicks, getUserInfo } from '../../http/User';
import { useInterface } from '../Hooks/useInteface';

export const PaintClicks = () => {

  const { isUserLogin, telegram_id } = useTelegram()
  let { currentPage } = useInterface()
  let { curentNumberOfClicks, setCurentNumberOfClicks, activeClicks } = useContext(main_context);

  useEffect(() => {
    getCurrentNumberOfClicks(telegram_id, setCurentNumberOfClicks)
  }, [isUserLogin, currentPage])

  return (
    <div className="paintClicks">
      <h1>{activeClicks}</h1>
    </div>
  )
}