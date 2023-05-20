import "./App.css";
// import api from "./utils/api-client";
import Players from "./pages/Players.jsx";

function App() {
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   let username = e.target.elements.username.value;
  //   let password = e.target.elements.password.value;
  //   let image = e.target.elements.image.value;
  //   const formData = { username: username, password: password, image: image };
  //   api.createPlayer(formData)
  //   username = ""
  //   password = ""
  //   image = ""
  // }

  return (
    <>
      <Players />
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="image">Imagen: </label>
          <input type="text" name="image" id="image" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form> */}
    </>
  );
}

export default App;
