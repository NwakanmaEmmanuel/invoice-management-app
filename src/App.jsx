import Sidebar from './components/Sidebar'
import InvoiceList from './components/InvoiceList'


export default function App() {
  return (

    <div className="flex min-h-screen  bg-[#F8F8FB] ">
      <Sidebar/>
      <InvoiceList/>
    </div>

  )
}
