import { Search } from 'lucide-react'
import './App.css'
import MainBody from './Components/MainBody/MainBody'

function App() {

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
        <div>
          <Search />

        </div>
      </h1>
      <MainBody/>
    </>
  )
}

export default App
