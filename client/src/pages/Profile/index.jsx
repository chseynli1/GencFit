import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';

const Profile = () => {
  const [partner, setPartner] = useState(null)
  const [file, setFile] = useState(null)
  const [fullName, setFullName] = useState("")


  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const res = await fetch("/api/partners")
        const data = await res.json()
        setPartner(Array.isArray(data) ? data[0] : data)
      } catch (error) {
        console.error("Partner məlumatı alınmadı:", error)
      }
    }

    fetchPartner()
  }, [])


  useEffect(() => {
    if (partner) setFullName(partner.full_name || "")
  }, [partner])

  
  const handleUpload = async () => {
    if (!partner) return;

    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("email", partner.email);
    if (file) formData.append("image", file);

    try {
      const res = await fetch(`/api/partners/${partner._id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        const updated = await res.json();
        setPartner(updated);
        alert("Məlumat uğurla yeniləndi ✅");
      }
    } catch (error) {
      console.error("Yeniləmə xətası:", error);
    }
  }

  if (!partner) return <p>Loading...</p>;

  return (
    <div className={styles.profilePage}>


      {/* Section 1 */}

      <section className={styles.myProfile}>
        <div className={styles.profile}>
          <h2 className={styles.profileHeader}>Mənim Profilim</h2>
          <span className={styles.line}></span>
        </div>
        <div className="">
          <div className={styles.profileImage}>
            <img
              className=""
              src={
                partner.image ||
                "https://res.cloudinary.com/dzsjtq4zd/image/upload/v1756229683/default-avatar-icon-of-social-media-user-vector_abij8s.jpg"
              }
              alt="Profil şəkli"
            />
          </div>
          <div className={styles.profileData}>
            <h3 className=""></h3>
          </div>
        </div>
      </section>


      {/* <input type="file" onChange={e => setFile(e.target.files[0])} /> */}
      {/* <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} /> */}
      {/* <button onClick={handleUpload}>Yenilə</button> */}
    </div>
  );
};

export default Profile;
