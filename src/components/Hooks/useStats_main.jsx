import React, { createContext, useState, useRef, useEffect } from "react";
import { getCurrentNumberOfClicks, getUserInfo } from "../../http/User";
import { useTelegram } from "./useTelegram";
import { useInterface } from "./useInteface";

export const main_context = createContext();

export const MainProvider = ({ children }) => {

  const { isUserLogin, telegram_id } = useTelegram()
  let { currentPage } = useInterface()

  const [bgList, setBgList] = useState([
    'radial-gradient(circle, rgba(255, 204, 204, 1) 0%, rgba(255, 255, 153, 1) 50%, rgba(204, 229, 255, 1) 100%)', // 😭
    'radial-gradient(circle, rgba(255, 224, 204, 1) 0%, rgba(255, 255, 153, 1) 50%, rgba(204, 255, 204, 1) 100%)', // 😢
    'radial-gradient(circle, rgba(255, 229, 204, 1) 0%, rgba(255, 255, 153, 1) 50%, rgba(204, 229, 255, 1) 100%)', // 😖
    'radial-gradient(circle, rgba(255, 204, 255, 1) 0%, rgba(204, 255, 255, 1) 50%, rgba(255, 255, 153, 1) 100%)', // 😞
    'radial-gradient(circle, rgba(204, 204, 255, 1) 0%, rgba(255, 204, 255, 1) 50%, rgba(255, 255, 153, 1) 100%)', // 😕
    'radial-gradient(circle, rgba(255, 204, 204, 1) 0%, rgba(255, 255, 153, 1) 50%, rgba(204, 255, 204, 1) 100%)', // 🙁
    'radial-gradient(circle, rgba(255, 255, 204, 1) 0%, rgba(204, 255, 255, 1) 50%, rgba(255, 204, 255, 1) 100%)', // 😐
    'radial-gradient(circle, rgba(204, 255, 204, 1) 0%, rgba(204, 204, 255, 1) 50%, rgba(255, 255, 153, 1) 100%)', // 😏
    'radial-gradient(circle, rgba(255, 204, 204, 1) 0%, rgba(255, 255, 153, 1) 50%, rgba(204, 229, 255, 1) 100%)', // 😉
    'radial-gradient(circle, rgba(255, 224, 204, 1) 0%, rgba(255, 255, 153, 1) 50%, rgba(204, 255, 204, 1) 100%)', // 😌
    'radial-gradient(circle, rgba(255, 229, 204, 1) 0%, rgba(255, 255, 153, 1) 50%, rgba(204, 229, 255, 1) 100%)', // 😎
    'radial-gradient(circle, rgba(255, 204, 255, 1) 0%, rgba(204, 255, 255, 1) 50%, rgba(255, 255, 153, 1) 100%)', // 🥰
    'radial-gradient(circle, rgba(204, 204, 255, 1) 0%, rgba(255, 204, 255, 1) 50%, rgba(255, 255, 153, 1) 100%)', // 🤩
  ]);
  const [currentBg, setCurrentBg] = useState(0);
  const [curentNumberOfClicks, setCurentNumberOfClicks] = useState(0);
  const [continuousClicksForPost, setContinuousClicksForPost] = useState(0); // Количество непрерывных кликов для отправки на сервер
  const [userInfo, setUserInfo] = useState({})
  const [currentBoost, setCurrentBoost] = useState(1)
  const [activeClicks, setActiveClicks] = useState(0)

  useEffect(() => {
    getUserInfo(telegram_id, setUserInfo)
  }, [])

  useEffect(() => {
    let user_boost = 0
    let user_xboost = 1
    userInfo?.bought?.map((bought_item) => {
      bought_item?.items?.boost?.map((boost_item) => {
        user_boost += boost_item.boost
        user_xboost *= boost_item.x_boost
      })
    })
    setCurrentBoost((1 + user_boost) * user_xboost)
  }, [userInfo])

  useEffect(() => {
    if (userInfo && currentBoost){
      setActiveClicks(curentNumberOfClicks)
    }
  }, [curentNumberOfClicks]) 


  useEffect(() => {
    if (userInfo && currentBoost) {
      if (continuousClicksForPost !== 0) {
        setActiveClicks(prevClicks => prevClicks + currentBoost);
      }
    }
  }, [continuousClicksForPost]);


  useEffect(() => {
    document.body.style.background = bgList[currentBg];
  }, [currentBg, bgList]);


  return (
    <main_context.Provider
      value={{
        bgList,
        curentNumberOfClicks,
        continuousClicksForPost,
        activeClicks,
        setCurrentBg,
        setCurentNumberOfClicks,
        setContinuousClicksForPost,
      }}
    >
      {children}
    </main_context.Provider>
  );
};