<<<<<<< HEAD
// Profile.jsx - BACKEND FORMATINA UYĞUN VERSİYA
=======
>>>>>>> b1d335016ba9e1083705b603b164a99ba3eb0c94
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Profile.module.scss";
import axios from "axios";
import { Pencil, X } from "lucide-react";
import phoneVector from "@/assets/images/phoneVector.png";
import locationVector from "@/assets/images/locationVector.png";
import cameraIcon from "@/assets/images/camera.png"

const Profile = () => {
  const [user, setUser] = useState(() => {
    const img = localStorage.getItem("profile_image");
    return img ? { image: img } : null;
  });
  const [editedData, setEditedData] = useState({});
  const [editableFields, setEditableFields] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [tempPreview, setTempPreview] = useState(null);
  const fileInputRef = useRef(null);

<<<<<<< HEAD
=======
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const [allAppointments, setAllAppointments] = useState([]);
  const [now, setNow] = useState(Date.now());
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPurpose, setNewPurpose] = useState("");
  const [selectedVenueId, setSelectedVenueId] = useState("");
  const [venues, setVenues] = useState([]);
  const [apptsLoading, setApptsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [entityMetaMap, setEntityMetaMap] = useState({});

  const [purposeError, setPurposeError] = useState("");

  const [showPastDrawer, setShowPastDrawer] = useState(false);

  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);


>>>>>>> b1d335016ba9e1083705b603b164a99ba3eb0c94
  const token = useMemo(() => localStorage.getItem("token"), []);

  // Axios config
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  // Profil məlumatını gətir
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/users/me");
      console.log("Profil məlumatları:", res.data);
      // Backend formatı: { success: true, user: {...} }
      setUser(res.data.user || res.data.data);
    } catch (err) {
      console.error("Profil məlumatı alınmadı:", err);
      alert("Profil məlumatı alınmadı");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
<<<<<<< HEAD
    fetchProfile();
  }, []);

  // ŞƏKİL URL-Nİ QUR - BACKEND FORMATINA UYĞUN
  const getImageUrl = () => {
    if (tempPreview) return tempPreview;
    
    if (!user?.image) {
      return "https://res.cloudinary.com/dm5kbabyq/image/upload/v1729933937/default-avatar.jpg";
    }

    // Backend formatı: { url: "/uploads/...", filename: "..." }
    const imageUrl = user.image.url || user.image;
    
    if (!imageUrl) {
      return "https://res.cloudinary.com/dm5kbabyq/image/upload/v1729933937/default-avatar.jpg";
    }

    if (imageUrl.startsWith("http")) {
      return imageUrl;
    } else {
      return `http://localhost:8001${imageUrl}`;
    }
  };

  const imageUrl = getImageUrl();

  // ✅ DÜZƏLDİLMİŞ ŞƏKİL YÜKLƏMƏ - BACKEND CAVAB FORMATINA UYĞUN
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("🔄 Şəkil yüklənməyə başladı:", file.name);

    // Validation
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      alert("Yalnız JPG, PNG və WEBP faylları!");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Fayl ölçüsü 2MB-dan böyükdür!");
      return;
    }

    // Preview
    const previewUrl = URL.createObjectURL(file);
    setTempPreview(previewUrl);

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      console.log("📤 Backend-ə göndərilir...");

      const response = await axios.put("/api/users/me/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Backend cavabı:", response.data);

      // ✅ BACKEND FORMATINI DÜZGÜN OXU
      // Format: { success: true, message: "...", user: {...} }
      if (response.data.success && response.data.user) {
        setUser(response.data.user);
        alert("✅ " + response.data.message);
      } else {
        // Əgər fərqli formatdırsa
        await fetchProfile(); // Profili yenidən yüklə
        alert("✅ Profil şəkli yeniləndi!");
      }

    } catch (error) {
      console.error("❌ Şəkil yükləmə xətası:", error);
      
      // ✅ BACKEND ERROR FORMATINI DÜZGÜN OXU
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.error ||
        error.message || 
        "Şəkil yüklənmədi!";
      
      alert("❌ " + errorMessage);
    } finally {
      setUploading(false);
      // Preview təmizlə
      setTimeout(() => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setTempPreview(null);
      }, 1000);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  // Profil məlumatlarını yenilə
  const handleSave = async () => {
    try {
      if (!user) return;

      const [currentFirst = "", currentLast = ""] = (user.full_name || "").split(" ");
      let nextFullName = user.full_name || "";
      
      if (editedData.first_name || editedData.last_name) {
        const fn = editedData.first_name ?? currentFirst;
        const ln = editedData.last_name ?? currentLast;
        nextFullName = `${fn} ${ln}`.trim();
      }

      const payload = {};
      if (nextFullName && nextFullName !== user.full_name) payload.full_name = nextFullName;
      if (editedData.phone && editedData.phone !== user.phone) payload.phone = editedData.phone;
      if (editedData.location && editedData.location !== user.location) payload.location = editedData.location;

      if (Object.keys(payload).length === 0) {
        alert("Dəyişiklik yoxdur.");
        return;
      }

      const res = await axios.put("/api/users/me", payload);
      
      // ✅ BACKEND FORMATINI OXU
      if (res.data.success && res.data.user) {
        setUser(res.data.user);
        setEditableFields({});
        setEditedData({});
        alert("✅ " + res.data.message);
      }

    } catch (err) {
      console.error("Yenilənmə xətası:", err);
      alert("❌ " + (err.response?.data?.message || "Məlumat yenilənmədi!"));
    }
  };
