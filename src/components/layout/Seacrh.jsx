import React from "react";
import styles from "./Search.module.css";

export default function Search({ loadWeather, error }) {
  return (
    <div className={styles.container}>
      <form onSubmit={loadWeather}>
        <div className={styles.input_container}>
          <div className={styles.input}>
            <input
              type="text"
              name="city"
              placeholder="Digite a sua cidade"
              autoComplete="off"
              className={styles.inputCity}
            />
          </div>

          <div>
            <button className={styles.button}>Procurar</button>
          </div>
        </div>
      </form>
    </div>
  );
}
