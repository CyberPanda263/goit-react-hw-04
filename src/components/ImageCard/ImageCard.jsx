import css from './ImageCard.module.css'

const ImageCard = ({ item, onClick }) => {
    return (
      <div className={css.imageCard}>
        <img
          className={css.imageCardItem}
          src={item.urls.small}
          alt={item.slug}
          onClick={() => onClick(item.urls.regular)}
        />
      </div>
    );
  };
  
  export default ImageCard;
  