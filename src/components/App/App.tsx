import css from "./App.module.css";
import VoteOptions from "../VoteOptions/VoteOptions";
import type { Votes, VoteType } from "../../types/votes";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";

import { useState } from "react";

const initialVotes: Votes = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export default function App() {
  const resetVotes = () => {
    setVotes(initialVotes);
  };

  const [votes, setVotes] = useState<Votes>(initialVotes);

  const handleVote = (type: VoteType) => {
    setVotes((votes) => ({
      ...votes,
      [type]: votes[type] + 1,
    }));
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      {" "}
      <div className={css.container}>
        <h1 className={css.title}>Sip Happens Café</h1>
        <p className={css.description}>
          Please rate our service by selecting one of the options below.
        </p>
      </div>
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />
      {totalVotes === 0 ? (
        <Notification message="No feedback yet" />
      ) : (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      )}
    </div>
  );
}
