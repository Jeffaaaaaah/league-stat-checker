import ListGroup from "./components/ListGroup";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <ListGroup
              name="cities"
              list={["atlanta", "new york", "joe biden"]}
              onSelectItem={(item) => console.log(item)}
            />
          </div>
        }
      />

      <Route path="/balls" element={"balls"}/>
    </Routes>
  );
}

export default App;
