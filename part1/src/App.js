import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.count}
    </p>
  )

}

const Content = (props) => {
  const content = props.parts.map(part => {
    return (<Part key={part.name} name={part.name} count={part.exercises} />)
  })
  return (<div>{content}</div>)
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.count}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content 
        parts={[part1, part2, part3]}
      />
      <Total count={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App