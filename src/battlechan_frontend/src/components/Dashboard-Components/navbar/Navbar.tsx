
import * as React from 'react';
import bclogo from "../../../images/battlechan 1.png";
import notification from "../../../images/notification.png";
import goldcoin from "../../../images/goldcoin.png";
import userimg from "../../../images/User.png";
import search from "../../../images/search.png";

export interface IAppProps { }
export default class App extends React.PureComponent<IAppProps> {
  public render() {
    return (
      <div className='bg-dark    w-full  font-istok text-light py-9 '>

        <div className=' w-full sm: mt-[5px] mb-6 flex flex-wrap justify-between '>

          <div className=' flex  items-center flex-wrap '>
            <div className='flex flex-wrap  justify-start '>
              <img src={bclogo} className='m-[5px] w-[120px] sm:w-[158px] h-[100px] sm:h-[76px]' alt="" />
            </div>
            <div className="hidden md:block relative ml-3 px-[50px] bg-dark">
              <input type="text" placeholder="Search here..." className="bg-dark py-1.5 pl-[40px] pr-2.25 rounded-full bg-black border-1 placeholder-[#FFFFFF80] text-white w-[551px] h-[48px] text-sm font-normal" />
              <img src={search} className="  absolute left-[60px] top-1/2 transform -translate-y-1/2 w-3.75 h-3.75" />
            </div>
          </div>




          <div className=' hidden md:flex items-center text-white'>
            <div className='rounded-[3rem]  border-light-green border-[0.1px]  flex items-center  py-[5px]'>
              <div className='flex ml-[22px] text-[20px]'>
                <div className='font-[700] text-[20px] bg-blue-800 text-white'>1 $Time Token:</div>
                <div className='text-green-500 ml-1.5'>$0.0050</div>
              </div>
              <div className='bg-light text-dark  font-[700] text-[18px]  text-center px-[38px] py-[11px] rounded-[2rem] mx-[11px]'>Buy</div>
            </div>
            <div className='ml-3'>
              <img src={notification} className='w-[27px] h-[32px]' alt="notification-icon" />
            </div>
          </div>

          <div className='  flex  justify-center    p-[12px] sm:pl-18 pr-[93px] '>
            <div className='  justify-between  ml-[5px] sm:ml-[0px] mt px-4.5 text-[20px] font-[700] '>
              <div className=' font-[700] s text-center  '>Kristin Watson</div>
              <div className='flex  text-center '>
                <img src={goldcoin} className ="   " alt="" />
                <div className=''>530</div>
              </div>
            </div>
            <img src={userimg} className=' justify-end sm:justify-between ml-3  w-[40px] sm:w-[67px] h-[42px] sm:h-[67px] mt-[3px] sm:mt-[0px]' alt="" />
          </div>

        </div>

        <div className='px-1.5 opacity-50 '>
          <hr />
        </div>

        <div className='flex text-gray-400 font-normal text-md justify-center mt-[20px]'>
          <div className='mx-[7.5px] text-light '>Home</div>
          <div className='mx-[7.5px] text-gray'>Archive</div>
          <div className='mx-[7.5px] text-gray'>Dashboard</div>
        </div>
      </div>
    );
  }
}

