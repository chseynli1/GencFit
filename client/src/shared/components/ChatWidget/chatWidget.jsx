import React, { useState } from 'react';
import styles from './ChatWidget.module.scss';
import GencAI from './GencAI';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && <GencAI onClose={toggleWidget} />}
      
      <button className={styles.floatingButton} onClick={toggleWidget}>
        💬
      </button>
    </>
  );
};

export default ChatWidget;
