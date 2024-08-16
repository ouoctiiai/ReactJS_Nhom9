import { Search } from 'lucide-react'
import './App.css'
import Footer from './Components/Footer/Foot'

function App() {

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
        <div>
          <Search/>
        </div>
      </h1>
      <Footer />
    </>

  )
}

export default App
