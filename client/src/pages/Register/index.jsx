import { Input, Button } from "antd";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import RenderIf from "@/shared/components/RenderIf";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "antd/dist/reset.css";
import styles from "./Register.module.scss";
import registerImg from "@/assets/images/registerImg.png";
import api from "@/api";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const { t, ready } = useTranslation();
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      location: "",
    },
  });

  if (!ready) return null;

  const onSubmit = async (data) => {
    try {
      const payload = {
        full_name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        phone: data.phone,
        location: data.location,
      };

      const res = await api.post("/auth/register", payload);

      toast.success("Qeydiyyat uğurlu oldu!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Xəta baş verdi!");
    }
  };


  return (
    <div className={styles.register}>
      <div className={styles.registerLeft}>
        <img className={styles.registerImg} src={registerImg} alt="" />
      </div>
      <div className={styles.registerRight}>
        <div className={styles.registerDiv}>
          <h2 className={styles.registerDivh2}>{t("register.title")}</h2>
        </div>
        <form
          className={styles.registerRightForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.inputWrap}>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: t("register.errors.firstName") }}
              render={({ field }) => (
                <Input
                  className={styles.registerFormInp}
                  {...field}
                  placeholder={t("register.firstName")}
                  status={errors.firstName ? "error" : ""}
                />
              )}
            />
            <RenderIf condition={errors.firstName?.message}>
              <span className={styles.errorMessage}>
                {errors.firstName?.message}
              </span>
            </RenderIf>
          </div>

          <div className={styles.inputWrap}>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: t("register.errors.lastName") }}
              render={({ field }) => (
                <Input
                  className={styles.registerFormInp}
                  {...field}
                  placeholder={t("register.lastName")}
                  status={errors.lastName ? "error" : ""}
                />
              )}
            />
            <RenderIf condition={errors.lastName?.message}>
              <span className={styles.errorMessage}>
                {errors.lastName?.message}
              </span>
            </RenderIf>
          </div>

          <div className={styles.inputWrap}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: t("register.errors.contactRequired"),
                pattern: {
                  value: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: t("register.errors.contactInvalid"),
                },
              }}
              render={({ field }) => (
                <Input
                  className={styles.registerFormInp}
                  {...field}
                  placeholder={t("register.contact")}
                  status={errors.email ? "error" : ""}
                />
              )}
            />
            <RenderIf condition={errors.email?.message}>
              <span className={styles.errorMessage}>
                {errors.email?.message}
              </span>
            </RenderIf>
          </div>


          <div className={styles.inputWrap}>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Telefon nömrəsi tələb olunur",
                pattern: {
                  value: /^\+?\d{7,15}$/,
                  message: "Düzgün telefon nömrəsi daxil edin",
                },
              }}
              render={({ field }) => (
                <Input
                  className={styles.registerFormInp}
                  {...field}
                  placeholder="Telefon nömrəsi"
                  status={errors.phone ? "error" : ""}
                />
              )}
            />
            <RenderIf condition={errors.phone?.message}>
              <span className={styles.errorMessage}>{errors.phone?.message}</span>
            </RenderIf>
          </div>

          <div className={styles.inputWrap}>
            <Controller
              name="location"
              control={control}
              rules={{
                required: "Yaşadığın yer tələb olunur",
              }}
              render={({ field }) => (
                <Input
                  className={styles.registerFormInp}
                  {...field}
                  placeholder="Şəhər, Ölkə (məs: Bakı, Azərbaycan)"
                  status={errors.location ? "error" : ""}
                />
              )}
            />
            <RenderIf condition={errors.location?.message}>
              <span className={styles.errorMessage}>{errors.location?.message}</span>
            </RenderIf>
          </div>


          <div className={styles.inputWrap}>
            <Controller
              name="password"
              control={control}
              rules={{
                required: t("register.errors.password"),
                minLength: {
                  value: 6,
                  message: t("register.errors.minPassword"),
                },
              }}
              render={({ field }) => (
                <Input.Password
                  className={styles.registerFormInp}
                  {...field}
                  placeholder={t("register.password")}
                  status={errors.password ? "error" : ""}
                />
              )}
            />
            <RenderIf condition={errors.password?.message}>
              <span className={styles.errorMessage}>
                {errors.password?.message}
              </span>
            </RenderIf>
          </div>

          <Button
            type="primary"
            className={styles.registerFormBtn}
            htmlType="submit"
          >
            <span>{t("register.submit")}</span>
          </Button>
        </form>

        <div className={styles.socialSection}>
          <div className={styles.divider}>
            <span className={styles.dividerText}>{t("register.or")}</span>
          </div>

          <div className={styles.socialAuth}>
            <GoogleLogin
              onSuccess={(credentialRespone) => {
                navigate("/");
              }}
              onError={console.log("login failled")}
              auto_select={true}
            />
            {/* <Button
              className={styles.socialBtn}
              icon={<img src={apple} alt="Apple" />}
              block
              onClick={handleAppleAuth}
            >
              {t("register.apple")}
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;