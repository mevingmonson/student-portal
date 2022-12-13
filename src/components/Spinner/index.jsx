import React from "react";
import ReactLoading from "react-loading";

import styles from "./index.module.scss";

function Spinner() {
  return (
    <div className={styles.page}>
      <div className={styles.pageContent}>
        <ReactLoading type="spin" color="#2f588e" />
      </div>
    </div>
  );
}

export default Spinner;
