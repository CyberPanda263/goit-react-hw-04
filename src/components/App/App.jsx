import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGalery";
import fetchGalery from "../servises/gallery-api";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoaderMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrrorMassage";

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState("");

  const openModal = (imageUrl) => {
    setCurrentImg(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImg("");
  };

  useEffect(() => {
    const getPhotos = async () => {
      if (!query) {
        return;
      }
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetchGalery(query, page, 12);
        setResults((prev) => [...prev, ...response.results]);
        setTotal(response.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPhotos();
  }, [query, page]);

  const handleSetQuery = (query) => {
    setQuery(query);
    setResults([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSetQuery} />
      {isError && <ErrorMessage />}
      <ImageGallery items={results} onImageClick={openModal} />
      {isLoading && <Loader />}
      {total > page && !isLoading && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
      <Toaster
       position="top-right"
       reverseOrder={false}
       />
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        imageUrl={currentImg}
      />
    </>
  );
};

export default App;