
import * as React from 'react';
import bclogo from "../../../images/battlechan 1.png";
import notification from "../../../images/notification.png";
import goldcoin from "../../../images/goldcoin.png";
import userimg from "../../../images/User.png";
import search from "../../../images/search.png";

export interface IAppProps {}

export default class App extends React.PureComponent<IAppProps> {
  public render() {
    return (
      <div className='bg-[#0A0A0A] text-lg font-bold text-white py-9'>

        <div className='mt-10 mb-6 flex flex-wrap justify-between items-center'>

          <div className='flex items-center'>
            <div className=' ml-[30px]'><img src={bclogo} className='w-30 h-15 ml-18' alt="" /></div>
            <div className="relative ml-3">
              <input type="text" placeholder="Search here..." className="py-1.5 pl-7.5 pr-2.25 rounded-full bg-black border placeholder-[#FFFFFF80] text-white w-[551px] h-[48px] text-sm font-normal" />
              <img src={search} className="absolute left-2.625 top-1/2 transform -translate-y-1/2 w-3.75 h-3.75" />
            </div>
          </div>

          <div className='flex items-center'>
            <div className='rounded-xl border border-green-500 flex items-center px-[10px] py-[5px]'>
              <div className='flex text-lg p-3.75'>
                <div>1 $Time Token:</div>
                <div className='text-green-500 ml-1.5'>$0.0050</div>
              </div>
              <div className='bg-white text-black m-[1.5px] px-[6.75px] py-[2.25px] mx-[3.75px] rounded-md font-[400]'>Buy</div>
            </div>
            <div className='ml-3'>
              <img src={notification} className='w-6.75 h-7.5' alt="notification-icon" />
            </div>
          </div>

          <div className='flex items-center pl-18 pr-[93px]'>
            <div className='px-4.5'>
              <div>Kristin Watson</div>
              <div className='flex items-center'>
                <img src={goldcoin} alt="" />
                <div className='ml-1.5'>530</div>
              </div>
            </div>
            <img src={userimg} className='ml-3' alt="" />
          </div>

        </div>

        <div className='px-1.5'>
          <hr />
        </div>

        <div className='flex text-gray-400 font-normal text-md justify-center'>
          <div className='mx-[7.5px]'>Home</div>
          <div className='mx-[7.5px]'>Archive</div>
          <div className='mx-[7.5px]'>Dashboard</div>
        </div>
      </div>
    );
  }
}
