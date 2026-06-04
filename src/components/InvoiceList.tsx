import { formatDate } from "../utils/helpers";
import EmptyInvoice from "./EmptyInvoice"
import { Link } from "react-router-dom";
import { Invoice } from "../types/invoice";
import InvoiceForm from "./InvoiceForm";
import { useState } from "react";

type InvoiceListProps = {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedInvoice: Invoice | null;
  setSelectedInvoice: React.Dispatch<
    React.SetStateAction<Invoice | null>
  >;
  invoiceData: Invoice[];
  handleAddList: (data: Invoice) => void;
  handleUpdateInvoice: (data: Invoice) => void;

};

export default function InvoiceList( {showForm, handleUpdateInvoice, handleAddList ,invoiceData, setShowForm, selectedInvoice, setSelectedInvoice}: InvoiceListProps ) {
    
    const [showStatus, setShowStatus] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);    


    const statusStyles = {
    Paid: "bg-[#33D69F]/10 text-[#33D69F]",
    Pending: "bg-[#FF8F00]/10 text-[#FF8F00]",
    Draft: "bg-[#373B53]/10 dark:bg-[#DFE3FA]/10 dark:text-[#DFE3FA] text-[#373B53]",
    }

    const handleCheckbox = (status: string) => {
    setSelectedStatus((prev) =>
    prev.includes(status)
      ? prev.filter((item) => item !== status)
      : [...prev, status]
    );
    };

    const filteredInvoices = selectedStatus.length > 0
    ? invoiceData.filter((invoice) => selectedStatus.includes(invoice.status))
    : invoiceData;

  return (
    <div className="px-[10rem] py-[4rem] ">
        <div className="flex justify-between items-center gap-[20rem]">

            <div>

                <h1 className="text-[#0C0E16] dark:text-[white] text-[38px] leading-[100%] mb-3 font-bold">
                    Invoices
                </h1>

                {invoiceData.length > 0 ? (
                    <p className="text-[#888EB0] font-medium dark:text-[#DFE3FA] text-[13px]">
                        There are {invoiceData.length} total invoices
                    </p>
                    ) : (
                    <p className="text-[#888EB0] font-medium dark:text-[#DFE3FA] text-[13px]">
                        No Invoices
                    </p>
                )}

            </div>

            <div className="flex gap-[44px] relative">
                <button 
                    onClick={() => setShowStatus(!showStatus)}
                    // onMouseOver={() => setShowStatus(true)}
                    className="text-[#0C0E16] dark:text-[white]  text-[15px] font-bold"
                >
                    Filter by Status 
                    {showStatus ? (
                        <i className="fa-solid fa-angle-up text-[#7C5DFA] dark:text-[#7C5DFA] ml-[10px] "></i>  
                    ) : (
                        <i className="fa-solid fa-angle-down text-[#7C5DFA] dark:text-[#7C5DFA] ml-[10px] "></i>  
                    )}
                </button>

                {showStatus && (
                    <div 
                        className='absolute top-12 left-0 z-[999] flex items-center justify-center' 
                        onClick={() => setShowStatus(false)}
                    >
                        <div 
                        className='bg-white shadow-[0px_10px_20px_0px_#48549F40] dark:bg-[#1E2139] flex flex-col gap-3 py-5 px-4 pr-14 rounded-lg' 
                        onClick={(e) => e.stopPropagation()}
                        >

                        {/* --- DRAFT CHECKBOX --- */}
                        <label className="flex items-center cursor-pointer select-none group">
                            <input 
                            type="checkbox" 
                            className="absolute opacity-0 cursor-pointer h-0 w-0"
                            checked={selectedStatus.includes("Draft")}
                            onChange={() => handleCheckbox("Draft")}  
                            />
                            {/* Custom Visual Box */}
                            <div className={`w-4 h-4 rounded mr-3 flex items-center justify-center transition-all duration-200  border-solid border-2 ${
                            selectedStatus.includes("Draft")
                                ? "bg-[#7C5DFA] border-[#7C5DFA]"
                                : "bg-[#DFE3FA] dark:bg-[#252945] border-transparent group-hover:border-[#7C5DFA] group-hover:bg-[#F1EDFF] "
                            }`}>
                            {selectedStatus.includes("Draft") && (
                                <svg width="9" height="9" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                            </div>
                            <span className="text-[#0C0E16] dark:text-white font-bold text-[15px]">Draft</span>
                        </label>


                        {/* --- PENDING CHECKBOX --- */}
                        <label className="flex items-center cursor-pointer select-none group">
                            <input 
                            type="checkbox" 
                            className="absolute opacity-0 cursor-pointer h-0 w-0"
                            checked={selectedStatus.includes("Pending")}
                            onChange={() => handleCheckbox("Pending")}  
                            />
                            {/* Custom Visual Box */}
                            <div className={`w-4 h-4 rounded mr-3 flex items-center justify-center transition-all duration-200 border-solid border-2 ${
                            selectedStatus.includes("Pending")
                                ? "bg-[#7C5DFA] border-[#7C5DFA]"
                                : "bg-[#DFE3FA] dark:bg-[#252945] border-transparent group-hover:border-[#7C5DFA] group-hover:bg-[#F1EDFF] "
                            }`}>
                            {selectedStatus.includes("Pending") && (
                                <svg width="9" height="9" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                            </div>
                            <span className="text-[#0C0E16] dark:text-white font-bold text-[15px]">Pending</span>
                        </label>


                        {/* --- PAID CHECKBOX --- */}
                        <label className="flex items-center cursor-pointer select-none group">
                            <input 
                            type="checkbox" 
                            className="absolute opacity-0 cursor-pointer h-0 w-0"
                            checked={selectedStatus.includes("Paid")}
                            onChange={() => handleCheckbox("Paid")}  
                            />
                            {/* Custom Visual Box */}
                            <div className={`w-4 h-4 rounded mr-3 flex items-center justify-center transition-all duration-200 border-solid border-2 ${
                            selectedStatus.includes("Paid")
                                ? "bg-[#7C5DFA] border-[#7C5DFA]"
                                : "bg-[#DFE3FA] dark:bg-[#252945] border-transparent group-hover:border-[#7C5DFA] group-hover:bg-[#F1EDFF] "
                            }`}>
                            {selectedStatus.includes("Paid") && (
                                <svg width="9" height="9" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            )}
                            </div>
                            <span className="text-[#0C0E16] dark:text-white font-bold text-[15px]">Paid</span>
                        </label>
                        </div>
                    </div>
                    )}

                <button 
                    onClick={() => {
                        setShowForm(true)  
                        setSelectedInvoice(null)
                        setShowStatus(false)
                    }}
                    className="bg-[#7C5DFA] hover:bg-[#9277FF] text-[15px] font-bold text-white px-[15px] py-[10px] rounded-[50px] ">
                    <span className="text-[#7C5DFA] bg-white px-[9px] py-[2px] font-extrabold text-[20px] rounded-[50%] inline-flex items-center mr-[11px] ">
                        +
                    </span>
                    New Invoice
                </button>
            </div>
        </div>

        {showForm && <InvoiceForm   setShowForm={setShowForm} invoice={selectedInvoice} handleUpdateInvoice={handleUpdateInvoice} handleAddList={handleAddList} />}

        {invoiceData.length > 0  ? (

            <div className="mt-12 flex flex-col   gap-7">

                {filteredInvoices.map((invoice) => 

                <Link
                    to={`invoice/${invoice.id}`}
                    key={invoice.id}
                    className=" grid grid-cols-[150px_1fr_1fr_150px_100px_40px] shadow-[0px_10px_10px_-10px_#48549F1A] cursor-pointer  items-center  bg-[#FFFFFF] hover:border-[#7C5DFA] border border-transparent border-solid hover:border-solid dark:bg-[#1E2139] rounded-lg px-[32px] py-[15px] ">
                    
                    <h1 className="text-[15px] dark:text-white font-bold">
                        <span className="text-[#7E88C3]">#</span>
                        {invoice.id}
                    </h1>

                    <p className="text-[13px] text-[#888EB0] dark:text-[#DFE3FA] font-medium">
                        Due {formatDate(invoice.paymentDue)}
                    </p>

                    <p className="text-[#858BB2] dark:text-white font-medium text-[13px]">
                        {invoice.clientName}
                    </p>

                    <h1 className="text-[#0C0E16] dark:text-white text-[15px] font-bold">
                        £ {invoice.total}
                    </h1>

                    <button className={`${statusStyles[invoice.status]} outline-none  text-[15px] font-bold px-2 py-2 rounded-md `}>
                        <span className=" h-[8px] bg-current w-[8px] rounded-md inline-block border-solid border mr-1.5"></span>{invoice.status}
                    </button>

                    <i className="fa-solid fa-angle-right text-[#7C5DFA] text-lg flex justify-center items-center"></i>
                </Link>
                )}
            </div>

        ) : (
            <EmptyInvoice/>
         )
        }
    </div>
  )
}
