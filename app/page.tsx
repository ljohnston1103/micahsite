const serviceHighlights = [
  {
    title: "Recurring Treatments",
    text: "Monthly, split-payment, and 6-month prepaid plans keep the yard clean without adding another chore to your week.",
  },
  {
    title: "Clear Pricing",
    text: "Start at $60/month for 1 dog, $80/month for 2 dogs, and add $10/month for each extra dog.",
  },
  {
    title: "Referral Savings",
    text: "Refer a friend for free service credit, and your friend gets $10 off their first month.",
  },
];

const pricingRows = [
  { dogs: "1 dog", monthly: "$60/month", split: "$30 twice per month", prepaid: "$324" },
  { dogs: "2 dogs", monthly: "$80/month", split: "$40 twice per month", prepaid: "$432" },
  { dogs: "3 dogs", monthly: "$90/month", split: "$45 twice per month", prepaid: "$486" },
  { dogs: "4 dogs", monthly: "$100/month", split: "$50 twice per month", prepaid: "$540" },
  { dogs: "5 dogs", monthly: "$110/month", split: "$55 twice per month", prepaid: "$594" },
];

export default function Home() {
  return (
    <main className="pageShell">
      <section className="hero pooHero">
        <video
          className="heroVideo"
          src="/poo-crew-hero.mp4"
          aria-label="The Poo Crew service video"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="heroContent pooHeroContent">
          <p className="eyebrow">Professional Pet Waste Removal</p>
          <h1>Duty Calls. We Scoop.</h1>
          <p>
            The Poo Crew keeps your yard clean, safe, and ready for family time
            with dependable pet waste removal for busy homes.
          </p>
          <div className="buttonRow">
            <a className="button" href="/contact-us">
              Schedule Cleanup
            </a>
            <a className="button secondary" href="/payment">
              Pay Online
            </a>
          </div>
          <div className="heroHighlights" aria-label="Service areas">
            <span>Canton</span>
            <span>Jackson</span>
            <span>Canal Fulton</span>
            <span>Manchester</span>
            <span>Akron</span>
          </div>
        </div>
      </section>

      <section className="section introGrid">
        {serviceHighlights.map((service) => (
          <article className="infoCard serviceCard" key={service.title}>
            <p className="eyebrow">Service</p>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
          </article>
        ))}
      </section>

      <section className="section splitSection pricingSection">
        <div className="sectionText">
          <p className="eyebrow">Dog Poop Cleanup Pricing</p>
          <h2>Simple plans with clear paid-up-front savings.</h2>
          <p>
            Six-month prepaid plans include a 10% discount, so customers save
            while locking in a clean-yard routine.
          </p>
          <ul className="simpleRuleList">
            <li>1 dog: $60/month</li>
            <li>2 dogs: $80/month</li>
            <li>Each extra dog: +$10/month</li>
          </ul>
          <div className="buttonRow">
            <a className="button" href="/payment">
              Calculate Payment
            </a>
            <a className="button secondary lightSecondary" href="/contact-us">
              Ask A Question
            </a>
          </div>
        </div>

        <div className="pricingTableCard">
          <div className="pricingTableHeader">
            <p className="eyebrow">Monthly Plans</p>
            <span className="savingsBadge">10% off 6-month prepaid</span>
          </div>
          <div className="pricingTableWrap">
            <table className="pricingTable">
              <thead>
                <tr>
                  <th>Dogs</th>
                  <th>Monthly Price</th>
                  <th>Split Payment</th>
                  <th>6-Month Prepaid</th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row) => (
                  <tr key={row.dogs}>
                    <th scope="row">{row.dogs}</th>
                    <td>{row.monthly}</td>
                    <td>{row.split}</td>
                    <td>{row.prepaid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section referralSection">
        <div className="referralIntro">
          <p className="eyebrow">Referral Program</p>
          <h2>Refer a friend. Get free service.</h2>
          <p>
            Referral rewards turn word of mouth into real savings for you and
            your friend.
          </p>
        </div>

        <div className="referralGrid">
          <article className="referralCard referralFeatureCard">
            <p className="eyebrow">First Referral</p>
            <h3>Get 2 free weeks of service.</h3>
            <p>
              When your first referral signs up and completes their first paid
              month, you receive account credit for 2 free weeks.
            </p>
          </article>
          <article className="referralCard">
            <p className="eyebrow">Every Referral After</p>
            <h3>Get 1 free week.</h3>
            <p>
              Keep referring new customers and keep earning service credit
              toward future cleanups.
            </p>
          </article>
          <article className="referralCard">
            <p className="eyebrow">Friend Savings</p>
            <h3>Your friend gets $10 off.</h3>
            <p>
              Referred new customers receive $10 off their first month of Poo
              Crew service.
            </p>
          </article>
        </div>

        <div className="referralRules">
          <p className="eyebrow">Simple Rules</p>
          <ul>
            <li>Rewards apply after the new customer completes their first paid month.</li>
            <li>Rewards are account credit toward future service.</li>
            <li>Rewards cannot be exchanged for cash.</li>
            <li>The referred customer must be a new customer.</li>
          </ul>
        </div>
      </section>

      <section className="section testimonialsSection pooPromiseSection">
        <div className="testimonialsCopy">
          <p className="eyebrow">Testimonial</p>
          <h2>Trusted to show up and get the yard looking right.</h2>
        </div>
        <div
          className="testimonialsGrid"
          aria-label="Poo Crew testimonial and service notes"
        >
          <article className="testimonialCard">
            <p>
              "Yard looks great and the employee always shows up ready to work
              on time."
            </p>
            <cite>- Poo Crew Customer</cite>
          </article>
          <article className="testimonialCard">
            <h3>Service Area</h3>
            <p>Canton, Jackson, Canal Fulton, Manchester, and Akron.</p>
          </article>
          <article className="testimonialCard">
            <h3>Save More</h3>
            <p>
              Prepay for 6 months to save 10%, or refer friends to earn free
              service credits.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
