import { Urls } from '../../constants/Urls'
import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next'
import logo from "../../../assets/images/gencfit.png"
import GlobeIcon from '@/assets/images/LanguageSelector.svg';
import { FiSearch } from 'react-icons/fi'
import { useSearch } from '@/context/SearchContext';

const Header = ({ onSearchResults }) => {
    const { setResults } = useSearch();
    const [isOpen, setIsOpen] = React.useState(false)
    const [langMenuOpen, setLangMenuOpen] = React.useState(false)
    const [searchOpen, setSearchOpen] = React.useState(false)
    const [searchText, setSearchText] = React.useState("")
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [userInitials, setUserInitials] = React.useState("U");
    const navigate = useNavigate();
    const searchRef = useRef(null)
    const { i18n, t, ready } = useTranslation()

    const toggleMenu = () => setIsOpen(prev => !prev)
    const toggleLangMenu = () => setLangMenuOpen(prev => !prev)
    const toggleSearch = () => setSearchOpen(prev => !prev)

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang)
        setLangMenuOpen(false)
    }

    const categories = [
        {
            name: "Yoqa və meditasiya",
            count: "8 zal",
            image: "/images/yoqa.jpg"
        },
        {
            name: "Fitness",
            count: "20 zal",
            image: "/images/fitness.jpg"
        },
        {
            name: "Rəqs kursları",
            count: "12 zal",
            image: "/images/dance.jpg"
        },
        {
            name: "Şahmat",
            count: "22 klub",
            image: "/images/chess.jpg"
        },
        {
            name: "Döyüş sənətləri",
            count: "17 zal",
            image: "/images/fight.jpg"
        },
        {
            name: "Oxçuluq",
            count: "10 klub",
            image: "/images/archery.jpg"
        },
        {
            name: "Karting",
            count: "4 mərkəz",
            image: "/images/karting.jpg"
        },
        {
            name: "Atçılıq",
            count: "5 mərkəz",
            image: "/images/horse.jpg"
        }
    ]



    useEffect(() => {
        if (searchText.trim()) {
            const filtered = categories.filter(item =>
                item.name.toLowerCase().includes(searchText.toLowerCase())
            )
            onSearchResults(filtered)
        } else {
            onSearchResults([])
        }
    }, [searchText])

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();

        if (searchText.trim()) {
            const filtered = categories.filter(item =>
                item.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    };


    useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedLogin);

    const fullName = localStorage.getItem("fullName");
    if (fullName) {
        const names = fullName.split(" ");
        const initials = names.map(n => n[0].toUpperCase()).join("");
        setUserInitials(initials);
    }

    const handleLoginChange = () => {
        const status = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(status);

        const fullName = localStorage.getItem("fullName");
        if (fullName) {
            const names = fullName.split(" ");
            const initials = names.map(n => n[0].toUpperCase()).join("");
            setUserInitials(initials);
        } else {
            setUserInitials("U"); // default
        }
    };

    window.addEventListener("loginStatusChanged", handleLoginChange);
    return () => {
        window.removeEventListener("loginStatusChanged", handleLoginChange);
    };
}, []);


    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        setIsLoggedIn(false);
        navigate("/");
        window.dispatchEvent(new Event("loginStatusChanged"));
    };



    if (!ready) return null

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img className={styles.logoImg} src={logo} />
            </div>

            <button className={styles.burger} onClick={toggleMenu}>
                ☰
            </button>

            <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
                <Link to={Urls.HOME}>{t('home')}</Link>
                <Link to={Urls.ABOUT}>{t('about')}</Link>
                <Link to={Urls.GYMS}>{t('gyms')}</Link>
                <Link to={Urls.PARTNERS}>{t('partners')}</Link>
                <Link to={Urls.BLOG}>{t('blog')}</Link>
                <Link to={Urls.CONTACT}>{t('contact')}</Link>
            </nav>

            <div className={styles.languageWrapper}>

                <div
                    className={`${styles.searchWrapper} ${searchOpen ? styles.open : ''}`}
                    ref={searchRef}
                >
                    {!searchOpen && (
                        <button className={styles.searchBtn} onClick={toggleSearch}>
                            <FiSearch size={20} />
                        </button>
                    )}

                    {searchOpen && (
                        <form onSubmit={handleSearch} className={styles.searchForm}>
                            <input
                                type="text"
                                placeholder={t('search')}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                autoFocus
                            />
                            <button type="submit">
                                <FiSearch size={20} />
                            </button>
                        </form>
                    )}
                </div>
                <div className={styles.languageSelector}>
                    <button onClick={toggleLangMenu} className={styles.langBtn}>
                        <img src={GlobeIcon} alt="language selector" width={24} height={24} />
                    </button>
                    {langMenuOpen && (
                        <ul className={styles.dropdown}>
                            <li onClick={() => handleLanguageChange('az')}>AZ</li>
                            <li onClick={() => handleLanguageChange('en')}>EN</li>
                            <li onClick={() => handleLanguageChange('ru')}>RU</li>
                        </ul>
                    )}
                </div>


                <div className={styles.authWrapper}>
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile">
                                <button className={styles.profileCircleBtn}>
                                    {userInitials}
                                </button>
                            </Link>

                            <button onClick={handleLogout} className={styles.register}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to={Urls.LOGIN}>
                            <button className={styles.register}>
                                {t('registerText')}
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
