import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  useEffect(() => {
    fetchContacts(); // 🔥 THIS IS REQUIRED
  }, []);

  return (
    <div className="container mt-4">
      <ContactForm refreshContacts={fetchContacts} />
      <ContactList contacts={contacts} refreshContacts={fetchContacts} />
    </div>
  );
}

export default App;
