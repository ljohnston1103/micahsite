import type { Metadata } from "next";
import PooPickupGame from "./PooPickupGame";

export const metadata: Metadata = {
  title: "Poo Pickup Game | The Poo Crew",
  description:
    "Play The Poo Crew pickup game. Clear each yard before the clock runs out.",
};

export default function PooPickupGamePage() {
  return (
    <main className="pageShell gamePage">
      <section className="pageHero compactHero gameHero">
        <div>
          <p className="eyebrow">Poo Pickup Game</p>
          <h1>Clear every yard before time runs out.</h1>
          <p className="contactLead">
            Click every piece as fast as you can. Each new yard has more to
            clean and less time on the clock.
          </p>
        </div>
        <div className="gameHeroPanel" role="img" aria-label="Cartoon yard">
          <span>Round 1 starts with 5 pieces in 10 seconds.</span>
        </div>
      </section>

      <section className="section gameSection" id="poo-pickup-game">
        <div className="gameIntro">
          <p className="eyebrow">Speed Cleanup</p>
          <h2>Poo Crew Yard Rush</h2>
          <p>
            Beat all 11 yards. The final round has 15 pieces and only 5
            seconds.
          </p>
        </div>
        <PooPickupGame />
      </section>
    </main>
  );
}
