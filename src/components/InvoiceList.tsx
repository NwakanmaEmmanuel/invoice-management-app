
export default function InvoiceList() {
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
                <button className="bg-[#7C5DFA] text-[15px] font-bold text-white px-[8px] py-[10px] rounded-[20px] ">
                    <span className="text-[#7C5DFA] bg-white px-[9px] py-[4px] font-bold text-[18px] rounded-[50%] mr-[11px] ">+</span>
                    New Invoice
                </button>
            </div>
        </div>
    </div>
  )
}
