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
    return (<Part key={part.name} name={part.name} count={part.count} />)
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content 
        parts={[
          {'name': part1, 'count': exercises1},
          {'name': part2, 'count': exercises2},
          {'name': part3, 'count': exercises3},
        ]}
      />
      <Total count={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App