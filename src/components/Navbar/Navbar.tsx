import "./Navbar.scss"

const Navbar = () => {
  return (
    <nav>
        <h1 className="title">K I N J O</h1>
        <div className="btn-grp">
            <a href="/">Home</a>
            <a href="/login">Log In</a>
            <a href="/signup">Sign Up</a>
        </div>
    </nav>
  )
}

export default Navbar