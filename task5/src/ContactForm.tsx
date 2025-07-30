import React from "react";
import { useForm } from "react-hook-form";
import "./ContactForm.css";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log("Form Submitted:", data);
    alert("Message sent successfully!");
    reset(); // Clear form after successful submission
  };

  return (
    <div className="contact-container">
      <form
        className="contact-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2>Contact Us</h2>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register("name", { required: "Name is required" })}
          placeholder="Your name"
        />
        {errors.name && <span className="error">{errors.name.message}</span>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
          placeholder="your@example.com"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          {...register("message", { required: "Message is required" })}
          placeholder="Your message..."
        />
        {errors.message && (
          <span className="error">{errors.message.message}</span>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {isSubmitSuccessful && (
          <p className="success">Thanks for contacting us!</p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
