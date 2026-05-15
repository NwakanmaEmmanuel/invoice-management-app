import invoices from '../data/invoice';



function InvoiceForm({invoice, setShowForm}) {
  return (
    <div className='fixed bottom-0 left-[1px] right-0 top-0 bg-black/50 z-50' onClick={() => setShowForm(false)}>
      <div className='bg-[#FFFFFF] absolute top-0 left-[6.4rem] h-screen rounded-tr-[20px] rounded-br-[20px] w-[30rem] z-10 p-11          text-black '   
      onClick={(e) => e.stopPropagation()} >
        <div className='flex gap-2 mb-11'>
          <h1 className='text-2xl font-bold text-[#0C0E16]' >Edit </h1>
          <p className='text-2xl font-bold text-[#0C0E16]'> 
            <span className='text-[#7C5DFA]'>#</span>{invoice.id} </p>
        </div>

        <div>
          <p className='text-[#7C5DFA] text-[15px] font-bold mb-6 ' >Bill From</p>
          <p className='text-[13px] text-[#7C5DFA] mb-4 font-medium' >Street Address</p>
          <input type="text" className='w-full outline-none mb-6 border-[#DFE3FA] border-solid border-2 rounded-[1px] font-bold text-[15px] px-4 py-2' />

          <div className='grid grid-cols-3 gap-4 mb-[-1px]'>
            <p className='text-[13px] text-[#7C5DFA] mb-4 font-medium' >City</p>
            <p className='text-[13px] text-[#7C5DFA] mb-4 font-medium' >Post Code</p>
            <p className='text-[13px] text-[#7C5DFA] mb-4 font-medium' >Country</p>
          </div>

          <div className='grid grid-cols-3 gap-4 mb-8'>
            <input type="text" className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 rounded-[1px]  text-[15px] px-4 py-2' />
            <input type="text" className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 rounded-[1px]  text-[15px] px-4 py-2' />
            <input type="text" className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 rounded-[1px]  text-[15px] px-4 py-2' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceForm
