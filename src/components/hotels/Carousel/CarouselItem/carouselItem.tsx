import "../styles.scss";

interface CarouselItemProps {
  width?: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ children, width }) => (
  <div className="carousel-item" style={{ width }}>
    {children}
  </div>
);

export default CarouselItem;
