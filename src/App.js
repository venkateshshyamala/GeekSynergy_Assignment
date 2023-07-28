import {useState} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import axios from 'axios'
import './App.css'

const API_URL = 'https://hoblist.com/api/movieList'

const CompanyInfo = () => (
  <div className="company-info">
    <h2>Company: Geeksynergy Technologies Pvt Ltd</h2>
    <p>Address: Sanjayanagar, Bengaluru-56</p>
    <p>Phone: XXXXXXXXX09</p>
    <p>Email: XXXXXX@gmail.com</p>
  </div>
)

const LoginForm = ({handleLogin}) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [invalidCredentials, setInvalidCredentials] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    // Simulating login validation
    if (name === 'username' && password === 'password') {
      handleLogin(name)
      setInvalidCredentials(false)
    } else {
      setInvalidCredentials(true)
    }
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      {invalidCredentials && <p className="error">Invalid Credentials</p>}
      <button type="submit">Login</button>
    </form>
  )
}

const MovieList = () => {
  const [movieList, setMovieList] = useState([])

  const fetchMovieList = async () => {
    try {
      const response = await axios.post(API_URL, {
        category: 'movies',
        language: 'kannada',
        genre: 'all',
        sort: 'voting',
      })
      setMovieList(response.data.result)
    } catch (error) {
      console.error('Error fetching movie list:', error)
    }
  }

  return (
    <div className="movie-list">
      <h2>Movie List</h2>
      <button type="button" onClick={fetchMovieList}>
        Fetch Movie List
      </button>
      <ul>
        {movieList.map(movie => (
          <li key={movie.id}>{movie.movie}</li>
        ))}
      </ul>
    </div>
  )
}

const SignupForm = ({handleSignup}) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [profession, setProfession] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const user = {
      name,
      password,
      email,
      phone,
      profession,
    }
    handleSignup(user)
    setName('')
    setPassword('')
    setEmail('')
    setPhone('')
    setProfession('')
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="profession">Profession</label>
        <select
          id="profession"
          value={profession}
          onChange={e => setProfession(e.target.value)}
        >
          <option value="engineer">Engineer</option>
          <option value="doctor">Doctor</option>
          <option value="teacher">Teacher</option>
          <option value="artist">Artist</option>
        </select>
      </div>
      <button type="submit">Signup</button>
    </form>
  )
}

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null)

  const handleSignup = user => {
    // Save user data to local storage
    localStorage.setItem('user', JSON.stringify(user))
  }

  const handleLogin = name => {
    setLoggedInUser(name)
  }

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/company-info">Company Info</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
          {!loggedInUser ? (
            <SignupForm handleSignup={handleSignup} />
          ) : (
            <LoginForm handleLogin={handleLogin} />
          )}
        </Route>
        <Route path="/movie-list">
          {loggedInUser ? (
            <MovieList />
          ) : (
            <LoginForm handleLogin={handleLogin} />
          )}
        </Route>
        <Route path="/company-info" component={CompanyInfo} />
      </Switch>
    </Router>
  )
}

export default App
