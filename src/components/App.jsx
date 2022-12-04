import { useEffect, useState } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { API } from './Servises/API';

import css from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [queryArr, setQueryArr] = useState([]);
  const [largeImg, setLargeImg] = useState('');
  const [isModalShown, setIsModalShown] = useState(false);
  const [queryStatus, setQueryStatus] = useState('idle');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalImage, setTotalImage] = useState(0);

  const onSubmit = name => {
    setQuery(name);
    setCurrentPage(1);
    setLargeImg('');
    setQueryArr([]);
  };

  const toggleModal = () => {
    setIsModalShown(prevState => !prevState);
  };

  const onGalleryItemClick = src => {
    toggleModal();
    setLargeImg(src);
  };

  const loadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (query.length === 0) {
      return;
    }

    try {
      setQueryStatus('pending');
      API(query, currentPage).then(res => {
        if (res.data.hits.length === 0) {
          setQueryStatus('idle');
          return window.alert(
            'Sorry, there are no images matching your search query. Please try again'
          );
        }
        setQueryArr(prevState => [...prevState, ...res.data.hits]);
        setQueryStatus('idle');
        setTotalImage(res.data.total);
      });
    } catch (error) {
      console.log(error);
      window.alert('Something wrong');
    }
  }, [query, currentPage]);

  return (
    <section className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery queryArr={queryArr} click={onGalleryItemClick} />
      {0 < queryArr.length && queryArr.length < totalImage && (
        <Button onClick={loadMore} />
      )}
      {isModalShown && (
        <Modal src={largeImg} close={toggleModal} isModalShown={isModalShown} />
      )}
      {queryStatus === 'pending' && <Loader />}
    </section>
  );
};
