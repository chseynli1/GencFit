import React from 'react'
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import styles from './ExperienceSection.module.scss'

import img1 from '@/assets/images/expierence/1.png'
import img2 from '@/assets/images/expierence/2.png'
import img3 from '@/assets/images/expierence/3.png'
import img4 from '@/assets/images/expierence/4.png'
import img5 from '@/assets/images/expierence/5.png'
import img6 from '@/assets/images/expierence/6.png'
import img7 from '@/assets/images/expierence/7.png'
import img8 from '@/assets/images/expierence/8.png'

const imageList = [img1, img2, img3, img4, img5, img6, img7, img8];

const ExperienceSection = ({ searchResults }) => {
  const { t, ready } = useTranslation();
  if (!ready) return null

  const items = Array.isArray(t('experience.items', { returnObjects: true }))
    ? t('experience.items', { returnObjects: true })
    : [];

    const dataToRender = searchResults && searchResults.length > 0
    ? searchResults
    : items;

  return (
    <section className={styles.experienceSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>{t('experience.title')}</h2>
        <p className={styles.subtitle}>{t('experience.subtitle')}</p>

        <div className={styles.cardGrid}>
          {dataToRender.map((item, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.cardImage}>
                <img src={imageList[index]} alt={item.name} />
              </div>
              <div className={styles.cardText}>
                <h4>{item.title}</h4>
                <div className={styles.cardFooter}>
                  <span className={styles.cardSpan}>{item.count}</span>
                  <button className={styles.arrowBtn}>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.moreBtn}>{t('experience.more')}</div>
      </div>
    </section>
  );
};

export default ExperienceSection;

