import React from 'react'

const Header = (props) => {
  return (
    <h2>{props.course}</h2>
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
    return (<Part key={part.id} name={part.name} count={part.exercises} />)
  })
  return (<div>{content}</div>)
}

const Total = (props) => {
  return (
    <strong>Total of {props.parts.reduce((a,b) => a + b.exercises, 0)} exercises</strong>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course