import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from 'lucide-react';
import styles from './Contact.module.css';

const Contact = () => {
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const handleClear = () => {
    // Logic to clear the form fields
  };

  const handleSubmit = (event: React.FormEvent) => { // Add handleSubmit function
    event.preventDefault(); // Prevent default form submission
    // Logic to handle form submission (e.g., API call)
    setSuccessMessage('Your message has been sent!'); // Set success message
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <CardContent className={styles.scrollableContent}>
          <h2 className={styles.title}>Let's Work Together</h2>
          {successMessage && <p>{successMessage}</p>} {/* Display success message */}
          <div className={styles.infoContainer}>
            <div className={styles.infoItem}>
              <Phone className={styles.icon} />
              <p>(+995) 551 21 55 57</p>
            </div>
            <div className={styles.infoItem}>
              <Mail className={styles.icon} />
              <p>mamuka.khokerashvili00@gmail.com</p>
            </div>
            <div className={styles.infoItem}>
              <MapPin className={styles.icon} />
              <p>Saqartvelos Mebrdzolta Qucha</p>
            </div>
          </div>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <Input type="text" name="firstname" placeholder="First Name" required className={styles.input} />
              <Input type="text" name="lastname" placeholder="Last Name" required className={styles.input} />
            </div>
            <div className={styles.formGroup}>
              <Input type="email" name="email" placeholder="Email Address" required className={styles.input} />
              <Input type="tel" name="phone" placeholder="Phone Number" className={styles.input} />
            </div>
            <Textarea name="message" placeholder="Type your message here" required className={styles.textarea} />
            <div className={styles.formGroup}>
              <Button type="button" onClick={handleClear} className={styles.submitButton}>Clear</Button>
              <Button type="submit" className={styles.submitButton}>Send Message</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
