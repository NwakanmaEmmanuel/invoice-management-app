import { useParams } from 'react-router-dom';
import invoices from '../data/invoice';
import { formatDate } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';
import InvoiceForm from './InvoiceForm.tsx';
import { Invoice } from '../types/invoice';
import { useState } from 'react';


type InvoiceDetailsProps = {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedInvoice: Invoice | null;
  setSelectedInvoice: React.Dispatch<
    React.SetStateAction<Invoice | null>
  >;
  invoiceData: Invoice[];
  setInvoiceData: React.Dispatch<
    React.SetStateAction<Invoice[]>
  >;
};

function InvoiceDetails( {showForm ,invoiceData, setInvoiceData, setShowForm, selectedInvoice, setSelectedInvoice}: InvoiceDetailsProps) {

  const {id} = useParams()

  const invoice = invoiceData.find((inv) => inv.id === id);
  
  if (!invoice) return <div>Not found</div>

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const filteredInvoices = invoiceData?.filter((inv) => inv.id !== id)


 const statusStyles = {
    Paid: "bg-[#33D69F]/10 text-[#33D69F]",
    Pending: "bg-[#FF8F00]/10 text-[#FF8F00]",
    Draft: "bg-[#373B53]/10 text-[#373B53]",
    }

  const navigate = useNavigate()

  return (
    <div>

      <div className='mt-12  relative'>
      {showDeleteModal && (
        <div 
          className='fixed inset-0 bg-black/50 z-[999] flex items-center justify-center' 
          onClick={() => setShowDeleteModal(false)}
        >

          <div 
            className='bg-[#ffff] dark:bg-[#1E2139] py-10 px-8 rounded-lg ' 
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className='text-[#0C0E16] dark:text-white text-[24px] font-bold mb-6'>
              Confirm Deletion
            </h1>

            <p className='text-[#888EB0] text-[13px] dark:text-[#DFE3FA] font-medium mb-7 leading-6'>
              Are you sure you want to delete invoice {invoice.id}? This action cannot be <br/> undone.
            </p>
            <div className='flex gap-4 justify-end'>
              <button className='bg-[#7E88C3]/10 font-bold text-[15px] rounded-3xl px-5 py-3 text-[#7E88C3] hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#DFE3FA] '>Cancel</button>
              <button 
                onClick={() => {setInvoiceData(filteredInvoices); navigate('/')}}
                className='bg-[#EC5757] text-[15px] font-bold px-7 py-3.5 rounded-3xl text-white hover:bg-[#FF9797] ' >
                  Delete
              </button>
            </div>

          </div>
        </div>
      )}
        <div className='flex items-center gap-3 cursor-pointer ' 
          onClick={ () => navigate(-1)}
        >
          <i className="fa-solid fa-angle-left font-extrabold  text-[#7C5DFA]"></i>
          <h1 className='text-[15px] text-[#0C0E16]  dark:text-white font-bold'>Go back</h1>
        </div>

        <div className='bg-[#FFFFFF] shadow-[0px_10px_10px_-10px_#48549F1A] dark:bg-[#1E2139] flex items-center justify-between rounded-lg px-7 py-7 mt-10'>
          <div className="flex items-center gap-5">
            <p className='text-[#858BB2] dark:text-[#DFE3FA] font-medium'>Status</p>
            <button className={`${statusStyles[invoice.status]}   text-[15px] font-bold px-2 py-2 rounded-md `}>
              <span className=" h-[8px] bg-current w-[8px] rounded-full inline-block border-solid border mr-1.5"></span>{invoice.status}
            </button>
          </div>

          <div className='flex gap-2'>
            <button 
              onClick={() => {
              setShowForm(true);
              setSelectedInvoice(invoice);}}
              className='bg-[#7E88C3]/10 font-bold text-[15px] rounded-3xl px-5 py-3 text-[#7E88C3] dark:text-[#DFE3FA] hover:bg-[#DFE3FA] '
            >
              Edit
            </button>
            <button 
              onClick={() => {
              setShowDeleteModal(true)}}
              className='bg-[#EC5757] text-[15px] font-bold px-7 py-3.5 rounded-3xl text-white hover:bg-[#FF9797] '>
                Delete
            </button>
            <button className='bg-[#7C5DFA] text-[15px] font-bold px-7 py-3.5 text-white rounded-3xl hover:bg-[#9277FF]'>Mark as Paid</button>
          </div>
        </div>

        <div className='bg-white mt-6 rounded-lg  px-12 py-14 dark:bg-[#1E2139]'>
          <div className='grid grid-cols-4'>

            <div className='flex flex-col gap-9'>
              <div className='flex flex-col gap-2 mb-8 '>
                <h1 className='text-[15px] font-bold text-[#0C0E16] dark:text-white '>
                  <span className='text-[#888EB0]'>#</span>
                  {invoice.id}</h1>
                <p className='text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA] '>{invoice.description}</p>
              </div>
              <div className=''>
                <p className='text-[13px] font-medium text-[#7E88C3] mb-2 dark:text-[#DFE3FA]'>Invoice Date</p>
                <h1 className='text-[15px] font-bold text-[#0C0E16] dark:text-white  '>{formatDate(invoice.createdAt)}</h1>
              </div>
              <div className=''>
                <p className='text-[13px] font-medium text-[#7E88C3] mb-2 dark:text-[#DFE3FA]'>Payment Due</p>
                <h1 className='text-[15px] font-bold text-[#0C0E16] dark:text-white '>{formatDate(invoice.paymentDue)}</h1>
              </div>
            </div>

            <div className='mr-24 flex flex-col justify-end'>
              <p className='text-[13px] font-medium text-[#7E88C3] mb-3 dark:text-[#DFE3FA]'>Bill To</p>
              <h1 className='text-[15px] font-bold text-[#0C0E16] mb-2.5 dark:text-white '>{invoice.clientName}</h1>
              <p className='text-[13px] dark:text-[#DFE3FA] font-medium text-[#7E88C3] mb-[2px]'>{invoice.clientAddress.street}</p>
              <p className='text-[13px] dark:text-[#DFE3FA] font-medium text-[#7E88C3] mb-[2px]'>{invoice.clientAddress.city}</p>
              <p className='text-[13px] dark:text-[#DFE3FA] font-medium text-[#7E88C3] mb-[2px]'>{invoice.clientAddress.postCode}</p>
              <p className='text-[13px] dark:text-[#DFE3FA] font-medium text-[#7E88C3]'>{invoice.clientAddress.country}</p>
            </div>
            <div className=' flex flex-col justify-center'>
              <p className='text-[13px] font-medium text-[#7E88C3] mb-3 dark:text-[#DFE3FA]'>Sent to</p>
              <h1  className='text-[15px] font-bold text-[#0C0E16] dark:text-white '>{invoice.clientEmail}</h1>
            </div>
            <div>
              <p className='text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA] mb-[2px]'>{invoice.senderAddress.street}</p>
              <p className='text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA] mb-[2px]'>{invoice.senderAddress.city}</p>
              <p className='text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA] mb-[2px]'>{invoice.senderAddress.postCode}</p>
              <p className='text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA] mb-[2px]'>{invoice.senderAddress.country}</p>
            </div>
          </div>

          <div className='bg-[#F9FAFE] dark:bg-[#252945] mt-12 rounded-tl-[8px] rounded-tr-[8px] pt-10'>   
            <div className='grid grid-cols-4 px-6 mb-8'>
              <p className='text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]'>Item Name</p>
              <p className='text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]'>QTY.</p>
              <p className='text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]'>Price</p>
              <p className='text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]'>Total</p>
            </div>

            {invoice.items.map((item, index) => (
              <div
                key={index}
                className='grid grid-cols-4 px-6 items-center mb-8'
              >
                <h1 className='text-[15px] font-bold text-[#0C0E16] dark:text-white'>
                  {item.name}
                </h1>

                <p className='text-[15px] font-bold text-[#7E88C3] dark:text-[#DFE3FA]'>
                  {item.quantity}
                </p>

                <p className='text-[15px] font-bold text-[#7E88C3] dark:text-[#DFE3FA]'>
                  £ {item.price}
                </p>

                <p className='text-[15px] font-bold text-[#0C0E16] dark:text-white'>
                  £ {item.total}
                </p>
              </div>
            ))}

            <div className='bg-[#373B53] dark:bg-[#0C0E16] rounded-br-lg rounded-bl-lg flex items-center px-6 py-8 justify-between'>
              <p className='text-[13px] font-medium text-white'>
                Amount Due
              </p>

              <h1 className='text-[24px] font-bold text-white'>
                £ {invoice.total}
              </h1>
            </div>
          </div>
        </div>
      </div>
            {showForm && <InvoiceForm  invoice={selectedInvoice} setShowForm={setShowForm}/> }

    </div>

  )
}

export default InvoiceDetails
