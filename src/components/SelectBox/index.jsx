import React from "react";

import styles from "./index.module.scss";

function SelectBox({
  icon: Icon,
  label,
  name,
  register,
  onChange,
  list,
  ...props
}) {
  return (
    <div className={styles.formInputContainer}>
      <label className={styles.formInputLabel} htmlFor={name}>
        {label}
      </label>
      <div className={styles.formInputContent}>
        <select
          className={styles.formInputField}
          id={name}
          name={name}
          required
          {...register(name)}
        >
          {list.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
        <label className={styles.formInputIconContainer} htmlFor={name}>
          <Icon className={styles.formInputIcon} />
        </label>
      </div>
    </div>
  );
}

export default SelectBox;
