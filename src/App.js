import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const res = await axios.get(
      "http://contact-management-qbvz.onrender.com/api/contacts"
    );
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container-fluid mt-4">
      <h1 className="text-center mb-4">Contact Management App</h1>

      <div className="row">
        {/* LEFT SIDE – FORM */}
        <div className="col-lg-5 col-md-12 mb-4">
          <ContactForm refreshContacts={fetchContacts} />
        </div>

        {/* RIGHT SIDE – LIST */}
        <div className="col-lg-7 col-md-12">
          <ContactList contacts={contacts} refreshContacts={fetchContacts} />
        </div>
      </div>
    </div>
  );
}

export default App;
