import React from 'react'
import styles from './Partner.module.scss'
import partnersImg from '@/assets/images/partners.png'
import timeImg from '@/assets/images/time.png'
import activeLifeImg from '@/assets/images/activeLife.png'
import commentImg from '@/assets/images/comment.png'
import usersImg from '@/assets/images/users.png'

const Partners = () => {
  return (
    <div className={styles.partners}>
      <section className={styles.firstSection}>
        <div className={styles.firstSectionLeft}>
          <div className={styles.textBlock}>
            <h2 className={styles.title}>Birlikdə Daha Çox Gəncə Çataq!</h2>
            <p className={styles.subtitle}>Etibarlı və yenilikçi platformamızda yerinizi alın, brendinizi böyüdün.</p>
          </div>
          <div className={styles.formBlock}>
            <p className={styles.formLabel}>Tərəfdaşlıq üçün müraciət edin</p>
            <div className={styles.formActions}>
              <span className={styles.prefix}>+994</span>
              <input
                type="tel"
                className={styles.input}
                placeholder=""
              />
              <button className={styles.button}>Sorğu göndərin</button>
            </div>
          </div>
        </div>
        <div className={styles.firstSectionRight}>
          <img className={styles.rightImg} src={partnersImg} />
        </div>
      </section>

      {/* Section 2 */}

      <section className={styles.whyUs}>
        <div className={styles.whyUs__intro}>
          <h2>Bizimlə çalışmaq niyə faydalıdır?</h2>
          <p>GəncFit, sağlam həyat tərzini təşviq edən, geniş auditoriyaya sahib peşəkar platformadır. Bizimlə əməkdaşlıq etməklə məhsul və xidmətlərinizi hədəf kütləyə təqdim edə, biznesinizin inkişafına real töhfə verə bilərsiniz.</p>
        </div>
        <div className={styles.whyUs__grid}>
          <div className={styles.whyUs__item}>
            <div className={styles.whyUs__icon}>
              <img src={usersImg} />
            </div>
            <div className="">
              <h3 className={styles.whyUs__title}>Aylıq 10K+ istifadəçi</h3>
              <p className={styles.whyUs__text}>Platformamız ayda on minlərlə istifadəçiyə xidmət göstərir.</p>
            </div>
          </div>

          <div className={styles.whyUs__item}>
            <div className={styles.whyUs__icon}>
              <img src={activeLifeImg} />
            </div>
            <div className="">
              <h3 className={styles.whyUs__title}>90% Aktiv həyat maraqlısı</h3>
              <p className={styles.whyUs__text}>Fəal və sağlamlıqla maraqlanan istifadəçilər brendinizi gözləyir.</p>
            </div>
          </div>

          <div className={styles.whyUs__item}>
            <div className={styles.whyUs__icon}>
              <img src={commentImg} />
            </div>
            <div className="">
              <h3 className={styles.whyUs__title}>95% müsbət istifadəçi rəyi</h3>
              <p className={styles.whyUs__text}>GəncFit istifadəçilərinin əksəriyyəti platformadan və partnyorlardan razıdır.</p>
            </div>
          </div>

          <div className={styles.whyUs__item}>
            <div className={styles.whyUs__icon}>
              <img src={timeImg} />
            </div>
            <div className="">
              <h3 className={styles.whyUs__title}>Yüksək istifadəçi məşğulluğu</h3>
              <p className={styles.whyUs__text4}>Orta istifadəçi platformada 15 dəqiqədən çox vaxt keçirir ki, bu brendinizin diqqət çəkməsi üçün real imkan deməkdir.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Partners
