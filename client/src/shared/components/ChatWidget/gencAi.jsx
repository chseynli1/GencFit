import React, { useState } from 'react'
import styles from './GencAi.module.scss'
import { useTranslation } from 'react-i18next';
const GencAi = ({ onClose }) => {
    const { t, ready } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const mockAIResponse = (text) => {
        if (text.toLowerCase().includes("qeydiyyat")) {
            return "Qeydiyyatla bağlı sizə kömək edə bilərəm!";
        }
        return "Sualınızı aldım! Əlimdən gələni edəcəyəm.";
    };

    if (!ready) return null

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg = { type: "user", text: input };
        const aiMsg = { type: "ai", text: mockAIResponse(input) };

        setMessages([...messages, userMsg, aiMsg]);
        setInput("");
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2>{t('ai.title')}</h2>
                <button onClick={onClose}>✖</button>
            </div>

            <div className={styles.content}>
                {messages.map((msg, index) => (
                    <p
                        key={index}
                        className={msg.type === 'user' ? styles.user : styles.ai}
                    >
                        <strong>{msg.type === 'user' ? 'Siz' : 'GəncAI'}:</strong> {msg.text}
                    </p>
                ))}
            </div>

            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    placeholder={t('ai.placeholder')}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend}>{'>'}</button>
            </div>

            <div className={styles.tabBar}>
                <div className={styles.tabItem}>
                    <span>🏠</span>
                    <p>{t('tabs.home')}</p>
                </div>
                <div className={`${styles.tabItem} ${styles.active}`}>
                    <span>⭐</span>
                    <p>{t('tabs.ai')}</p>
                </div>
                <div className={styles.tabItem}>
                    <span>➕</span>
                    <p>{t('tabs.messages')}</p>
                </div>
            </div>
        </div>
    )
}

export default GencAi
