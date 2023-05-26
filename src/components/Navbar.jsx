import "./stylesheets/Navbar.css"

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="/">Altisima</a></li>
        <li><a href="/players">Jugadores</a></li>
        <li><a href="/games">Partidas</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;