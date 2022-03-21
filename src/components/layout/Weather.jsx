import styles from "./Weather.module.css";

export default function Weather({
  city,
  temp,
  tempMin,
  tempMax,
  description,
  weatherIcon,
  dt,
  humidity,
  speed,
  clouds
}) {
  const minMaxTemp = (min, max) => {
    if (min && max) {
      return (
        <div className={styles.right_info}>
          <h5>
            <p className="px-4">Min: {min}&deg;</p>
            <p className="px-4">Max: {max}&deg;</p>
          </h5>
        </div>
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_card}>
        <div className={styles.card_info}>
          <div className={styles.info_top}>
            <div className={styles.city}>
              <span>{city}</span>
            </div>
            <div className={styles.horas}>
              <span>{dt}</span>
            </div>
          </div>

          <div className={styles.temperatura}>
            <div className={styles.icon}>
              <h5 className="pt-5 pb-2">
                <i className={`wi ${weatherIcon} display-2`}></i>
              </h5>
            </div>
            <div className={styles.info_temp}>
              <span className="py-4">{description}</span>
              {temp ? <h1 className="py-2 display-3">{temp}&deg;</h1> : null}
            </div>
          </div>

          <div className={styles.more_info}>
            <div className={styles.left_info}>
              <h5>
                {speed ? 
                <div>
                    <i className="wi wi-strong-wind"></i>
                    <span> {speed} km/h</span>
                </div> : null} 
              </h5>
              <h5>
                
                {humidity ? 
                <div>
                    <i className="wi wi-humidity pl-3"></i>
                    <span className={styles.pl}>{humidity} %</span>
                </div> : null}
              </h5>

              <h5>
                {clouds ? 
                <div>
                    <i className="wi wi-cloudy"></i>
                    <span className={styles.pl_2}> {clouds} %</span>
                </div>: null}
              </h5>

            </div>

            {minMaxTemp(tempMin, tempMax)}
          </div>
        </div>
      </div>
    </div>
  );
}
