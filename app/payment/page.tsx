import PaymentCalculator from "./PaymentCalculator";

const paymentOptions = [
  {
    name: "Monthly Plan",
    price: "$60-$110/month",
    description:
      "Monthly pricing for 1-5 dogs using the simple +$10 per extra dog rule.",
  },
  {
    name: "Split Payment",
    price: "$30-$55 twice per month",
    description:
      "Break the monthly cost into two payments each month.",
  },
  {
    name: "6-Month Prepaid",
    price: "Save 10%",
    description:
      "Pay up front for 6 months and save 10% compared with paying monthly.",
  },
];

export default function Payment() {
  return (
    <main className="pageShell">
      <section className="pageHero compactHero paymentHero">
        <div>
          <p className="eyebrow">Payment</p>
          <h1>Pay For Your Poo Patrol Service.</h1>
          <p className="contactLead">
            Enter your name, address, payment option, and number of dogs to
            calculate your total before paying online.
          </p>
        </div>
        <div
          className="featureImage paymentFeature pooPhotoPanel"
          role="img"
          aria-label="Customer paying at a card reader"
        >
          <span>Monthly, split-payment, and 6-month prepaid savings</span>
        </div>
      </section>

      <section className="section splitSection paymentSection">
        <div className="paymentPlanGrid" aria-label="Payment options">
          {paymentOptions.map((option) => (
            <article className="paymentCard" key={option.name}>
              <p className="eyebrow">Option</p>
              <h2>{option.name}</h2>
              <p className="priceTag">{option.price}</p>
              <p>{option.description}</p>
            </article>
          ))}
        </div>

        <PaymentCalculator />
      </section>
    </main>
  );
}
