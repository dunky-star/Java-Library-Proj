import "./App.css";
import TodoTable from "./components/TodoTable";

function App() {
  const todos = [
    { rowNumber: 1, rowDescription: "Feed Puppy", rowAssigned: " User 1" },
    { rowNumber: 2, rowDescription: "Hair Cut", rowAssigned: " User 2" },
    { rowNumber: 3, rowDescription: "Water Plants", rowAssigned: " User 1" },
    { rowNumber: 4, rowDescription: "Make Dinner", rowAssigned: " User 4" },
  ];
  return (
    <div className="mt-5 container">
      <div className="card">
        <div className="card-header">Your Todo's</div>
        <div className="card-body"></div>
        <TodoTable todos={todos} />
      </div>
    </div>
  );
}

export default App;
