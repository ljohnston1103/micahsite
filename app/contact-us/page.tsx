export default function ContactUs() {
  return (
    <main className="pageShell">
      <section className="pageHero compactHero">
        <div>
          <p className="eyebrow">Contact Us</p>
          <h1>Ready For A Cleaner Yard?</h1>
          <p className="contactLead">
            Tell us about your property, how many dogs you have, and what kind
            of cleanup you need. We will follow up with scheduling details and
            the best service option for your yard.
          </p>
          <p className="contactLead">
            Call or text Micah Johnston at{" "}
            <a className="inlineLink" href="tel:3308159903">
              330-815-9903
            </a>
            .
          </p>
          <p className="contactLead">
            Email{" "}
            <a
              className="inlineLink"
              href="mailto:micahabel723@gmail.com"
            >
              micahabel723@gmail.com
            </a>
            .
          </p>
        </div>
        <div
          className="featureImage contactFeature pooPhotoPanel"
          role="img"
          aria-label="Customer service desk with phone and notebook"
        >
          <span>Serving Canton, Jackson, Canal Fulton, Manchester, and Akron</span>
        </div>
      </section>

      <section className="section splitSection contactSection">
        <div className="sectionText">
          <p className="eyebrow">Book The Poo Crew</p>
          <h2 className="contactInstructions">
            Send the basics and we will get your cleanup on the route.
          </h2>
          <p>
            Monthly plans start at $60 for 1 dog and $80 for 2 dogs. Each
            extra dog is +$10/month, and 6-month prepaid plans save 10%.
          </p>
        </div>
        <form
          className="contactForm"
          action="https://formsubmit.co/micahabel723@gmail.com"
          method="POST"
        >
          <input
            type="hidden"
            name="_subject"
            value="New Poo Crew contact form message"
          />
          <input type="hidden" name="_template" value="table" />
          <input
            className="honeypotField"
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
          />
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Phone
            <input
              type="tel"
              name="phone"
              placeholder="330-815-9903"
              required
            />
          </label>
          <label>
            Service Address
            <input
              type="text"
              name="service_address"
              placeholder="Street, city, and ZIP"
              required
            />
          </label>
          <label>
            Number of Dogs
            <select name="number_of_dogs" required defaultValue="">
              <option value="" disabled>
                Select dog count
              </option>
              <option value="1 dog">1 dog</option>
              <option value="2 dogs">2 dogs</option>
              <option value="3 dogs">3 dogs</option>
              <option value="4 dogs">4 dogs</option>
              <option value="5 dogs">5 dogs</option>
              <option value="6 or more dogs">6 or more dogs</option>
            </select>
          </label>
          <label>
            Service Request
            <select name="service_request" required defaultValue="">
              <option value="" disabled>
                Select service
              </option>
              <option value="Monthly recurring cleanup">
                Monthly recurring cleanup
              </option>
              <option value="Split payment plan">
                Split payment plan
              </option>
              <option value="6-month prepaid plan">
                6-month prepaid plan
              </option>
              <option value="Referral question">Referral question</option>
            </select>
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows={6}
              placeholder="Dogs, yard size, cleanup frequency, and gate notes"
              required
            />
          </label>
          <button className="button" type="submit">
            Request Cleanup
          </button>
        </form>
      </section>
    </main>
  );
}
