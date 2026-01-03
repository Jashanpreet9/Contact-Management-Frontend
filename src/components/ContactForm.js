import { useState } from "react";
import axios from "axios";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import SuccessAlert from "./SuccessAlert";

const initialState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function ContactForm({ refreshContacts }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const emailRegex = /^\S+@\S+\.\S+$/;

  const validate = () => {
    let temp = {};

    if (!form.name.trim()) temp.name = "Name is required";
    if (!form.phone.trim()) temp.phone = "Phone is required";

    if (form.email && !emailRegex.test(form.email)) {
      temp.email = "Please enter a valid email address";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // live email validation
    if (name === "email") {
      setErrors({
        ...errors,
        email:
          value && !emailRegex.test(value)
            ? "Please enter a valid email address"
            : "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await axios.post("http://localhost:5000/api/contacts", form);

    setSuccess("✅ Contact saved successfully!");
    setForm(initialState);
    setErrors({});
    refreshContacts();

    setTimeout(() => setSuccess(""), 3000);
  };

  const isFormValid =
    form.name && form.phone && (!form.email || emailRegex.test(form.email));

  return (
    <div className="row justify-content-center">
      <div className="col-lg-6 col-md-8">
        <div className="card custom-card p-4 mb-4">
          <h4 className="text-center mb-3">Add Contact</h4>

          {success && <SuccessAlert message={success} />}

          <form onSubmit={handleSubmit} noValidate>
            <InputField
              label="Name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <InputField
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />

            <InputField
              label="Phone"
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />

            <TextAreaField
              label="Message (Optional)"
              name="message"
              value={form.message}
              onChange={handleChange}
            />

            <button
              className={`btn w-100 mt-2 ${
                isFormValid
                  ? "btn-primary active-btn"
                  : "btn-secondary disabled-btn"
              }`}
              disabled={!isFormValid}
            >
              Submit Contact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
