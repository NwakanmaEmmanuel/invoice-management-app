import Sidebar from './components/Sidebar'
import InvoiceList from './components/InvoiceList'
import InvoiceDetails from './components/InvoiceDetails'
import { Routes, Route } from 'react-router-dom'


export default function App() {
  return (

    <div className="flex min-h-screen justify-center  bg-[#F8F8FB] ">
      <Sidebar/>

      <Routes>
        <Route path='/' element={<InvoiceList/>} />
        <Route path='invoice/:id' element={<InvoiceDetails/>} />
      </Routes>
    </div>

  )
}
