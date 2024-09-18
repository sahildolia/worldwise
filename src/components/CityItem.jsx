import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "./contexts/CitiesContext";
function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  const {currentCity} = useCities()
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  return (
    <Link
      className={`${styles.cityItem} ${
        id === currentCity.id ? styles["cityItem--active"] : ""
      }`}
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}
    >
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </Link>
  );
}

export default CityItem;
