import "../styles.scss";

interface CarouselItemProps {
  wth?: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ children, wth }) => (
  <div className="carousel-item" style={{ width: wth }}>
    {children}
  </div>
);

export default CarouselItem;