=======
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/users/me"); // BE: { user: { ... } } qaytarır kimi nəzərdə tutulub
        const me = res.data?.user || res.data?.data || null;
        setUser((prev) => ({ ...(prev || {}), ...me })); // merge et
        if (me?.image) localStorage.setItem("profile_image", me.image);
      } catch (err) {
        console.error("Profil məlumatı alınmadı:", err);
        alert(err?.response?.data?.message || "Profil məlumatı alınmadı");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // useEffect(() => {
  //   const savedImg = localStorage.getItem("profile_image");
  //   if (savedImg) {
  //     setUser((prev) => ({ ...prev, image: savedImg }));
  //   }
  // }, []);
>>>>>>> b1d335016ba9e1083705b603b164a99ba3eb0c94

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

<<<<<<< HEAD
  if (loading) return <p>Loading...</p>;
  
=======
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
        setApptsLoading(true);
        const res = await axios.get("/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllAppointments(res.data.data || res.data || []);
      } catch (err) {
        console.error("Randevular alınmadı:", err);
      } finally {
        setApptsLoading(false);
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
      setAllAppointments((prev) => [...prev, res.data.data || res.data]);
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



  const toDate = (iso) => {
    if (!iso) return null;
    const d = new Date(iso);
    return isNaN(d.getTime()) ? null : d;
  };


  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);



  // 🧮 Bölünmə: indidən sonrakılar upcoming, əvvəlkilər past
  const upcomingAppointments = useMemo(() => {
    const n = now;
    return (allAppointments || [])
      .filter(a => {
        const d = toDate(a.appointment_date);
        return d && d.getTime() > n;
      })
      .sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date));
  }, [allAppointments, now]);

  const pastAppointments = useMemo(() => {
    const n = now;
    return (allAppointments || [])
      .filter(a => {
        const d = toDate(a.appointment_date);
        return d && d.getTime() <= n;
      })
      .sort((a, b) => new Date(b.appointment_date) - new Date(a.appointment_date));
  }, [allAppointments, now]);




  const formatDateOnly = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return isNaN(d.getTime()) ? "—" : d.toLocaleDateString();
  };

  const Star = ({ filled }) => (
    <svg viewBox="0 0 24 24" className={filled ? styles.starFilled : styles.star} aria-hidden="true">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.25l-7.19-.62L12 2 9.19 8.63 2 9.25l5.46 4.72L5.82 21z" />
    </svg>
  );
  const Stars = ({ value = 0 }) => {
    const v = Math.max(0, Math.min(5, Math.round(value)));
    return (
      <div className={styles.stars} title={`${v}/5`}>
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} filled={i < v} />)}
      </div>
    );
  };


  useEffect(() => {
    const fetchReviews = async () => {
      if (!user) return;
      try {
        setReviewsLoading(true);

        const meId = String(user._id || user.id || "");
        const { data } = await axios.get("/api/reviews", {
          params: { user_id: meId, userId: meId },
        });
        const list = (data?.data || data || []);
        const mine = list.filter(rv => String(rv.user_id) === meId);
        setReviews(mine);
      } catch (err) {
        console.error("Reviews alınmadı:", err);
        setReviews([]);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [user]);



  useEffect(() => {
    const fetchMetas = async () => {
      if (!reviews?.length) return;

      const copy = { ...entityMetaMap };
      const tasks = [];

      const uniq = new Map();
      for (const r of reviews) {
        if (!r?.entity_type || !r?.entity_id) continue;
        const key = `${r.entity_type}:${r.entity_id}`;
        if (!uniq.has(key) && !copy[key]) {
          uniq.set(key, { type: r.entity_type, id: r.entity_id });
        }
      }
      if (!uniq.size) return;

      for (const [key, { type, id }] of uniq) {
        let url = null;
        if (type === "venue") url = `/api/venues/${id}`;
        else if (type === "partner") url = `/api/partners/${id}`;
        else if (type === "blog") url = `/api/blogs/${id}`;

        if (!url) {
          copy[key] = { name: type, location: "—" };
          continue;
        }

        tasks.push(
          axios.get(url)
            .then(({ data }) => {
              const payload = data?.data || data || {};
              const name = payload.name || payload.title || "—";
              const location = payload.location || payload.address || "—";
              copy[key] = { name, location };
            })
            .catch(() => {
              copy[key] = { name: type, location: "—" };
            })
        );
      }

      if (tasks.length) {
        await Promise.all(tasks);
        setEntityMetaMap(copy);
      }
    };

    fetchMetas();
  }, [reviews]);



  const handlePickImage = () => fileInputRef.current?.click();

  const handleUploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!/image\/(jpeg|jpg|png|webp)/.test(file.type)) {
      alert("Yalnız JPG/PNG/WEBP yükləyin");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      alert("Max 3MB icazə verilir");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      const fd = new FormData();
      fd.append("image", file);

      const response = await axios.put("/api/users/me/avatar", fd, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) => {
          if (evt.total)
            setUploadProgress(Math.round((evt.loaded * 100) / evt.total));
        },
      });

      const updated = response.data?.data || response.data?.user || response.data;

      setUser((prev) => ({ ...(prev || {}) }));

      if (updated?.image) {
        setUser((prev) => ({ ...(prev || {}), image: updated.image }));
        localStorage.setItem("profile_image", updated.image);
      }
      alert("Profil şəkli yeniləndi ✅");
    } catch (err) {
      console.error("Avatar upload xətası:", err);
      alert(err?.response?.data?.message || "Şəkil yüklənmədi");
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };




  if (loading && !user?.image) return <p>Loading...</p>;
