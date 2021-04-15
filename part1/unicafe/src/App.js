import React, { useState } from 'react'

const StatisticLine = ({text, value}) => (<p>{text} {value}</p>)

const Statistics = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  const average = (good-bad)/all
  const positive = 100*good/all

  if (all) {
    return (
      <>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </>
    )
  } else {
    return (<p>No feedback given</p>)
  }
}

const Button = ({text, onClick}) => (<button onClick={onClick}>{text}</button>)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} onClick={() => setGood(good+1)} />
      <Button text={"neutral"} onClick={() => setNeutral(neutral+1)} />
      <Button text={"bad"} onClick={() => setBad(bad+1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App