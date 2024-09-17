// import CityItem from "./CityItem";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import { useCities } from "./contexts/CitiesContext";
import Message from "./Message";
import Spinner from "./Spinner";
function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message={"Add cities by clicking on the map"} />;
  return (
    <ul className={styles.CityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
