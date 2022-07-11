const Header = ({ course }) => <h1>{course.name}</h1>;

const Total = ({ parts }) => {
  let sum = 0;
  for (let i = 0; i < parts.length; i++) {
    sum += parts[i].exercises;
  }
  return <b>Total of {sum} exercises</b>;
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  const partsElements = parts.map((part) => <Part key={part.id} part={part} />);

  return <>{partsElements}</>;
};

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
