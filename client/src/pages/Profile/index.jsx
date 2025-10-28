// Profile.jsx - BACKEND FORMATINA UYĞUN VERSİYA
import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const [uploading, setUploading] = useState(false);
  const [tempPreview, setTempPreview] = useState(null);
  const fileInputRef = useRef(null);

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
    </div>
  );
};

export default Profile;