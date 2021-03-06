import React, { useState } from 'react'

const Button = ({text, onClick}) => (<button onClick={onClick}>{text}</button>)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  const getRandomInt = max => Math.floor(Math.random() * max)
  const handleVote = () =>  {
    const pointsCopy = [...points]
    pointsCopy[selected]++
    setPoints(pointsCopy)
  }
  const mostVotes = points.indexOf(Math.max(...points));

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text={"vote"} onClick={() => handleVote()}/>
      <Button text={"next anecdote"} onClick={() => setSelected(getRandomInt(anecdotes.length))}/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotes]}</p>
      <p>has {points[mostVotes]} votes</p>
    </div>
  )
}

export default App