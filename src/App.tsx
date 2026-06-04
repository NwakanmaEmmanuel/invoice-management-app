import Sidebar from './components/Sidebar'
import InvoiceList from './components/InvoiceList'
import InvoiceDetails from './components/InvoiceDetails'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import invoices from './data/invoice'
import { Invoice } from './types/invoice'


export default function App() {

  const [showForm, setShowForm] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [invoiceData, setInvoiceData] = useState(invoices)
  const [darkMode, setDarkMode] = useState(false)

  function handleAddList(data: Invoice) {
    setInvoiceData((inv) => [...inv, data])
  }

  function handleUpdateInvoice(updatedInvoice: Invoice) {
  setInvoiceData(prev =>
    prev.map(invoice =>
      invoice.id === updatedInvoice.id
        ? updatedInvoice
        : invoice
    )
  );
}

  return (

    <div className={`${darkMode ? "dark" : ""}  ` }>
      <div className='flex min-h-screen justify-center  bg-[#F8F8FB] dark:bg-[#141625]'>

      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode}/>

      <Routes>
        <Route path='/' element={<InvoiceList handleUpdateInvoice={handleUpdateInvoice} showForm={showForm} invoiceData={invoiceData} setShowForm={setShowForm} selectedInvoice={selectedInvoice} setSelectedInvoice={setSelectedInvoice} handleAddList={handleAddList}/>} />
        <Route path='invoice/:id' element={<InvoiceDetails handleUpdateInvoice={handleUpdateInvoice} invoiceData={invoiceData} setInvoiceData={setInvoiceData} showForm={showForm} setShowForm={setShowForm} selectedInvoice={selectedInvoice} handleAddList={handleAddList} setSelectedInvoice={setSelectedInvoice}  />} />
      </Routes>
      </div>
    </div>

  )
}