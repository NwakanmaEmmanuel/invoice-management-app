import { formatDate } from '../utils/helpers';
import { Invoice } from '../types/invoice';
import { useState } from 'react';


type InvoiceFormProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  invoice: Invoice | null;
};

function InvoiceForm({invoice, setShowForm}: InvoiceFormProps) {

  const isEditing = !!invoice

  const items = invoice?.items 
  const [formData, setFormData] = useState(invoice)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({...prev!, clientName: e.target.value, }))
  }
  
  
  return (
    <div className='fixed bottom-0 left-[1px] right-0 top-0 bg-black/50 z-50' onClick={() => setShowForm(false)}>
      <div className='bg-[#F8F8FB]  custom-scrollbar dark:bg-[#141625] absolute top-0 left-[6.4rem] h-screen rounded-tr-[20px] rounded-br-[20px] w-[40rem] z-10 p-11 overflow-y-auto text-black '   
      onClick={(e) => e.stopPropagation()} >
        <div className='flex gap-2 mb-11'>

          {isEditing ? (
            <h1 className='text-2xl font-bold text-[#0C0E16] dark:text-white'>
              Edit  <span className='text-[#888EB0]'>#</span>{invoice.id}
            </h1>
          ) : (
            <h1 className='text-2xl font-bold text-[#0C0E16] dark:text-white'>
              New Invoice
            </h1>
          )}
        </div>

        <div>
          <p className='text-[#7C5DFA] text-[15px] font-bold mb-6 ' >
            Bill From
          </p>
          <p className='text-[13px] text-[#7E88C3] dark:text-[#DFE3FA] mb-4 font-medium' >
            Street Address
          </p>
          <input type="text" 
            className='w-full outline-none mb-6  dark:bg-[#1E2139] dark:text-white border-[#DFE3FA] border-solid border-2 dark:border-none   rounded-[1px] font-bold text-[15px] px-4 py-2' 
            defaultValue={invoice?.senderAddress.street}  

          />

          <div className='grid grid-cols-3 gap-4 mb-[-1px]'>
            <p className='text-[13px] text-[#7E88C3] mb-4 font-medium dark:text-[#DFE3FA]' >City</p>
            <p className='text-[13px] text-[#7E88C3] mb-4 font-medium dark:text-[#DFE3FA]' >Post Code</p>
            <p className='text-[13px] text-[#7E88C3] mb-4 font-medium dark:text-[#DFE3FA]' >Country</p>
          </div>

          <div className='grid grid-cols-3 gap-4 mb-8'>
            <input type="text" 
              className='w-full outline-none mb-6 font-bold text-[#0C0E16] dark:bg-[#1E2139] dark:text-white border-[#DFE3FA] border-solid border-2 dark:border-none   rounded-[1px]  text-[15px] px-4 py-2' 
              defaultValue={invoice?.senderAddress.city}
               />

            <input type="text" 
              className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2' 
              defaultValue={invoice?.senderAddress.postCode}
               />

            <input type="text" 
              className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2' 
              defaultValue={invoice?.senderAddress.country}
              />
          </div>
        </div>

        <div>
          <h1 className='text-[#7C5DFA] text-[15px] font-bold mb-6 '>Bill To</h1>

          <label  className={`text-[13px] text-[#7E88C3] mb-4 font-medium dark:text-[#DFE3FA] ${formData?.clientName ? "text-[blue]" : "text-red-600"}`}>
            Client's Name
          </label>
          <input type="text"
            className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2'   
            // defaultValue={invoice?.clientName}
            defaultValue={formData?.senderAddress?.street}
            onChange={handleChange}/>

          <label className='text-[13px] text-[#7E88C3] mb-4 font-medium dark:text-[#DFE3FA]'>
            Client's Email
          </label>
          <input type="email" 
            className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2' 
            placeholder='e.g. email@example.com'
            defaultValue={invoice?.clientEmail}
            />

          <label  className='text-[13px] text-[#7E88C3] mb-4 font-medium dark:text-[#DFE3FA]'>
            Street Address
          </label>
          <input type='text' 
            className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2' 
            defaultValue={invoice?.clientAddress.street}
             />
        </div>

        <div>
           <div className='grid grid-cols-3 gap-4 mb-[-1px]'>
              <p className='text-[13px] text-[#7E88C3] mb-4 font-medium dark:text-[#DFE3FA]' >City</p>
              <p className='text-[13px] text-[#7E88C3] mb-4 font-medium dark:text-[#DFE3FA]' >Post Code</p>
              <p className='text-[13px] text-[#7E88C3] mb-4 font-medium dark:text-[#DFE3FA]' >Country</p>
          </div>

          <div className='grid grid-cols-3 gap-4 mb-8'>
            <input type="text" 
              className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2' 
              defaultValue={invoice?.clientAddress.city}
               />

            <input type="text" 
              className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2' 
              defaultValue={invoice?.clientAddress.postCode}
              />

            <input type="text" 
              className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2' 
              defaultValue={invoice?.clientAddress.country}
               />
          </div>
           
           <div className='flex gap-4 '>

            <div className='flex flex-col  gap-4 border w-[100%] opacity-50'>
              <p className='text-[13px]  font-medium text-[#7E88C3] dark:text-[#DFE3FA] '>
                Invoice Date
              </p>

              <button
                className='border border-[#DFE3FA] dark:border-none dark:bg-[#1E2139] dark:text-white   rounded-[4px]  outline-none border-solid flex text-[15px] font-bold text-[#0C0E16] justify-between px-5 py-2 items-center  '>
                  {formatDate(invoice?.createdAt || 'Aug 21 2021')}
                <i className="fa-solid fa-calendar text-[#7C5DFA] dark:text-[#7E88C3]"></i>
              </button>
            </div>

            <div className='flex flex-col  gap-4  border w-[100%]'>
              <p className='text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]'>
                Payment Terms
              </p>
              <button 
                className='border border-[#DFE3FA] dark:border-none dark:bg-[#1E2139] dark:text-white rounded-[4px] border-solid flex text-[15px] font-bold text-[#0C0E16] justify-between px-5 py-2 items-center  '>
                Net {invoice?.paymentTerms || '30'} Days
              <i className="fa-solid fa-angle-down text-[17px] text-[#7C5DFA]"></i>
              </button>
            </div>
          </div>

          <div className='mt-8'>
            <p  className='text-[13px] text-[#7E88C3] mb-3 font-medium dark:text-[#DFE3FA]'>
              Project Description
            </p>
            <input type='text'
              className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2'  
              placeholder='e.g. Graphic Design Service'
              defaultValue={invoice?.description}
              />
          </div>

          <div className='mb-6 relative'>
            <h1 className='text-[18px] font-bold mb-4 text-[#777F98]'>Item List</h1>
            <div className='grid grid-cols-[200px_50px_100px_80px_10px] mb-4 gap-5'>
              <p className='text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]'>Item Name</p>
              <p className='text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]'>Qty.</p>
              <p className='text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]'>Price</p>
              <p className='text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]'>Total</p>
            </div>

         {items?.map((item) => (
          <div key={item.name} className='grid grid-cols-[200px_50px_100px_80px_10px] gap-5 mb-5 items-center'>
              <input type='text' 
                className='w-full outline-none  font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2'  
                defaultValue={item.name}
                />
              
              <input type='text' 
                className='w-full outline-none  font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2'  
                defaultValue={item.quantity}
               />

              <input type='text' 
                className='w-full outline-none  font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2'  
                defaultValue={item.price}
              />
              <p className='font-bold text-[15px] text-[#888EB0]'>{item.total || ''}</p>
              <i className="fa-solid fa-trash text-[#888EB0] "></i>
            </div>
         ))}

         <div className='mb-20'>
          <button className='bg-[#F9FAFE] text-[#7E88C3] rounded-3xl w-full text-[15px] font-bold py-3 hover:bg-[#DFE3FA] dark:text-[#DFE3FA] dark:bg-[#252945] '>
            + Add New Item
          </button>
         </div>

          {isEditing ? ( 
            <div className='fixed bottom-0 left-[88px] w-[40rem] '>
              <div className='flex py-[31px] px-[50px]  w-[655px] justify-end  bg-[#FFFFFF] dark:bg-[#1E2139] p-4 gap-3 rounded-br-[20px] rounded-tr-[20px] '>
                <button className='text-[15px] bg-[#F9FAFE] text-[#7E88C3] dark:text-[#DFE3FA] dark:bg-[#252945] rounded-3xl py-3 px-5 font-bold'>Cancel</button>
                <button className='text-[15px] text-[#F9FAFE] bg-[#7E88C3] dark:bg-[#7C5DFA] dark:text-white rounded-3xl py-3 px-5 font-bold'>Save Changes</button>
              </div>
            </div>
            ) : (
              <div className='fixed bottom-0 left-[88px] w-[40rem]   '>
                <div className='flex py-[31px] px-[50px]  w-[655px] justify-between bg-[#FFFFFF] dark:bg-[#1E2139] p-4   rounded-br-[20px] rounded-tr-[20px] gap-[9rem] '>
                  <button className='text-[15px] bg-[#F9FAFE] text-[#7E88C3] dark:bg-[#F9FAFE] dark:text-[#7E88C3] rounded-3xl py-3 px-5 font-bold'>Discard</button>
                  <div>
                    <button className='bg-[#373B53] dark:bg-[#373B53] dark:text-[#DFE3FA] rounded-3xl py-3 px-5 font-bold text-[15px] text-[#888EB0]'>Save as Draft</button>
                    <button className='text-[15px] text-[#F9FAFE] bg-[#7E88C3] dark:bg-[#7C5DFA] dark:text-white rounded-3xl py-3 px-5 font-bold ml-[10px]'>Save and Send</button>
                  </div>
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
