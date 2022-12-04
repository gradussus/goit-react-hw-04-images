// import { useEffect } from 'react';
import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ close, src }) => {
  useEffect(() => {
    const onEscapeClick = e => {
      if (e.code === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', onEscapeClick);
    return () => window.removeEventListener('keydown', onEscapeClick);
  }, [close]);

  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <div className={css.Overlay} onClick={onBackdropClick}>
      <div>
        <img className={css.Modal} src={src} alt="" />
      </div>
    </div>
  );
};
