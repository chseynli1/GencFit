import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './About.module.scss'
import AboutImg from '@/assets/images/aboutimg.png'
import historyImg from '@/assets/images/historyImg.png'
import missionImg from '@/assets/images/missionImg.png'
import keramikaImg from '@/assets/images/keramikaImg.png'
import boksImg from '@/assets/images/boksImg.png'
import reqsImg from '@/assets/images/reqsImg.png'
import sahmatImg from '@/assets/images/sahmatImg.png'
import uzguculukImg from '@/assets/images/uzguculukImg.png'
import yogaImg from '@/assets/images/yogaImg.png'
import audienceImg from '@/assets/images/audienceImg.png'
import differenceImg from '@/assets/images/differenceImg.png'
import valuesIcon1 from '@/assets/images/valuesIcon1.png'
import valuesIcon2 from '@/assets/images/valuesIcon2.png'
import valuesIcon3 from '@/assets/images/valuesIcon3.png'
import valuesIcon4 from '@/assets/images/valuesIcon4.png'

const About = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.about}>
      <div className={styles.container}>

        {/* Section 1 */}
        <section className={styles.section1}>
          <div className={styles.imageContainer}>
            <img src={AboutImg} alt="About" />
            <h1>{t('aboutPage.title')}</h1>
          </div>
        </section>

        {/* Section 2 */}
        <section className={styles.storySection}>
          <div className={styles.storySection__content}>
            <h2 className={styles.storySection__title}>{t('aboutPage.storyTitle')}</h2>
            <p className={styles.storySection__text}>{t('aboutPage.storyText')}</p>
          </div>
          <div className={styles.storySection__imageBox}>
            <img className={styles.storySection__image} src={historyImg} alt="Hekayemiz" />
          </div>
        </section>

        {/* Section 3 */}
        <section className={styles.missionSection}>
          <div className={styles.missionSection__imgBox}>
            <img className={styles.missionSection__img} src={missionImg} alt="Missiyamız" />
          </div>
          <div className={styles.missionSection__content}>
            <h2 className={styles.missionSection__title}>{t('aboutPage.missionTitle')}</h2>
            <p className={styles.missionSection__text}>{t('aboutPage.missionText')}</p>
          </div>
        </section>

        {/* Section 4 */}
        <section className={styles.offerSection}>
          <div className={styles.offerContent}>
            <div className={styles.offerContentDiv}>
              <h2>{t('aboutPage.offerTitle')}</h2>
              <p>{t('aboutPage.offerText')}</p>
            </div>
            <div>
              <ul>
                {t('aboutPage.offerList', { returnObjects: true }).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.offerImages}>
            <img src={keramikaImg} alt="Keramika" />
            <img src={reqsImg} alt="Rəqs" />
            <img src={sahmatImg} alt="Şahmat" />
            <img src={yogaImg} alt="Yoga" />
            <img src={boksImg} alt="Boks" />
            <img src={uzguculukImg} alt="Üzgüçülük" />
          </div>
        </section>

        {/* Section 5 */}
        <section className={styles.audienceSection}>
          <div className={styles.audienceSection__image}>
            <img src={audienceImg} alt="Kimlər üçündür?" />
          </div>
          <div className={styles.audienceSection__content}>
            <h2>{t('aboutPage.audienceTitle')}</h2>
            <p>{t('aboutPage.audienceText')}</p>
          </div>
        </section>

        {/* Section 6 */}
        <section className={styles.valuesSection}>
          <div className={styles.valuesHeader}>
            <h2 className={styles.valuesTitle}>{t('aboutPage.valuesTitle')}</h2>
            <p className={styles.valuesSubtitle}>{t('aboutPage.valuesSubtitle')}</p>
          </div>
          <div className={styles.valuesGrid}>
            <div className={styles.valuesItems}>
              <div className={styles.valuesItem}>
                <div className={styles.valueIcon}>
                  <img src={valuesIcon1} alt="Sağlamlıq" />
                </div>
                <div className={styles.valueContent}>
                  <h3 className={styles.valueTitle}>{t('aboutPage.values.health.title')}</h3>
                  <p className={styles.valueText}>{t('aboutPage.values.health.text')}</p>
                </div>
              </div>
              <div className={styles.valuesItem}>
                <div className={styles.valueIcon}>
                  <img src={valuesIcon2} alt="Əlçatanlıq" />
                </div>
                <div className={styles.valueContent}>
                  <h3 className={styles.valueTitle}>{t('aboutPage.values.accessibility.title')}</h3>
                  <p className={styles.valueText}>{t('aboutPage.values.accessibility.text')}</p>
                </div>
              </div>
            </div>
            <div className={styles.valuesItems}>
              <div className={styles.valuesItem}>
                <div className={styles.valueIcon}>
                  <img src={valuesIcon3} alt="Faydalılıq" />
                </div>
                <div className={styles.valueContent}>
                  <h3 className={styles.valueTitle}>{t('aboutPage.values.usefulness.title')}</h3>
                  <p className={styles.valueText}>{t('aboutPage.values.usefulness.text')}</p>
                </div>
              </div>
              <div className={styles.valuesItem}>
                <div className={styles.valueIcon}>
                  <img src={valuesIcon4} alt="Etibar" />
                </div>
                <div className={styles.valueContent}>
                  <h3 className={styles.valueTitle}>{t('aboutPage.values.trust.title')}</h3>
                  <p className={styles.valueText}>{t('aboutPage.values.trust.text')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section className={styles.differenceSection}>
          <div className={styles.differenceContent}>
            <h2 className={styles.differenceTitle}>{t('aboutPage.differenceTitle')}</h2>
            <p className={styles.differenceDescription}>{t('aboutPage.differenceText')}</p>
          </div>
          <div className={styles.differenceImage}>
            <img src={differenceImg} alt="Fərqimiz" />
          </div>
        </section>

      </div>
    </div>
  )
}

export default About
