import { formatDate, generateId } from '../utils/helpers';
import { Invoice } from '../types/invoice';
import {  useState } from 'react';
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";


type InvoiceFormProps = {

  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  invoice: Invoice | null;
  handleAddList: (data: Invoice) => void;
};

function InvoiceForm({invoice, handleAddList, setShowForm}: InvoiceFormProps) {

  const isEditing = !!invoice
  const emptyInvoice: Invoice = {
    id: generateId(),
    createdAt: "",
    paymentDue: "",
    description: "",
    paymentTerms: 30,
    clientName: "",
    clientEmail: "",
    status: "Draft",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    items: [],
    total: 0,
  };

  const [formData, setFormData] = useState<Invoice>(
  invoice || emptyInvoice
  )
  const [selectPaymentTerm, setSelectPaymentTerm] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>();
  // const [paymentTerm, setPaymentTerm] = useState(invoice?.paymentTerms || 30)
  const items = formData?.items 

 

  // function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   setFormData((prev) => ({...prev!, name: e.target.value, }))
  // }

  function handlePaymentTerm(days: number) {
    setFormData((prev) => ({...prev, paymentTerms: days}))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
}

  function handleClientAddressChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      clientAddress: {
        ...prev.clientAddress,
        [name]: value,
      },
    }));
  }

  function handleSenderAddressChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      senderAddress: {
        ...prev.senderAddress,
        [name]: value,
      },
    }));


  }
  
  function handleItemChange(
  index: number,
  field: string,
  value: string
) {
  setFormData((prev) => {
    const updatedItems = [...prev.items];

    updatedItems[index] = {
      ...updatedItems[index],
      [field]:
        field === "quantity" || field === "price"
          ? Number(value)
          : value,
    };

    updatedItems[index].total =
  updatedItems[index].quantity * updatedItems[index].price;

    return {
      ...prev,
      items: updatedItems,
    };
  });
}

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleAddList(formData)
    setShowForm(false)
  }

  function handleAddItem() {
    const newItem = {
      name: "",
      quantity: 0,
      price: 0,
      total: 0.00,
    };
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  }

  return (
    <div className='fixed bottom-0 left-[1px] right-0 top-0 bg-black/50 z-50' onClick={() => {  setShowForm(false)}}>
      <form className='bg-[#F8F8FB]  custom-scrollbar dark:bg-[#141625] absolute top-0 left-[6.4rem] h-screen rounded-tr-[12px] rounded-br-[20px] w-[40rem] z-10 p-11 overflow-y-auto text-black '   
      onClick={(e) => e.stopPropagation()} 
      onSubmit={handleSubmit}
      >
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
            value={formData.senderAddress.street || ''}  
            name='street'
            onChange={handleSenderAddressChange}
          />

          <div className='grid grid-cols-3 gap-4 mb-[-1px]'>
            <p className='text-[13px] text-[#7E88C3] mb-4 font-medium dark:text-[#DFE3FA]' >City</p>
            <p className='text-[13px] text-[#7E88C3] mb-4 font-medium dark:text-[#DFE3FA]' >Post Code</p>
            <p className='text-[13px] text-[#7E88C3] mb-4 font-medium dark:text-[#DFE3FA]' >Country</p>
          </div>

          <div className='grid grid-cols-3 gap-4 mb-8'>
            <input type="text" 
              className='w-full outline-none mb-6 font-bold text-[#0C0E16] dark:bg-[#1E2139] dark:text-white border-[#DFE3FA] border-solid border-2 dark:border-none   rounded-[1px]  text-[15px] px-4 py-2' 
              value={formData.senderAddress.city || ''}
              name='city'
              onChange={handleSenderAddressChange}
               />

            <input type="text" 
              className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2' 
              value={formData.senderAddress.postCode}
              name='postCode'
              onChange={handleSenderAddressChange}
               /> 

            <input type="text" 
              className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2' 
              value={formData.senderAddress.country}
              name='country'
              onChange={handleSenderAddressChange}
               />
          </div>
        </div>

        <div>
          <h1 className='text-[#7C5DFA] text-[15px] font-bold mb-6 '>Bill To</h1>

          <label  className={`text-[13px] mb-4 font-medium dark:text-[#DFE3FA] ${formData.clientName ? "text-[#7E88C3]" : "text-red-600 flex justify-between"}`}>
            Client's Name
             {!formData.clientName && <span>can’t be empty</span>} 
          </label>

          <input type="text"
            className={`w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2 ${formData?.clientName ? "border-[#7E88C3]" : "border-[red] hover:border-[red]"} `}  
            // value={invoice?.clientName}
            name='clientName'
            value={formData.clientName || ""}
            onChange={handleChange}/>

          <label className='text-[13px] text-[#7E88C3] mb-4 font-medium dark:text-[#DFE3FA]'>
            Client's Email
          </label>
          <input type="email" 
            className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2' 
            placeholder='e.g. email@example.com'
            name='clientEmail'
            value={formData.clientEmail || ""}
            onChange={handleChange}
            />

          <label  className='text-[13px] text-[#7E88C3] mb-4 font-medium dark:text-[#DFE3FA]'>
            Street Address
          </label>
          <input type='text' 
            className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2' 
            name='street'
            value={formData.clientAddress.street || ""}
            onChange={handleClientAddressChange}
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
              name='city'
              onChange={handleClientAddressChange}
              value={formData.clientAddress.city}
               />

            <input type="text" 
              className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2' 
              name='postCode'
              onChange={handleClientAddressChange}
              value={formData.clientAddress.postCode}
              />

            <input type="text" 
              className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2' 
              name='country'
              onChange={handleClientAddressChange}  
              value={formData.clientAddress.country}
               />
          </div>
           
           <div className='flex gap-4 '>

            <div className={`flex flex-col  gap-4 border w-[100%] relative ${isEditing ? 'opacity-50' : ''}`}>
              <p className='text-[13px]  font-medium text-[#7E88C3] dark:text-[#DFE3FA] ' >
                Invoice Date
              </p>

              <button
              disabled={isEditing}
              type='button'
              onClick={(e) => {
                e.preventDefault();
                setShowDatePicker((prev) => !prev);
              }}
              className='border border-[#DFE3FA] dark:border-none hover:border-[#7E88C3] active:border-[#7E88C3] dark:bg-[#1E2139] dark:text-white   rounded-[4px]  outline-none border-solid flex text-[15px] font-bold text-[#0C0E16] justify-between px-5 py-2 items-center disabled:opacity-50 disabled:cursor-not-allowed ' >
                  {isEditing ? formatDate(invoice.createdAt) : selectedDate
                    ? formatDate(selectedDate.toDateString())
                    : formatDate(new Date().toDateString())}
                <i className="fa-solid fa-calendar text-[#7C5DFA] dark:text-[#7E88C3]"></i>
              </button>

              {showDatePicker && ( 
                <div className="absolute top-20 z-50 bg-white dark:bg-[#1E2139] p-4 rounded-lg shadow-[0px_10px_20px_0px_#48549F40]">
                   <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        setShowDatePicker(false);
                      }}
                      captionLayout="dropdown"
                      startMonth={new Date(2020, 0)}
                      endMonth={new Date(2035, 11)}
                      className="custom-calendar"
                    />
                </div>
              )}
            </div>

            <div className='flex flex-col  gap-4  border w-[100%] relative'>

              <p className='text-[13px] font-medium text-[#7E88C3] dark:text-[#DFE3FA]'>
                Payment Terms
              </p>

              <button 
                 onClick={(e) => {
                   e.preventDefault();
                   setSelectPaymentTerm((prev) => !prev);
                 }}
                className='border border-[#DFE3FA]  hover:border-[#7C5DFA] active:border-[#7C5DFA] dark:border-none dark:bg-[#1E2139] dark:text-white rounded-[4px] border-solid flex text-[15px] font-bold text-[#0C0E16] justify-between px-5 py-2 items-center  '
              >
              
                Net {formData.paymentTerms} Days

               {selectPaymentTerm ? (
                 <i className="fa-solid fa-angle-up text-[17px] text-[#7C5DFA]"></i>
                 ) : ( 
                 <i className="fa-solid fa-angle-down text-[17px] text-[#7C5DFA]"></i>
                )}
              </button>
              {selectPaymentTerm && (
                <div className='absolute bg-[#ffff] dark:bg-[#1E2139] w-full top-20 rounded-md shadow-[0px_10px_20px_0px_#48549F40] justify-start flex flex-col gap-1 z-10 border border-[#DFE3FA] dark:border-none '>
                  <button type='button' 
                    onClick={() => {
                      handlePaymentTerm(1);
                      setSelectPaymentTerm(false);
                    }}
                    className='text-left text-[15px] text-[#0C0E16] hover:text-[#7C5DFA] p-3 border-b-2 border-solid border-[#DFE3FA]  dark:text-white font-bold'>Net 1 Day</button>
                  <button type='button' 
                    onClick={() => {
                      handlePaymentTerm(7);
                      setSelectPaymentTerm(false);
                    }}
                    className='text-left text-[15px] text-[#0C0E16] hover:text-[#7C5DFA] p-3  border-b-2 border-solid border-[#DFE3FA] dark:text-white font-bold'>Net 7 Days</button>
                  <button type='button' 
                    onClick={() => {
                      handlePaymentTerm(14);
                      setSelectPaymentTerm(false);
                    }}
                    className='text-left text-[15px] text-[#0C0E16] hover:text-[#7C5DFA] p-3  border-b-2 border-solid border-[#DFE3FA] dark:text-white font-bold'>Net 14 Days</button>
                  <button type='button' 
                    onClick={() => {
                      handlePaymentTerm(30);
                      setSelectPaymentTerm(false);
                    }}
                    className='text-left text-[15px] text-[#0C0E16] hover:text-[#7C5DFA] p-3  border-b-2 border-solid border-[#DFE3FA] dark:text-white font-bold'>Net 30 Days</button>
                </div>
              )}
            </div>
          </div>

          <div className='mt-8'>
            <p  className='text-[13px] text-[#7E88C3] mb-3 font-medium dark:text-[#DFE3FA]'>
              Project Description
            </p>
            <input type='text'
              className='w-full outline-none mb-6 font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2'  
              placeholder='e.g. Graphic Design Service'
              name='description'
              value={formData.description || ""}
              onChange={handleChange}
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

         {items.map((item, index) => (
          <div key={index} className='grid grid-cols-[200px_60px_100px_80px_10px] gap-5 mb-5 items-center'>
              <input type='text' 
                className='w-full outline-none  font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white  rounded-[1px]  text-[15px] px-4 py-2'  
                value={item.name || ""}
                onChange={(e) => handleItemChange(index, "name", e.target.value)}
              />
              
              <input type='number' 
                className='w-full outline-none  font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white cursor-not-allowed  rounded-[1px]  text-[15px] px-2 py-2'  
                value={item.quantity || ""}
                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
              />

              <input type='number' 
                className='w-full outline-none  font-bold text-[#0C0E16] border-[#DFE3FA] border-solid border-2 dark:border-none dark:bg-[#1E2139] dark:text-white cursor-not-allowed  rounded-[1px]  text-[15px] px-4 py-2'  
                value={item.price || ""}
                onChange={(e) => {handleItemChange(index, "price", e.target.value)}}
              />
              <p className='font-bold text-[15px] text-[#888EB0]'>{item.total || ''}</p>
              <i className="fa-solid fa-trash text-[#888EB0] hover:text-[#EC5757] cursor-pointer "></i>
            </div>
         ))}


         <div className='mb-20'>
          <button 
            onClick={handleAddItem}
            type='button'
            className='bg-[#F9FAFE]  text-[#7E88C3] rounded-3xl w-full text-[15px] font-bold py-3 hover:bg-[#DFE3FA] dark:text-[#DFE3FA] dark:bg-[#252945] '
          >
            + Add New Item
          </button>
         </div>

          {isEditing ? ( 
            <div className='fixed bottom-0 left-[103px] w-[40rem] shadow-[-1px_-9px_20px_0px_#48549F40]'>
              <div className='flex py-[31px] px-[50px]  w-full justify-end  bg-[#FFFFFF] dark:bg-[#1E2139] p-4 gap-3 rounded-br-[12px] rounded-tr-[20px] '>
                <button type='button' className='text-[15px] bg-[#F9FAFE] text-[#7E88C3] dark:text-[#DFE3FA] dark:bg-[#252945] rounded-3xl py-3 px-5 font-bold'>Cancel</button>
                <button type='button' className='text-[15px] text-[#F9FAFE] bg-[#7E88C3] dark:bg-[#7C5DFA] dark:text-white rounded-3xl py-3 px-5 font-bold'>Save Changes</button>
              </div>
            </div>
            ) : (
              <div className='fixed bottom-0 left-[88px] w-[40rem]  shadow-[-1px_-9px_20px_0px_#48549F40] '>
                <div className='flex py-[31px] px-[50px]  w-[655px] justify-between bg-[#FFFFFF] dark:bg-[#1E2139] p-4   rounded-br-[12px] rounded-tr-[20px] gap-[9rem] '>
                  <button className='text-[15px] bg-[#F9FAFE] text-[#7E88C3] dark:bg-[#F9FAFE] dark:text-[#7E88C3] rounded-3xl py-3 px-5 font-bold'>Discard</button>
                  <div>
                    <button type='button' className='bg-[#373B53] dark:bg-[#373B53] dark:text-[#DFE3FA] rounded-3xl py-3 px-5 font-bold text-[15px] text-[#888EB0]'>Save as Draft</button>
                    <button type='button' className='text-[15px] text-[#F9FAFE] bg-[#7E88C3] dark:bg-[#7C5DFA] dark:text-white rounded-3xl py-3 px-5 font-bold ml-[10px]'>Save and Send</button>
                  </div>
              </div>
             </div>
            )
        }

            
          </div>
        </div>


      </form>
    </div>
  )
}

export default InvoiceForm
