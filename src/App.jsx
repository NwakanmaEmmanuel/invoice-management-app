import Sidebar from './components/Sidebar'
import InvoiceList from './components/InvoiceList'
import InvoiceDetails from './components/InvoiceDetails'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import invoices from './data/invoice'


export default function App() {

  const [showForm, setShowForm] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [invoiceData, setInvoiceData] = useState(invoices)
  const [darkMode, setDarkMode] = useState(false)

  function handleAddList(data) {
    setInvoiceData((inv) => [...inv, data])
  }

  return (

    <div className={`${darkMode ? "dark" : ""}  ` }>
      <div className='flex min-h-screen justify-center  bg-[#F8F8FB] dark:bg-[#141625]'>

      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode}/>

      <Routes>
        <Route path='/' element={<InvoiceList showForm={showForm} invoiceData={invoiceData} setShowForm={setShowForm} selectedInvoice={selectedInvoice} setSelectedInvoice={setSelectedInvoice} handleAddList={handleAddList}/>} />
        <Route path='invoice/:id' element={<InvoiceDetails invoiceData={invoiceData} setInvoiceData={setInvoiceData} showForm={showForm} setShowForm={setShowForm} selectedInvoice={selectedInvoice} setSelectedInvoice={setSelectedInvoice}  />} />
      </Routes>
      </div>
    </div>

  )
}