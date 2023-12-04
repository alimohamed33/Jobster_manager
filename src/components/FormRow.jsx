const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <article className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      />
    </article>
  );
};
export default FormRow;
