import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Teams from './Teams'
import Players from './Players'

export default function App () {
  return (
    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/players' element={<Players />} />
          <Route path='/teams' element={<Teams />} />
        </Routes>
      </div>
    </Router>
  )
}