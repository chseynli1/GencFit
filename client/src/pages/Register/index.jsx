import { Input, Button } from 'antd'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import RenderIf from '@/shared/components/RenderIf'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import 'antd/dist/reset.css'
import styles from './Register.module.scss'
import registerImg from "@/assets/images/registerImg.png"
import google from "@/assets/images/google.png"
import apple from "@/assets/images/apple.png"
import api from "@/api" 

const Register = () => {
  const { t, ready } = useTranslation()
  const navigate = useNavigate()

  const { control, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      contact: '',  
      password: '',
    }
  })

  if (!ready) return null

  const onSubmit = async (data) => {
    try {
      const payload = {
        full_name: `${data.firstName} ${data.lastName}`, 
        email: data.contact, 
        password: data.password
      }

      const res = await api.post("/auth/register", payload)

      toast.success("Qeydiyyat uğurlu oldu!")
      navigate('/login')
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || "Xəta baş verdi!")
    }
  }

  const handleGoogleAuth = () => {
      window.location.href = "http://localhost:8001/api/auth/google"
  }

  const handleAppleAuth = () => {
    window.location.href = "http://localhost:8001/api/auth/apple"
  }

  return (
    <div className={styles.register}>
      <div className={styles.registerLeft}>
        <img className={styles.registerImg} src={registerImg} alt="" />
      </div>
      <div className={styles.registerRight}>
        <div className={styles.registerDiv}>
          <h2 className={styles.registerDivh2}>{t('register.title')}</h2>
        </div>
        <form className={styles.registerRightForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrap}>
            <Controller
              name='firstName'
              control={control}
              rules={{ required: t('register.errors.firstName') }}
              render={({ field }) => (
                <Input
                  className={styles.registerFormInp}
                  {...field}
                  placeholder={t('register.firstName')}
                  status={errors.firstName ? 'error' : ''}
                />
              )}
            />
            <RenderIf condition={errors.firstName?.message}>
              <span className={styles.errorMessage}>{errors.firstName?.message}</span>
            </RenderIf>
          </div>

          <div className={styles.inputWrap}>
            <Controller
              name='lastName'
              control={control}
              rules={{ required: t('register.errors.lastName') }}
              render={({ field }) => (
                <Input
                  className={styles.registerFormInp}
                  {...field}
                  placeholder={t('register.lastName')}
                  status={errors.lastName ? 'error' : ''}
                />
              )}
            />
            <RenderIf condition={errors.lastName?.message}>
              <span className={styles.errorMessage}>{errors.lastName?.message}</span>
            </RenderIf>
          </div>

          <div className={styles.inputWrap}>
            <Controller
              name='contact'
              control={control}
              rules={{
                required: t('register.errors.contactRequired'),
                pattern: {
                  value: /^((\+?\d{9,15})|([\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}))$/,
                  message: t('register.errors.contactInvalid')
                }
              }}
              render={({ field }) => (
                <Input
                  className={styles.registerFormInp}
                  {...field}
                  placeholder={t('register.contact')}
                  status={errors.contact ? 'error' : ''}
                />
              )}
            />
            <RenderIf condition={errors.contact?.message}>
              <span className={styles.errorMessage}>{errors.contact?.message}</span>
            </RenderIf>
          </div>

          <div className={styles.inputWrap}>
            <Controller
              name='password'
              control={control}
              rules={{
                required: t('register.errors.password'),
                minLength: { value: 6, message: t('register.errors.minPassword') }
              }}
              render={({ field }) => (
                <Input.Password
                  className={styles.registerFormInp}
                  {...field}
                  placeholder={t('register.password')}
                  status={errors.password ? 'error' : ''}
                />
              )}
            />
            <RenderIf condition={errors.password?.message}>
              <span className={styles.errorMessage}>{errors.password?.message}</span>
            </RenderIf>
          </div>

          <Button type='primary' className={styles.registerFormBtn} htmlType='submit'>
            <span>{t('register.submit')}</span>
          </Button>
        </form>

        <div className={styles.socialSection}>
          <div className={styles.divider}>
            <span className={styles.dividerText}>{t('register.or')}</span>
          </div>

          <div className={styles.socialAuth}>
            <Button className={styles.socialBtn}  icon={<img src={google} alt="Google" />} block onClick={handleGoogleAuth}>
              {t('register.google')}
            </Button>
            <Button className={styles.socialBtn} icon={<img src={apple} alt="Apple" />} block onClick={handleAppleAuth}>
              {t('register.apple')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
