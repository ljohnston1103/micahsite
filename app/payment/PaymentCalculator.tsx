"use client";

import { FormEvent, useMemo, useState } from "react";

const VENMO_PAYMENT_URL = "";

const monthlyPrices = {
  "1": 60,
  "2": 80,
  "3": 90,
  "4": 100,
  "5": 110,
} as const;

const paymentDurations = {
  monthly: {
    label: "Monthly",
    description: "Monthly recurring service",
  },
  split: {
    label: "Split payment",
    description: "Pay twice per month",
  },
  "six-months": {
    label: "6-month prepaid",
    description: "Pay 6 months up front and save 10%",
  },
} as const;

type DogCount = keyof typeof monthlyPrices;
type PaymentDuration = keyof typeof paymentDurations;

const dogCounts = Object.keys(monthlyPrices) as DogCount[];
const durationKeys = Object.keys(paymentDurations) as PaymentDuration[];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(amount);
}

function calculateTotal(dogs: DogCount, duration: PaymentDuration) {
  const monthlyPrice = monthlyPrices[dogs];

  if (duration === "split") {
    return monthlyPrice / 2;
  }

  if (duration === "six-months") {
    return monthlyPrice * 6 * 0.9;
  }

  return monthlyPrice;
}

export default function PaymentCalculator() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [duration, setDuration] = useState<PaymentDuration>("monthly");
  const [dogs, setDogs] = useState<DogCount>("1");

  const selectedDuration = paymentDurations[duration];
  const monthlyPrice = monthlyPrices[dogs];
  const total = calculateTotal(dogs, duration);
  const fullSixMonthPrice = monthlyPrice * 6;
  const sixMonthSavings =
    duration === "six-months" ? fullSixMonthPrice - total : 0;

  const totalLabel =
    duration === "split" ? "Payment due today" : "Total due";

  const totalDescription =
    duration === "split"
      ? `${formatCurrency(total)} twice per month, based on ${formatCurrency(monthlyPrice)}/month.`
      : duration === "six-months"
        ? `Includes ${formatCurrency(sixMonthSavings)} in prepaid savings.`
        : "Calculated from the current monthly Poo Patrol rate.";

  const venmoHref = useMemo(() => {
    if (!VENMO_PAYMENT_URL) {
      return "";
    }

    const note = [
      "Poo Patrol",
      selectedDuration.label,
      `${dogs} dog${dogs === "1" ? "" : "s"}`,
      name.trim(),
      address.trim(),
    ]
      .filter(Boolean)
      .join(" - ");

    try {
      const url = new URL(VENMO_PAYMENT_URL);
      url.searchParams.set("amount", total.toFixed(2));
      url.searchParams.set("note", note);
      return url.toString();
    } catch {
      return VENMO_PAYMENT_URL;
    }
  }, [address, dogs, name, selectedDuration.label, total]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (venmoHref) {
      window.location.href = venmoHref;
    }
  }

  return (
    <form className="paymentCalculator" onSubmit={handleSubmit}>
      <div className="paymentFormIntro">
        <p className="eyebrow">Pay Now</p>
        <h2>Calculate your service total.</h2>
        <p>
          Choose your dog count and payment option. Six-month prepaid plans
          automatically include the 10% discount.
        </p>
      </div>

      <label>
        Name
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>

      <label>
        Address
        <input
          type="text"
          name="address"
          placeholder="Service street, city, and ZIP"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          required
        />
      </label>

      <div className="formGridTwo">
        <label>
          Payment Option
          <select
            name="payment_duration"
            value={duration}
            onChange={(event) =>
              setDuration(event.target.value as PaymentDuration)
            }
          >
            {durationKeys.map((key) => (
              <option key={key} value={key}>
                {paymentDurations[key].label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Number of Dogs
          <select
            name="number_of_dogs"
            value={dogs}
            onChange={(event) => setDogs(event.target.value as DogCount)}
          >
            {dogCounts.map((count) => (
              <option key={count} value={count}>
                {count} dog{count === "1" ? "" : "s"}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="paymentSummaryPanel" aria-live="polite">
        <div>
          <span>Monthly rate</span>
          <strong>{formatCurrency(monthlyPrice)}</strong>
          <p>{selectedDuration.description}</p>
        </div>
        <div>
          <span>{totalLabel}</span>
          <strong>{formatCurrency(total)}</strong>
          <p>{totalDescription}</p>
        </div>
      </div>

      {duration === "six-months" ? (
        <p className="paymentSavingsNote">
          Paid-up-front savings: {formatCurrency(sixMonthSavings)} off the
          regular 6-month total.
        </p>
      ) : null}

      <button className="button paymentSubmitButton" type="submit" disabled={!venmoHref}>
        Pay Now
      </button>

      {!venmoHref ? (
        <p className="paymentNote">
          Venmo payment link is ready to be connected. Add the Venmo URL to
          <code> VENMO_PAYMENT_URL </code>
          in the payment calculator file.
        </p>
      ) : null}
    </form>
  );
}
