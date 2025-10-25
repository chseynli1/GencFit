import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import phoneVector from '@/assets/images/phoneVector.png'
import locationVector from '@/assets/images/locationVector.png'

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [editableFields, setEditableFields] = useState({});
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");


  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token tapılmadı");
          return;
        }

        // 1️⃣ USER məlumatı
        const userRes = await axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User response:", userRes.data);

        const userData = userRes.data?.data;
        setUser(userData);

      } catch (err) {
        console.error("Profil məlumatı alınmadı:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);



  const handleEditClick = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: true }));
    setEditedData((prev) => ({
      ...prev,
      [field]: user?.[field] || "",
    }));
  };


  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      if (editedData.first_name || editedData.last_name) {
        const fullName = `${editedData.first_name || user.full_name.split(" ")[0]} ${editedData.last_name || user.full_name.split(" ")[1] || ""}`;
        formData.full_name = fullName.trim();
      }

      if (editedData.email) formData.append("email", editedData.email);
      if (editedData.phone) formData.append("phone", editedData.phone);
      if (editedData.location) formData.append("location", editedData.location);

      if (Object.keys(formData).length > 0) {
        await axios.put(`/api/users/profile/${user.id}`, formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      }

      alert("Məlumatlar uğurla yeniləndi ✅");
      setEditableFields({});
      setEditedData({});
      window.location.reload();
    } catch (err) {
      console.error("Yenilənmə xətası:", err);
      alert("Xəta baş verdi!");
    }
  };





  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data.data || []);
      } catch (err) {
        console.error("Randevular alınmadı:", err);
      }
    };

    if (token) fetchAppointments();
  }, [token]);



  const handleAddAppointment = async () => {
    if (!newDate || !newTime) {
      alert("Tarix və saat daxil edin!");
      return;
    }

    try {
      const res = await axios.post(
        "/api/appointments",
        {
          date: newDate,
          time: newTime,
          userName: user.full_name,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Randevu əlavə olundu ✅");

      setAppointments((prev) => [...prev, res.data]);
      setNewDate("");
      setNewTime("");
    } catch (err) {
      console.error(err);
      alert("Randevu əlavə oluna bilmədi!");
    }
  };





  if (loading) return <p>Loading...</p>;

  const [firstName, lastName] = (user?.full_name || "").split(" ");

  return (
    <div className={styles.profilePage}>


      {/* Section 1 */}

      <section className={styles.myProfile}>
        <div className={styles.profileTitle}>
          <h2 className={styles.profileHeader}>Mənim Profilim</h2>
          <span className={styles.line}></span>
        </div>


        <div className={styles.profileContent}>
          <div className={styles.profileImage}>
            <img
              src={user?.image || "https://res.cloudinary.com/dzsjtq4zd/image/upload/v1756229683/default-avatar-icon-of-social-media-user-vector_abij8s.jpg"}
              alt="Profil şəkli"
              className={styles.profileImage}
            />
          </div>

          <div className={styles.profileInfo}>
            <h3 className={styles.userName}>{user.full_name}</h3>
            <div className="">
              <p><img src={locationVector} /> {user?.location}</p>
              <p><img src={phoneVector} /> {user?.phone}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}

      <section className={styles.personal}>
        <div className={styles.personalTitle}>
          <h2 className={styles.personalHeader}>Şəxsi məlumatlarım</h2>
          <span className={styles.line}></span>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formRow}>
            {/* Ad */}
            <div className={styles.field}>
              <label>Ad</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  disabled={!editableFields.first_name}
                  value={
                    editableFields.first_name
                      ? editedData.first_name
                      : firstName || ""
                  }
                  onChange={(e) => handleChange("first_name", e.target.value)}
                />
                <Pencil
                  className={styles.icon}
                  onClick={() => handleEditClick("first_name")}
                />
              </div>
            </div>

            {/* Soyad */}
            <div className={styles.field}>
              <label>Soyad</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  disabled={!editableFields.last_name}
                  value={
                    editableFields.last_name
                      ? editedData.last_name
                      : lastName || ""
                  }
                  onChange={(e) => handleChange("last_name", e.target.value)}
                />
                <Pencil
                  className={styles.icon}
                  onClick={() => handleEditClick("last_name")}
                />
              </div>
            </div>

            {/* Telefon */}
            <div className={styles.field}>
              <label>Telefon</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  disabled={!editableFields.phone}
                  value={
                    editableFields.phone
                      ? editedData.phone
                      : user?.phone || "Məlumat daxil edilməyib"
                  }
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                <Pencil
                  className={styles.icon}
                  onClick={() => handleEditClick("phone")}
                />
              </div>
            </div>

            {/* Email */}
            <div className={styles.field}>
              <label>E-mail</label>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  disabled={!editableFields.email}
                  value={
                    editableFields.email
                      ? editedData.email
                      : user?.email || ""
                  }
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <Pencil
                  className={styles.icon}
                  onClick={() => handleEditClick("email")}
                />
              </div>
            </div>

            {/* Ünvan */}
            <div className={styles.field}>
              <label>Ünvan</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  disabled={!editableFields.location}
                  value={
                    editableFields.location
                      ? editedData.location
                      : user?.location || "Məlumat daxil edilməyib"
                  }
                  onChange={(e) => handleChange("location", e.target.value)}
                />
                <Pencil
                  className={styles.icon}
                  onClick={() => handleEditClick("location")}
                />
              </div>
            </div>

            {/* Şifrə */}
            <div className={styles.field}>
              <label>Şifrə</label>
              <div className={styles.inputWrapper}>
                <input type="password" value="********" disabled />
                <Pencil className={styles.icon} />
              </div>
            </div>
          </div>

          <button className={styles.saveBtn} onClick={handleSave}>
            Tamamla
          </button>
        </div>
      </section>


      {/* Section 3 */}
      <section className={styles.appointments}>
        <div className={styles.sectionHeader}>
          <h2>Randevularım</h2>
          <span className={styles.line}></span>
        </div>


        <div className={styles.appointmentsCards}>
          {appointments.length === 0 ? (
            <p>Heç bir randevu yoxdur</p>
          ) : (
            appointments.map((appt) => (
              <div className={styles.appointmentsCard}>
                <h3 className={styles.cardHeader}>{appt.venue_name}</h3>
                <p>{appt.appointment_date}</p>
                <p>{appt.purpose}</p>
              </div>
            ))
          )}

        </div>

      </section>

      {/* <input type="file" onChange={e => setFile(e.target.files[0])} /> */}
      {/* <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} /> */}
      {/* <button onClick={handleUpload}>Yenilə</button> */}
    </div>
  );
};

export default Profile;
