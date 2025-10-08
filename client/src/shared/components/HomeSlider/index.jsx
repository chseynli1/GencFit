import React from 'react'
import styles from './HomeSlider.module.scss'
import SliderImg from '../../../assets/images/SliderImg.png'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { Urls } from '@/shared/constants/Urls';
const HomeSlider = () => {
  const { t, ready } = useTranslation()
  if (!ready) return null

  return (
    <section className={styles.slider}>
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderContent}>
          <h1>{t('homeSlider.title')}</h1>
          <p>{t('homeSlider.subtitle')}</p>
          <Link to={Urls.REGISTER}>
            <button >{t('homeSlider.button')}</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HomeSlider
