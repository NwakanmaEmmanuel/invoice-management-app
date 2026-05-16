import emailIcon from "../assets/Email campaign_Flatline.png";

function EmptyInvoice() {
  return (

    <div className="flex items-center justify-center h-[100%] flex-col ">
        <img src={emailIcon} alt="emailIcon" />
        <h1 className="text-[24px] text-[#0C0E16] mt-14 font-bold">There is nothing here</h1>
        <p className="text-[13px] text-[#888EB0] mt-3 font-medium text-center">Create an invoice by clicking the <br/> New Invoice button and get started</p>
    </div>
  )
}

export default EmptyInvoice
