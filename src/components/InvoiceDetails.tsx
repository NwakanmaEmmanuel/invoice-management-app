import React from 'react'
import { useParams } from 'react-router-dom';
import invoices from '../data/invoice';

function InvoiceDetails() {

  const {id} = useParams()
 const invoice = invoices.find((inv) => inv.id === id);
 
 if (!invoice) return <div>Not found</div>

 const statusStyles = {
    Paid: "bg-[#33D69F]/10 text-[#33D69F]",
    Pending: "bg-[#FF8F00]/10 text-[#FF8F00]",
    Draft: "bg-[#373B53]/10 text-[#373B53]",
    }

  return (
    <div className='mt-12'>
      <div className='flex items-center gap-3'>
        <i className="fa-solid fa-angle-left font-extrabold  text-[#7C5DFA]"></i>
        <h1 className='text-[15px] text-[#0C0E16] font-bold'>Go Back</h1>
      </div>

      <div className='bg-[#FFFFFF] flex items-center justify-center gap-[220px] rounded-lg px-7 py-7 mt-10'>
        <div className="flex items-center gap-5">
          <p className='text-[#858BB2] font-medium'>Status</p>
          <button className={`${statusStyles[invoice.status]}   text-[15px] font-bold px-2 py-2 rounded-md `}>
            <span className=" h-[8px] bg-current w-[8px] rounded-md inline-block border-solid border mr-1.5"></span>{invoice.status}
          </button>
        </div>

        <div className='flex gap-2'>
          <button className='bg-[#7E88C3]/10 font-bold text-[15px] rounded-3xl px-5 py-3 text-[#7E88C3]'>Edit</button>
          <button className='bg-[#EC5757] text-[15px] font-bold px-7 py-3.5 rounded-3xl text-white hover:bg-[#FF9797] '>Delete</button>
          <button className='bg-[#7C5DFA] text-[15px] font-bold px-7 py-3.5 text-white rounded-3xl'>Mark as Paid</button>
        </div>
      </div>
    </div>

  )
}

export default InvoiceDetails