>>>>>>> b1d335016ba9e1083705b603b164a99ba3eb0c94
  const [firstName = "", lastName = ""] = (user?.full_name || "").split(" ");

  return (
    <div className={styles.profilePage}>
      <section className={styles.myProfile}>
        <div className={styles.profileTitle}>
          <h2 className={styles.profileHeader}>Mənim Profilim</h2>
          <span className={styles.line}></span>
        </div>

        <div className={styles.profileContent}>
<<<<<<< HEAD
          <div className={styles.avatarWrapper}>
            <img 
              src={imageUrl} 
              alt="Profil şəkli" 
              className="profile-avatar" 
            />
            
            <button
              className={styles.avatarEditBtn}
              onClick={openFilePicker}
              disabled={uploading}
            >
              <Pencil size={16} />
            </button>

            {uploading && (
              <div className={styles.uploadOverlay}>
                <p>Yüklənir...</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className={styles.hiddenFileInput}
              onChange={handleAvatarChange}
=======
          <div className={styles.profileImageWrap}>
            <img
              src={
                user?.image ||
                "https://res.cloudinary.com/dzsjtq4zd/image/upload/v1756229683/default-avatar-icon-of-social-media-user-vector_abij8s.jpg"
              }
              alt="Profil şəkli"
              className={styles.profileImage}
>>>>>>> b1d335016ba9e1083705b603b164a99ba3eb0c94
            />

            <button
              type="button"
              className={styles.changePhotoBtn}
              onClick={handlePickImage}
              disabled={uploading}
              title="Profil şəklini dəyiş"
            >
              {uploading ? (
                `Yüklənir... ${uploadProgress}%`
              ) : (
                <img
                  src={cameraIcon}
                  alt="Kamera"
                  className={styles.cameraIcon}
                />
              )}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
              style={{ display: "none" }}
            />
          </div>


          <div className={styles.profileInfo}>
            <h3 className={styles.userName}>{user?.full_name}</h3>
            <p>
              <img src={locationVector} alt="" /> {user?.location || "—"}
            </p>
            <p>
              <img src={phoneVector} alt="" /> {user?.phone || "—"}
            </p>
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
                  value={editableFields.first_name ? editedData.first_name ?? "" : firstName}
                  onChange={(e) => handleChange("first_name", e.target.value)}
                />
                <Pencil className={styles.icon} onClick={() => handleEditClick("first_name")} />
              </div>
            </div>

            <div className={styles.field}>
              <label>Soyad</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  disabled={!editableFields.last_name}
                  value={editableFields.last_name ? editedData.last_name ?? "" : lastName}
                  onChange={(e) => handleChange("last_name", e.target.value)}
                />
                <Pencil className={styles.icon} onClick={() => handleEditClick("last_name")} />
              </div>
            </div>

            <div className={styles.field}>
              <label>Telefon</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  disabled={!editableFields.phone}
                  value={editableFields.phone ? editedData.phone ?? "" : user?.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                <Pencil className={styles.icon} onClick={() => handleEditClick("phone")} />
              </div>
            </div>

            <div className={styles.field}>
              <label>E-mail</label>
              <div className={styles.inputWrapper}>
                <input type="email" disabled value={user?.email || ""} readOnly />
              </div>
            </div>

            <div className={styles.field}>
              <label>Ünvan</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  disabled={!editableFields.location}
                  value={editableFields.location ? editedData.location ?? "" : user?.location || ""}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
                <Pencil className={styles.icon} onClick={() => handleEditClick("location")} />
              </div>
            </div>
          </div>

          <button className={styles.saveBtn} onClick={handleSave}>
            Tamamla
          </button>
        </div>
      </section>
<<<<<<< HEAD
=======

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
          {upcomingAppointments.length === 0 ? (
            <p>Heç bir randevu yoxdur</p>
          ) : (
            upcomingAppointments.map((appt) => {
              const dt = toDate(appt.appointment_date);
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

        <div style={{ display: "flex", gap: "20px" }}>
          <button
            className={styles.addAppointmentBtn}
            onClick={() => setShowAddModal(true)}
          >
            Əlavə et
          </button>
          <button
            className={styles.pastBtn}
            onClick={() => setShowPastDrawer(true)}
          >
            Keçmiş randevular
          </button>
        </div>

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



      {showPastDrawer && (
        <div
          className={styles.sideModalOverlay}
          onClick={() => setShowPastDrawer(false)}
        >
          <div
            className={styles.sideModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.sideModalHeader}>
              <h3>Keçmiş randevular</h3>
              <X className={styles.sideModalClose} onClick={() => setShowPastDrawer(false)} />
            </div>

            <div className={styles.sideModalBody}>
              {apptsLoading ? (
                <p>Yüklənir...</p>
              ) : pastAppointments.length === 0 ? (
                <p>Keçmiş randevu tapılmadı</p>
              ) : (
                pastAppointments.map((appt) => {
                  const dt = appt.appointment_date ? new Date(appt.appointment_date) : null;
                  return (
                    <div key={appt.id || appt._id} className={styles.pastCard}>
                      <h4>{appt.purpose}</h4>
                      <div className={styles.pastMeta}>
                        <span>{dt ? dt.toLocaleString() : appt.appointment_date}</span>
                        <span>{appt.venue_name}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}


      {/* Section 4 */}

      <section className={styles.reviews}>
        <div className={styles.sectionHeader}>
          <h2>Qiymətləndirmələr</h2>
          <span className={styles.line}></span>
        </div>


        {reviewsLoading ? (
          <p>Yüklənir...</p>
        ) : !reviews.length ? (
          <p>Hələ rəy yoxdur</p>
        ) : (
          <div className={styles.reviewsGrid}>
            {[...reviews]
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((rv) => {
                const k = `${rv.entity_type}:${rv.entity_id}`;
                const meta = entityMetaMap[k] || {};
                const title = meta.name || rv.entity_type;
                const location = meta.location || "—";
                const dateOnly = formatDateOnly(rv.created_at);

                return (
                  <div key={`${rv.entity_type}-${rv.entity_id}-${rv.user_id}`} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <h3 className={styles.reviewTitle}>{title}</h3>
                    </div>

                    <div className={styles.reviewBody}>
                      <Stars value={rv.rating} />
                      <div className={styles.reviewRow}>
                        <span className={styles.reviewLabel}>Tarix:</span>
                        <span className={styles.reviewValue}>{dateOnly}</span>
                      </div>
                      <div className={styles.reviewRow}>
                        <span className={styles.reviewLabel}>Ünvan:</span>
                        <span className={styles.reviewValue}>{location}</span>
                      </div>
                    </div>

                    <div className={styles.reviewFooter}>
                      <button
                        className={styles.repeatBtn}
                        onClick={() => alert(`Təkrar et: ${title} (${rv.rating}/5)`)}
                        title="Eyni qiymətləndirməni təkrar et"
                      >
                        Təkrar et
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </section>

>>>>>>> b1d335016ba9e1083705b603b164a99ba3eb0c94
    </div>
  );
};

export default Profile;