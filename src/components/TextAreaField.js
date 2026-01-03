function TextAreaField({ label, name, value, onChange }) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <textarea
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextAreaField;
