function InputField({ label, type, name, value, onChange, error, required }) {
  return (
    <div className="mb-3">
      <label className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-control ${error ? "is-invalid" : ""}`}
      />

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default InputField;
