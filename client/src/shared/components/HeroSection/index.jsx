import React from 'react'
import { useTranslation } from 'react-i18next';
import friendsImg from '../../../assets/images/friendsImg.png'
import skaterImg from '../../../assets/images/skaterImg.png'
import gymImg from '../../../assets/images/gymImg.png'
import kartImg from '../../../assets/images/kartImg.png'
import styles from './HeroSection.module.scss'
const HeroSection = () => {
    const { t, ready } = useTranslation()
    if (!ready) return null

    return (
        <section className={styles.heroSection}>
            <div className={styles.textContent}>
                <h2 className={styles.title}>{t("hero.title")}</h2>
                <p className={styles.subtitle}>{t("hero.subtitle")}</p>
            </div>
            <div className={styles.gridWrapper}>
                <div className={styles.leftColumn}>
                    <div className={styles.topImage}>
                        <img src={friendsImg} alt="Gənclər bir yerdə" />
                    </div>
                    <div className={styles.bottomImages}>
                        <img src={gymImg} alt="İdman" />
                        <img src={kartImg} alt="Kart sürmə" />
                    </div>
                </div>
                <div className={styles.rightColumn}>
                    <img src={skaterImg} alt="Buzda konki" />
                </div>
            </div>
        </section>
    )
}

export default HeroSection
