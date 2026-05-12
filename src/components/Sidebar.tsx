import header from '../assets/header.png'
import profile from '../assets/Profile.png'

function Sidebar() {
  return (
    <div className="bg-[#373B53] flex flex-col justify-between fixed h-screen w-[103px] rounded-tr-[20px] rounded-br-[20px]">
      <img src={header} alt="" />
      <div className='flex flex-col items-center mb-3 gap-[32px]'>
        {/* <div className='h-2 w-3 bg-red-400'></div> */}
        {/* <i className="fa-regular fa-moon h-8 w-7"></i> */}
        
        <i className="fa-solid fa-moon text-[#7E88C3] text-lg cursor-pointer"></i>
        <p className='h-[1px] bg-[#494E6E] w-[103px]'></p>
        <img className=' ' src={profile} alt="" />
      </div>
    </div>
  )
}

export default Sidebar