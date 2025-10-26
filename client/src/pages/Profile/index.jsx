import React, { useEffect, useMemo, useState } from "react";
import styles from "./Profile.module.scss";
import axios from "axios";
import { Pencil, X } from "lucide-react";
import phoneVector from "@/assets/images/phoneVector.png";
import locationVector from "@/assets/images/locationVector.png";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [editableFields, setEditableFields] = useState({});
  const [loading, setLoading] = useState(true);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVenue, setNewVenue] = useState("");
  const [newPurpose, setNewPurpose] = useState("");
  const [selectedVenueId, setSelectedVenueId] = useState("");
  const [venues, setVenues] = useState([]);
  const [scope, setScope] = useState("upcoming")
  const [purposeError, setPurposeError] = useState("");
  const token = useMemo(() => localStorage.getItem("token"), []);


  // Axios default header (istəsən çıxarıb yalnız sorğularda da verə bilərsən)
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Profil məlumatını gətir
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/users/me"); // BE: { user: { ... } } qaytarır kimi nəzərdə tutulub
        const me = res.data?.user || res.data?.data || null;
        setUser(me);
      } catch (err) {
        console.error("Profil məlumatı alınmadı:", err);
        alert(err?.response?.data?.message || "Profil məlumatı alınmadı");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

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

  // Profil saxla
  const handleSave = async () => {
    try {
      if (!user) return;

      // Mövcud ad-soyadı parçala
      const [currentFirst = "", currentLast = ""] = (user.full_name || "").split(" ");

      // Yeni full_name yığ
      let nextFullName = user.full_name || "";
      if (editedData.first_name || editedData.last_name) {
        const fn = editedData.first_name ?? currentFirst;
        const ln = editedData.last_name ?? currentLast;
        nextFullName = `${fn} ${ln}`.trim();
      }

      // Göndəriləcək payload – yalnız dəyişənləri daxil edirik
      const payload = {};
      if (nextFullName && nextFullName !== user.full_name) payload.full_name = nextFullName;
      if (editedData.phone && editedData.phone !== user.phone) payload.phone = editedData.phone;
      if (editedData.location && editedData.location !== user.location) payload.location = editedData.location;

      if (Object.keys(payload).length === 0) {
        alert("Dəyişiklik yoxdur.");
        return;
      }

      // Backendində update endpoint adın fərqlidirsə uyğunlaşdır:
      // Məs: PUT /api/users/me  və ya  PUT /api/users/profile/:id
      // Burada /me istifadə edirik ki, id ötürməyə ehtiyac qalmasın
      const res = await axios.put("/api/users/me", payload, {
        headers: { "Content-Type": "application/json" },
      });

      const updated = res.data?.user || res.data?.data || payload;
      // UI-ni dərhal yenilə
      setUser((prev) => ({
        ...prev,
        ...updated,
        full_name: payload.full_name ?? prev.full_name,
        phone: payload.phone ?? prev.phone,
        location: payload.location ?? prev.location,
      }));
      setEditableFields({});
      setEditedData({});
      alert("Məlumatlar uğurla yeniləndi ✅");
    } catch (err) {
      console.error("Yenilənmə xətası:", err);
      alert(err?.response?.data?.message || "Məlumat yenilənmədi!");
    }
  };

  // 🔐 Şifrə dəyişmə
  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Bütün xanaları doldurun!");
      return;
    }
    if (newPassword.length < 6) {
      alert("Yeni şifrə ən azı 6 simvol olmalıdır!");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Yeni şifrələr uyğun gəlmir!");
      return;
    }

    try {
      setPwLoading(true);
      // Backend: PUT /api/users/change-password  { oldPassword, newPassword }
      await axios.put(
        "/api/users/change-password",
        { oldPassword, newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Şifrə uğurla dəyişdirildi ✅");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch (err) {
      console.error("Şifrə dəyişmə xətası:", err);
      const msg = err?.response?.data?.message || "Köhnə şifrə səhvdir və ya xəta baş verdi!";
      alert(msg);
    } finally {
      setPwLoading(false);
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
    const p = (newPurpose || "").trim();

    if (!selectedVenueId || !newDate || !newTime) {
      alert("Bütün xanaları doldurun!");
      return;
    }

    if (p.length < 1 || p.length > 500) {
      setPurposeError("Məqsəd 1–500 simvol olmalıdır");
      return;
    } else {
      setPurposeError("");
    }


    const appointmentDateTime = new Date(`${newDate}T${newTime}:00+04:00`);
    if (isNaN(appointmentDateTime.getTime()) || appointmentDateTime <= new Date()) {
      alert("Zəhmət olmasa gələcək tarix və saat seçin.");
      return;
    }

    try {
      const res = await axios.post(
        "/api/appointments",
        {
          venue_id: selectedVenueId,
          appointment_date: appointmentDateTime.toISOString(),
          duration_hours: 1,
          purpose: newPurpose.trim() || "Randevu",
          notes: "",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Randevu əlavə olundu ✅");
      setAppointments((prev) => [...prev, res.data.data || res.data]);
      setShowAddModal(false);

      alert("Randevu əlavə olundu ✅");
      setAppointments(prev => [...prev, res.data.data || res.data]);
      setShowAddModal(false);
      setSelectedVenueId("");
      setNewDate("");
      setNewTime("");
      setNewPurpose("");
      setPurposeError("");
    } catch (err) {
      console.error("Randevu əlavə xətası:", err.response?.data || err);
      alert(err?.response?.data?.message || "Randevu əlavə oluna bilmədi!");
    }
  };




  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await axios.get("/api/venues", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVenues(res.data.data || res.data);
      } catch (err) {
        console.error("Venue listesi alınmadı:", err);
      }
    };

    if (token) fetchVenues();
  }, [token]);



  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(`/api/appointments?scope=${scope}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data.data || []);
      } catch (err) {
        console.error("Randevular alınmadı:", err);
      }
    };
    if (token) fetchAppointments();
  }, [token, scope]);



  if (loading) return <p>Loading...</p>;
  const [firstName = "", lastName = ""] = (user?.full_name || "").split(" ");

  return (
    <div className={styles.profilePage}>
      <section className={styles.myProfile}>
        <div className={styles.profileTitle}>
          <h2 className={styles.profileHeader}>Mənim Profilim</h2>
          <span className={styles.line}></span>
        </div>

        <div className={styles.profileContent}>
          <div className={styles.profileImage}>
            <img
              src={
                user?.image ||
                "https://res.cloudinary.com/dzsjtq4zd/image/upload/v1756229683/default-avatar-icon-of-social-media-user-vector_abij8s.jpg"
              }
              alt="Profil şəkli"
              className={styles.profileImage}
            />
          </div>

          <div className={styles.profileInfo}>
            <h3 className={styles.userName}>{user?.full_name}</h3>
            <p><img src={locationVector} alt="" /> {user?.location || "—"}</p>
            <p><img src={phoneVector} alt="" /> {user?.phone || "—"}</p>
          </div>
        </div>
      </section>

      <section className={styles.personal}>
        <div className={styles.personalTitle}>
          <h2 className={styles.personalHeader}>Şəxsi məlumatlarım</h2>
          <span className={styles.line}></span>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formRow}>
            <div className={styles.field}>
              <label>Ad</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  disabled={!editableFields.first_name}
                  value={
                    editableFields.first_name
                      ? (editedData.first_name ?? "")
                      : firstName
                  }
                  onChange={(e) => handleChange("first_name", e.target.value)}
                />
                <Pencil
                  className={styles.icon}
                  onClick={() => handleEditClick("first_name")}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>Soyad</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  disabled={!editableFields.last_name}
                  value={
                    editableFields.last_name
                      ? (editedData.last_name ?? "")
                      : lastName
                  }
                  onChange={(e) => handleChange("last_name", e.target.value)}
                />
                <Pencil
                  className={styles.icon}
                  onClick={() => handleEditClick("last_name")}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>Telefon</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  disabled={!editableFields.phone}
                  value={
                    editableFields.phone
                      ? (editedData.phone ?? "")
                      : (user?.phone || "")
                  }
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                <Pencil
                  className={styles.icon}
                  onClick={() => handleEditClick("phone")}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>E-mail</label>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  disabled
                  value={user?.email || ""}
                  readOnly
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>Ünvan</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  disabled={!editableFields.location}
                  value={
                    editableFields.location
                      ? (editedData.location ?? "")
                      : (user?.location || "")
                  }
                  onChange={(e) => handleChange("location", e.target.value)}
                />
                <Pencil
                  className={styles.icon}
                  onClick={() => handleEditClick("location")}
                />
              </div>
            </div>

            {/* 🔐 Şifrə dəyişmək */}
            <div className={styles.field}>
              <label>Şifrə</label>
              <div className={styles.inputWrapper}>
                <input type="password" value="********" disabled />
                <Pencil
                  className={styles.icon}
                  onClick={() => setShowPasswordForm(true)}
                />
              </div>
            </div>
          </div>

          <button className={styles.saveBtn} onClick={handleSave}>
            Tamamla
          </button>
        </div>
      </section>

      {/* 🔒 Şifrə Dəyişmə Modalı */}
      {showPasswordForm && (
        <div className={styles.passwordModal}>
          <div className={styles.modalContent}>
            <X
              className={styles.closeIcon}
              onClick={() => setShowPasswordForm(false)}
            />
            <h3>Şifrəni dəyiş</h3>
            <input
              type="password"
              placeholder="Köhnə şifrə"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Yeni şifrə"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Yeni şifrə (təkrar)"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handlePasswordChange} disabled={pwLoading}>
              {pwLoading ? "Yüklənir..." : "Yenilə"}
            </button>
          </div>
        </div>
      )}

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
            appointments.map((appt) => {
              const dt = appt.appointment_date ? new Date(appt.appointment_date) : null;
              return (
                <div key={appt.id || appt._id} className={styles.appointmentsCard}>
                  <h3 className={styles.cardHeader}>{appt.purpose}</h3>
                  <span>{dt ? dt.toLocaleString() : appt.appointment_date}</span>
                  <span>{appt.venue_name}</span>
                </div>
              )

            })
          )}

        </div>
        <button
          className={styles.addAppointmentBtn}
          onClick={() => setShowAddModal(true)}
        >
          Əlavə et
        </button>
        <button
          className={scope === "past" ? styles.activeTab : ""}
          onClick={() => setScope("past")}
        >
          Keçmiş randevular
        </button>
      </section>

      {showAddModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <X className={styles.closeIcon} onClick={() => setShowAddModal(false)} />
            <h3>Yeni Randevu Əlavə Et</h3>

            <label>İdman növü</label>
            <input
              type="text"
              value={newPurpose}
              onChange={(e) => setNewPurpose(e.target.value)}
              placeholder="Məs: GəncFit Gym"
            />

            <label>Tarix</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />

            <label>Vaxt</label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />

            <label>Məkan</label>
            <select
              value={selectedVenueId}
              onChange={(e) => setSelectedVenueId(e.target.value)}
            >
              <option value="">Məkan seçin...</option>
              {venues.map((v) => {
                const vid = v.id || v._id;
                return (
                  <option key={vid} value={vid}>
                    {v.name}
                  </option>
                );
              })}
            </select>

            <button onClick={handleAddAppointment}>Əlavə et</button>
          </div>
        </div>
      )}


    </div>
  );
};

export default Profile;
