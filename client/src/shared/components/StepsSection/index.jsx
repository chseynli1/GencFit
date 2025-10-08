import React from 'react'
import styles from './StepsSection.module.scss'
import { useTranslation } from 'react-i18next';
import UserAddIcon from "@/assets/images/AddUser.svg"
import LocationIcon from "@/assets/images/Location.svg"
import SearchIcon from "@/assets/images/Search.svg"
import ClockIcon from "@/assets/images/Clock.svg"
const StepsSection = () => {

  const { t, ready } = useTranslation();
  if (!ready) return null

  const steps = [
    {
      icon: UserAddIcon,
      text: t("steps.register"),
      alt: "Register",
    },
    {
      icon: SearchIcon,
      text: t("steps.explore"),
      alt: "Explore",
    },
    {
      icon: LocationIcon,
      text: t("steps.selectLocation"),
      alt: "Location",
    },
    {
      icon: ClockIcon,
      text: t("steps.joinActivity"),
      alt: "Clock",
    },
  ];

  return (
    <section className={styles.stepsSection}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t("steps.title")}</h2>
        <p className={styles.subtitle}>{t("steps.subtitle")}</p>
        <div className={styles.cards}>
          {steps.map((step, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.divIcon}>
                <img className={styles.icon} src={step.icon} alt={step.alt} width={48} height={48} />
              </div>
              <p className={styles.cardText}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StepsSection
