import header from '../assets/header.png'
import profile from '../assets/Profile.png'
import { useInvoice } from '../contexts/InvoiceContext'

type SidebarProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar( {darkMode, setDarkMode}: SidebarProps) {
  return (
    <div className="bg-[#373B53] w-full z-[999] flex lg:flex-col justify-between md:bg-red md:flex-row md:w-full md:rounded-none fixed lg:h-screen lg:w-[103px] left-0 lg:rounded-tr-[20px] lg:rounded-br-[20px]">
      <img src={header} alt="header-image" />
      <div className='flex lg:flex-col lg:p-0 md:flex-row items-center md:mb-0 pr-[1.5rem] md:pr-6 mb-0 lg:mb-3 gap-[32px]'>
        {/* <div className='h-2 w-3 bg-red-400'></div> */}
        {/* <i className="fa-regular fa-moon h-8 w-7"></i> */}
        
        <div onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <span className='block w-[13px] h-[13px] mb-[9px]  bg-[#858BB2] cursor-pointer rounded-full'></span>
            ) : ( 
            <i className="fa-solid fa-moon text-[#7E88C3] text-lg hover:text-[#DFE3FA] cursor-pointer"></i>
            )}
        </div>
        <p className='lg:h-[1px] w-[1px] h-[103px] bg-[#494E6E] md:h-[103px] md:w-[1px] lg:w-[103px]'></p>
        <img className=' ' src={profile} alt="" />
      </div>
    </div>
  )
}

export default Sidebar