import { formatDate } from '../utils/helpers';
import { Invoice } from '../types/invoice';


type InvoiceFormProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  invoice: Invoice | null;
};

function InvoiceForm({invoice, setShowForm}: InvoiceFormProps) {

  const isEditing = !!invoice
  
  return (
    <div className='fixed bottom-0 left-[1px] right-0 top-0 bg-black/50 z-50' onClick={() => setShowForm(false)}>
      <div className='bg-[#FFFFFF] absolute top-0 left-[6.4rem] h-screen rounded-tr-[20px] rounded-br-[20px] w-[40rem] z-10 p-11 overflow-y-scroll text-black '   
      onClick={(e) => e.stopPropagation()} >
        <div className='flex gap-2 mb-11'>
          <h1 className='text-2xl font-bold text-[#0C0E16]'>{isEditing
            ? `Edit #${invoice.id}`
            : "New Invoice"} 
          </h1>
        </div>

        <div>
          <p className='text-[#7C5DFA] text-[15px] font-bold mb-6 ' >Bill From</p>
          <p className='text-[13px] text-[#7E88C3] mb-4 font-medium' >Street Address</p>
          <input type="text" className='w-full outline-none mb-6 border-[#DFE3FA] border-solid border-2 rounded-[1px] font-bold text-[15px] px-4 py-2' defaultValue={invoice?.senderAddress.street}   />

          <div className='grid grid-cols-3 gap-4 mb-[-1px]'>
            <p className='text-[13px] text-[#7E88C3] mb-4 font-medium' >City</p>
            <p className='text-[13px] text-[#7E88C3] mb-4 font-medium' >Post Code</p>
            <p className='text-[13px] text-[#7E88C3] mb-4 font-medium' >Country</p>
          </div>

          <div className='grid grid-cols-3 gap-4 mb-8'>
            <input type="text" className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 rounded-[1px]  text-[15px] px-4 py-2' defaultValue={invoice?.senderAddress.city} />
            <input type="text" className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 rounded-[1px]  text-[15px] px-4 py-2' defaultValue={invoice?.senderAddress.country} />
            <input type="text" className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 rounded-[1px]  text-[15px] px-4 py-2' defaultValue={invoice?.senderAddress.postCode} />
          </div>
        </div>

        <div>
          <h1 className='text-[#7C5DFA] text-[15px] font-bold mb-6 '>Bill To</h1>
          <label  className='text-[13px] text-[#7E88C3] mb-4 font-medium'>Client's Name</label>
          <input className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 rounded-[1px]  text-[15px] px-4 py-2'  type="text" defaultValue={invoice?.clientName} />
          <label className='text-[13px] text-[#7E88C3] mb-4 font-medium'>Client's Email</label>
          <input className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 rounded-[1px]  text-[15px] px-4 py-2' type="email" defaultValue={invoice?.clientEmail} />
          <label  className='text-[13px] text-[#7E88C3] mb-4 font-medium'>Street Address</label>
          <input className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 rounded-[1px]  text-[15px] px-4 py-2' type='text' defaultValue={invoice?.clientAddress.street} />
        </div>

        <div>
           <div className='grid grid-cols-3 gap-4 mb-[-1px]'>
            <p className='text-[13px] text-[#7E88C3] mb-4 font-medium' >City</p>
            <p className='text-[13px] text-[#7E88C3] mb-4 font-medium' >Post Code</p>
            <p className='text-[13px] text-[#7E88C3] mb-4 font-medium' >Country</p>
          </div>

          <div className='grid grid-cols-3 gap-4 mb-8'>
            <input type="text" className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 rounded-[1px]  text-[15px] px-4 py-2' defaultValue={invoice?.clientAddress.city || ''} />
            <input type="text" className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 rounded-[1px]  text-[15px] px-4 py-2' defaultValue={invoice?.clientAddress.country || ''} />
            <input type="text" className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 rounded-[1px]  text-[15px] px-4 py-2' defaultValue={invoice?.clientAddress.postCode || ''} />
          </div>
           
           <div className='flex gap-4 '>
            <div className='flex flex-col  gap-4 border w-[100%] opacity-50'>
              <p className='text-[13px] font-medium text-[#7E88C3] '>Invoice Date</p>
              <button className='border border-[#DFE3FA] rounded-[4px]  outline-none border-solid flex text-[15px] font-bold text-[#0C0E16] justify-between px-5 py-2 items-center  '>
                {formatDate(invoice?.createdAt || '')}
                <i className="fa-solid fa-calendar text-[#7C5DFA]"></i>
              </button>
            </div>
            <div className='flex flex-col  gap-4  border w-[100%]'>
              <p className='text-[13px] font-medium text-[#7E88C3]'>Payment Terms</p>
              <button className='border border-[#DFE3FA] rounded-[4px] border-solid flex text-[15px] font-bold text-[#0C0E16] justify-between px-5 py-2 items-center  '>
                Net {invoice?.paymentTerms || ''} Days
              <i className="fa-solid fa-angle-down text-[17px] text-[#7C5DFA]"></i>
              </button>
            </div>
          </div>

          <div className='mt-8'>
            <p  className='text-[13px] text-[#7E88C3] mb-3 font-medium'>Project Description</p>
            <input className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 rounded-[1px]  text-[15px] px-4 py-2' type='text' defaultValue={invoice?.description || ''} />
          </div>

          <div className='mb-6'>
            <h1 className='text-[18px] font-bold mb-4 text-[#777F98]'>Item List</h1>
            <div className='grid grid-cols-[200px_50px_100px_80px_10px] mb-4 gap-5'>
              <p className='text-[13px] font-medium text-[#7E88C3]'>Item Name</p>
              <p className='text-[13px] font-medium text-[#7E88C3]'>Qty.</p>
              <p className='text-[13px] font-medium text-[#7E88C3]'>Price</p>
              <p className='text-[13px] font-medium text-[#7E88C3]'>Total</p>
         </div>

         {invoice?.items?.map((item) => (
          <div key={item.name} className='grid grid-cols-[200px_50px_100px_80px_10px] gap-5 mb-5 items-center'>
              <input className='w-full outline-none  font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 rounded-[1px]  text-[15px] px-4 py-2' type='text' defaultValue={item.name} />
              <input className='w-full outline-none  font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 rounded-[1px]  text-[15px] px-4 py-2' type='text' defaultValue={item.quantity} />
              <input className='w-full outline-none  font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 rounded-[1px]  text-[15px] px-4 py-2' type='text' defaultValue={item.price} />
              <p className='font-bold text-[15px] text-[#888EB0]'>{item.total}</p>
              <i className="fa-solid fa-trash text-[#888EB0] "></i>
            </div>
         ))}

         <div className='mb-10'>
          <button className='bg-[#F9FAFE] text-[#7E88C3] rounded-3xl w-full text-[15px] font-bold py-3 hover:bg-[#DFE3FA] '>+ Add New Item</button>
         </div>

          {isEditing ? ( 
            <div className='flex justify-end gap-3'>
              <button className='text-[15px] bg-[#F9FAFE] text-[#7E88C3] rounded-3xl py-3 px-5 font-bold'>Cancel</button>
              <button className='text-[15px] text-[#F9FAFE] bg-[#7E88C3] rounded-3xl py-3 px-5 font-bold'>Save Changes</button>
            </div>
            ) : (
              <div className='flex justify-between gap-3'>
              <button className='text-[15px] bg-[#F9FAFE] text-[#7E88C3] rounded-3xl py-3 px-5 font-bold'>Discard</button>
              <div>
                <button className='bg-[#373B53] rounded-3xl py-3 px-5 font-bold text-[15px] text-[#888EB0]'>Save as Draft</button>
                <button className='text-[15px] text-[#F9FAFE] bg-[#7E88C3] rounded-3xl py-3 px-5 font-bold ml-[10px]'>Save and Send</button>
              </div>
            </div>
            )
        }

            
          </div>
        </div>


      </div>
    </div>
  )
}

export default InvoiceForm
