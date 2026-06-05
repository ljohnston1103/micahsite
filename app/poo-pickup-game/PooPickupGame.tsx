"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

const TOTAL_ROUNDS = 11;

type GameMode = "ready" | "playing" | "complete" | "failed" | "won";

type PooTarget = {
  id: number;
  rotation: number;
  scale: number;
  x: number;
  y: number;
};

function getRoundConfig(round: number) {
  return {
    count: round + 4,
    timeLimit: 10 - (round - 1) * 0.5,
  };
}

function seededRandom(seed: number) {
  let value = seed % 2147483647;

  if (value <= 0) {
    value += 2147483646;
  }

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function createTargets(round: number, count: number): PooTarget[] {
  const random = seededRandom(round * 919 + count * 37);

  return Array.from({ length: count }, (_, index) => ({
    id: index,
    rotation: random() * 34 - 17,
    scale: 0.86 + random() * 0.34,
    x: 7 + random() * 86,
    y: 16 + random() * 72,
  }));
}

function formatSeconds(value: number) {
  return value.toFixed(1);
}

export default function PooPickupGame() {
  const [round, setRound] = useState(1);
  const [mode, setMode] = useState<GameMode>("ready");
  const [remainingIds, setRemainingIds] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(getRoundConfig(1).timeLimit);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [lastRoundElapsed, setLastRoundElapsed] = useState(0);

  const startedAtRef = useRef(0);
  const endsAtRef = useRef(0);

  const config = getRoundConfig(round);
  const targets = useMemo(
    () => createTargets(round, config.count),
    [config.count, round],
  );
  const remainingSet = useMemo(
    () => new Set(remainingIds),
    [remainingIds],
  );
  const pickedUp =
    mode === "ready" ? 0 : config.count - remainingIds.length;
  const progress = Math.round((pickedUp / config.count) * 100);

  useEffect(() => {
    if (mode !== "playing") {
      return;
    }

    const timer = window.setInterval(() => {
      const nextTimeLeft = Math.max(0, (endsAtRef.current - Date.now()) / 1000);
      setTimeLeft(nextTimeLeft);

      if (nextTimeLeft <= 0) {
        setMode("failed");
      }
    }, 50);

    return () => {
      window.clearInterval(timer);
    };
  }, [mode]);

  function startRound(nextRound = round) {
    const nextConfig = getRoundConfig(nextRound);
    const nextTargets = createTargets(nextRound, nextConfig.count);

    setRound(nextRound);
    setRemainingIds(nextTargets.map((target) => target.id));
    setTimeLeft(nextConfig.timeLimit);
    setLastRoundElapsed(0);
    startedAtRef.current = Date.now();
    endsAtRef.current = startedAtRef.current + nextConfig.timeLimit * 1000;
    setMode("playing");
  }

  function handleTargetClick(id: number) {
    if (mode !== "playing" || !remainingSet.has(id)) {
      return;
    }

    const nextRemaining = remainingIds.filter((targetId) => targetId !== id);
    setRemainingIds(nextRemaining);

    if (nextRemaining.length === 0) {
      const elapsed = (Date.now() - startedAtRef.current) / 1000;
      setLastRoundElapsed(elapsed);
      setTotalElapsed((current) => current + elapsed);
      setTimeLeft(Math.max(0, (endsAtRef.current - Date.now()) / 1000));
      setMode(round === TOTAL_ROUNDS ? "won" : "complete");
    }
  }

  function handleNextRound() {
    startRound(round + 1);
  }

  function handleRestart() {
    setRound(1);
    setTotalElapsed(0);
    setLastRoundElapsed(0);
    setRemainingIds([]);
    setTimeLeft(getRoundConfig(1).timeLimit);
    setMode("ready");
  }

  return (
    <div className="pickupGame">
      <div className="gameHud" aria-label="Game status">
        <div>
          <span>Round</span>
          <strong>
            {round}/{TOTAL_ROUNDS}
          </strong>
        </div>
        <div>
          <span>Pieces</span>
          <strong>
            {pickedUp}/{config.count}
          </strong>
        </div>
        <div>
          <span>Time</span>
          <strong>{formatSeconds(timeLeft)}s</strong>
        </div>
        <div>
          <span>Total Time</span>
          <strong>{formatSeconds(totalElapsed)}s</strong>
        </div>
      </div>

      <div
        className={`pickupYard pickupYard${((round - 1) % 4) + 1}`}
        aria-label={`Round ${round} yard with ${config.count} pieces`}
      >
        <div className="yardFence" />
        <div className="yardPath" />
        <div className="yardBush yardBushOne" />
        <div className="yardBush yardBushTwo" />

        {targets.map((target) => {
          const isVisible = remainingSet.has(target.id);

          return (
            <button
              aria-label={`Pick up piece ${target.id + 1}`}
              className={`pooTarget ${isVisible ? "" : "isPicked"}`}
              disabled={!isVisible || mode !== "playing"}
              key={`${round}-${target.id}`}
              onClick={() => handleTargetClick(target.id)}
              style={{
                "--poo-rotation": `${target.rotation}deg`,
                "--poo-scale": target.scale,
                "--poo-x": `${target.x}%`,
                "--poo-y": `${target.y}%`,
              } as CSSProperties}
              type="button"
            >
              <span />
            </button>
          );
        })}

        {mode !== "playing" ? (
          <div className="gameOverlay">
            {mode === "ready" ? (
              <>
                <p className="eyebrow">Ready</p>
                <h3>Round 1: 5 pieces, 10 seconds.</h3>
                <button className="button" onClick={() => startRound(1)} type="button">
                  Start Game
                </button>
              </>
            ) : null}

            {mode === "complete" ? (
              <>
                <p className="eyebrow">Yard Cleared</p>
                <h3>Round {round} cleared in {formatSeconds(lastRoundElapsed)}s.</h3>
                <button className="button" onClick={handleNextRound} type="button">
                  Next Yard
                </button>
              </>
            ) : null}

            {mode === "failed" ? (
              <>
                <p className="eyebrow">Time Ran Out</p>
                <h3>Try round {round} again.</h3>
                <div className="gameOverlayActions">
                  <button className="button" onClick={() => startRound(round)} type="button">
                    Retry Round
                  </button>
                  <button className="button secondary lightSecondary" onClick={handleRestart} type="button">
                    Restart
                  </button>
                </div>
              </>
            ) : null}

            {mode === "won" ? (
              <>
                <p className="eyebrow">Poo Crew Pro</p>
                <h3>All 11 yards cleared in {formatSeconds(totalElapsed)}s.</h3>
                <button className="button" onClick={handleRestart} type="button">
                  Play Again
                </button>
              </>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="gameProgress" aria-label={`Round progress ${progress}%`}>
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="gameRuleCards">
        <article>
          <span>Round 1</span>
          <strong>5 pieces</strong>
          <p>10 seconds</p>
        </article>
        <article>
          <span>Every Yard</span>
          <strong>More mess</strong>
          <p>Less time</p>
        </article>
        <article>
          <span>Final Round</span>
          <strong>15 pieces</strong>
          <p>5 seconds</p>
        </article>
      </div>
    </div>
  );
}
