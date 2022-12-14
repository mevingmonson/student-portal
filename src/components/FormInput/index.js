import styles from "./index.module.scss";
import PropTypes from "prop-types";

function FormInput({ icon: Icon, label, name, register, ...props }) {
  return (
    <div className={styles.formInputContainer}>
      <label className={styles.formInputLabel} htmlFor={name}>
        {label}
      </label>
      <div className={styles.formInputContent}>
        <input
          className={styles.formInputField}
          id={name}
          name={name}
          required
          {...register(name)}
          {...props}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.formInputIconContainer} htmlFor={name}>
          <Icon className={styles.formInputIcon} />
        </label>
      </div>
    </div>
  );
}

FormInput.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
};

export default FormInput;
