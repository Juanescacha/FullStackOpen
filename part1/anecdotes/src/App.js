import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  let arrayVotes = new Uint8Array(anecdotes.length);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(arrayVotes);

  const handleNextAnecdote = () => {
    let aleatorio = Math.floor(Math.random() * anecdotes.length);
    return setSelected(aleatorio);
  };

  const handleVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    return setVotes(copy);
  };

  return (
    <div>
      {anecdotes[selected]}
      <div>has {votes[selected]} votes</div>
      <div>
        <button onClick={handleNextAnecdote}>next anecdote</button>
        <button onClick={handleVotes}>vote</button>
      </div>
    </div>
  );
};

export default App;
