import invoices from "../data/invoice";
import { formatDate } from "../utils/helpers";
import EmptyInvoice from "./EmptyInvoice"
import { Link } from "react-router-dom";
import { Invoice

 } from "../types/invoice";
import InvoiceForm from "./InvoiceForm";
import invoice from "../data/invoice";

type InvoiceListProps = {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedInvoice: Invoice | null;
  setSelectedInvoice: React.Dispatch<
    React.SetStateAction<Invoice | null>
  >;
};

export default function InvoiceList( {showForm , setShowForm, selectedInvoice, setSelectedInvoice}: InvoiceListProps ) {

    const statusStyles = {
    Paid: "bg-[#33D69F]/10 text-[#33D69F]",
    Pending: "bg-[#FF8F00]/10 text-[#FF8F00]",
    Draft: "bg-[#373B53]/10 text-[#373B53]",
    }
    



  return (
    <div className="px-[10rem] py-[4rem]">
        <div className="flex justify-between items-center gap-[20rem]">
            <div>
                <h1 className="text-[#0C0E16] text-[38px] leading-[100%] font-bold">Invoices</h1>
                <p className="text-[#888EB0] text-[13px]">There are 7 total invoices</p>
            </div>
            <div className="flex gap-[44px] l">
                <button className="text-[#0C0E16] text-[15px] font-bold">
                    Filter by Status 
                    <i className="fa-solid fa-angle-down text-[#7C5DFA] ml-[10px] "></i>  
                </button>
                <button 
                    onClick={() => {setShowForm(true)  
                        setSelectedInvoice(null)} }
                    className="bg-[#7C5DFA] hover:bg-[#9277FF] text-[15px] font-bold text-white px-[15px] py-[10px] rounded-[50px] ">
                    <span className="text-[#7C5DFA] bg-white px-[9px] py-[2px] font-bold text-[18px] rounded-[50%] inline-flex items-center mr-[11px] ">+</span>
                    New Invoice
                </button>
            </div>
        </div>
        {showForm && <InvoiceForm   setShowForm={setShowForm} invoice={selectedInvoice} />}

        {invoices.length > 0  ? (

            <div className="mt-12 flex flex-col   gap-7">

                {invoices.map((invoice) => 

                <Link
                to={`invoice/${invoice.id}`}
                key={invoice.id}
                className=" grid grid-cols-[150px_1fr_1fr_150px_100px_40px] shadow-[0px_10px_10px_-10px_#48549F1A] cursor-pointer  items-center  bg-[#FFFFFF] rounded-lg px-[32px] py-[15px] ">
                    <h1 className="text-[15px] font-bold">
                        <span className="text-[#7E88C3]">#</span>
                        {invoice.id}</h1>

                        <p className="text-[13px] text-[#888EB0] font-medium">Due {formatDate(invoice.paymentDue)}</p>
                        <p className="text-[#858BB2] font-medium text-[13px]">{invoice.clientName}</p>
                        <h1 className="text-[#0C0E16] text-[15px] font-bold">£ {invoice.total}</h1>
                        <button className={`${statusStyles[invoice.status]} outline-none  text-[15px] font-bold px-2 py-2 rounded-md `}>
                            <span className=" h-[8px] bg-current w-[8px] rounded-md inline-block border-solid border mr-1.5"></span>{invoice.status}
                        </button>
                        <i className="fa-solid fa-angle-right  flex justify-center items-center"></i>
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
