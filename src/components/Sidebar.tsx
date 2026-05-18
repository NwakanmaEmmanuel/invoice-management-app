import header from '../assets/header.png'
import profile from '../assets/Profile.png'

type SidebarProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Sidebar( {darkMode, setDarkMode}: SidebarProps) {
  return (
    <div className="bg-[#373B53]  z-[999] flex flex-col justify-between fixed h-screen w-[103px] left-0 rounded-tr-[20px] rounded-br-[20px]">
      <img src={header} alt="header-image" />
      <div className='flex flex-col items-center mb-3 gap-[32px]'>
        {/* <div className='h-2 w-3 bg-red-400'></div> */}
        {/* <i className="fa-regular fa-moon h-8 w-7"></i> */}
        
        <div onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? (
            <span className='block w-[13px] h-[11px] mb-[9px]  bg-[#858BB2] cursor-pointer rounded-full'></span>
            ) : ( 
            <i className="fa-solid fa-moon text-[#7E88C3] text-lg hover:text-[#DFE3FA] cursor-pointer"></i>
            )}
        </div>
        <p className='h-[1px] bg-[#494E6E] w-[103px]'></p>
        <img className=' ' src={profile} alt="" />
      </div>
    </div>
  )
}

export default Sidebar