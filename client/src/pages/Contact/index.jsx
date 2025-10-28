import React from "react";
import styles from "./Contact.module.scss";
import locationIcon1 from "@/assets/images/locationIcon1.png";
import messageIcon from "@/assets/images/messageIcon.png";
import phoneIcon from "@/assets/images/phoneIcon.png";
import instagramIcon from "@/assets/images/instagramIcon.png";
import linkedinIcon from "@/assets/images/linkedinIcon.png";
import facebookIcon from "@/assets/images/facebookIcon.png";
import locationIcon2 from "@/assets/images/locationIcon2.png";
import { Link } from "react-router";
const Contact = () => {
  return (
    <div className={styles.contactSections}>
      {/* Section1 */}
      <section className={styles.contactSection}>
        <div className={styles.contact}>
          <h2 className={styles.contactHeader}>Bizimlə əlaqə</h2>
          <span className={styles.line}></span>
        </div>
        <div className={styles.contactInfo}>
          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>
              <img className={styles.contactImg} src={locationIcon1} />
            </div>
            <div className={styles.contactDetails}>
              <h4>Ünvan</h4>
              <span>Azərbaycan Respublikası, Bakı şəhəri...</span>
            </div>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>
              <img className={styles.contactImg} src={messageIcon} />
            </div>
            <div className={styles.contactDetails}>
              <h4>E-mail</h4>
              <p>contact@gencfit.az</p>
            </div>
          </div>

          <div className={styles.contactCard}>
            <div className={styles.contactIcon}>
              <img className={styles.contactImg} src={phoneIcon} />
            </div>
            <div className={styles.contactDetails}>
              <h4>Telefon</h4>
              <div>
                <span>+994 (55) 123 45 67</span>
                <span>+994 (012) 123 45 67</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className={styles.socialSection}>
        <div className={styles.social}>
          <h2 className={styles.socialHeader}>Sosial media</h2>
          <span className={styles.line}></span>
        </div>

        <div className={styles.socialLinks}>
  <a
    href="https://www.instagram.com/genc.fit?igsh=ZnlqeXpibTFsYjZ2"
    target="_blank"
    className={styles.socialIcon}
  >
    <img src={instagramIcon} alt="Instagram" />
  </a>

  <a
    href="https://www.linkedin.com/company/g%C9%99ncfi%CC%87t/"
    target="_blank"
    className={styles.socialIcon}
  >
    <img src={linkedinIcon} alt="LinkedIn" />
  </a>

  <a
    href="https://www.facebook.com/people/G%C9%99ncfit/61572727730784/?mibextid=wwXIfr&rdid=t1w2BFYGUxfIW5SE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Ai51Fyo8V%2F%3Fmibextid%3DwwXIfr"
    target="_blank"
    className={styles.socialIcon}
  >
    <img src={facebookIcon} alt="Facebook" />
  </a>
</div>

      </section>

      {/* Section 3 */}
      <section className={styles.mapSection}>
        <div className={styles.map}>
          <h2 className={styles.mapHeader}>Xəritə</h2>
          <span className={styles.line}></span>
        </div>

        <div className={styles.mapWrapper}>
          <iframe
            className={styles.iframe}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.454941617971!2d49.867!3d40.409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307dbb8c6eabeb%3A0x4c50a8e!2sNərimanov%20rayonu%2C%20Bakı!5e0!3m2!1saz!2saz!4v1700000000000"
            width="400"
            height="300"
            style={{ border: 0, borderRadius: "8px" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>

          <div className={styles.mapAddress}>
            <div className={styles.mapImg}>
              <img src={locationIcon2} />
            </div>
            <div className={styles.mapSubtitle}>
              <p className="">
                Azərbaycan Respublikası, Bakı şəhəri N.Nərimanov rayonu
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
