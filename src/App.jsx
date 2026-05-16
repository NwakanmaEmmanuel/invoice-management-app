import Sidebar from './components/Sidebar'
import InvoiceList from './components/InvoiceList'
import InvoiceDetails from './components/InvoiceDetails'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'


export default function App() {

  const [showForm, setShowForm] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)

  return (

    <div className="flex min-h-screen justify-center  bg-[#F8F8FB] ">
      <Sidebar/>

      <Routes>
        <Route path='/' element={<InvoiceList showForm={showForm} setShowForm={setShowForm} selectedInvoice={selectedInvoice} setSelectedInvoice={setSelectedInvoice}/>} />
        <Route path='invoice/:id' element={<InvoiceDetails showForm={showForm} setShowForm={setShowForm} selectedInvoice={selectedInvoice} setSelectedInvoice={setSelectedInvoice}  />} />
      </Routes>
    </div>

  )
}