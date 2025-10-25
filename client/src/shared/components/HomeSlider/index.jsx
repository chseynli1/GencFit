import React, { useEffect, useState } from 'react'
import styles from './HomeSlider.module.scss'
import SliderImg from '../../../assets/images/SliderImg.png'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Urls } from '@/shared/constants/Urls';
const HomeSlider = () => {
  const { t, ready } = useTranslation()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(stored);

    // Login/Logout hadisələrini dinlə
    const handleLoginChange = () => {
      const status = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(status);
    };

    window.addEventListener("loginStatusChanged", handleLoginChange);

    return () => {
      window.removeEventListener("loginStatusChanged", handleLoginChange);
    };
  }, []);

  if (!ready) return null

  return (
    <section className={styles.slider}>
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderContent}>
          <h1>{t('homeSlider.title')}</h1>
          <p>{t('homeSlider.subtitle')}</p>
          {!isLoggedIn && (
            <Link to={Urls.REGISTER}>
              <button className={styles.registerBtn}>Qeydiyyatdan keç</button>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomeSlider
