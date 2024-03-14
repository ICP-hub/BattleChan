import * as React from 'react';
import { Link } from 'react-router-dom';
export interface IAppProps {
}
import Bussiness from "../../../../asset/icons/Bussiness.png"
import Cinema from "../../../../asset/icons/Cinema.png"
import Crypto from "../../../../asset/icons/Crypto.png"
import Games from "../../../../asset/icons/Games.png"
import Politics from "../../../../asset/icons/Politics.png"
import Sports from "../../../../asset/icons/Sports.png"
import Technology from "../../../../asset/icons/Technology.png"


export default class App extends React.Component<IAppProps> {
    public render() {
        return (
            // <div className='bg-dark w-full text-light'>
            <div className='min-h-screen bg-dark text-light pb-[80px]'>
                <div className='flex  justify-center'>

                    <Link to="/createPost">
                        <div className='mx-10 bg-dirty-light-green w-[288px] h-[65px] px-[73px] py-[20px] text-center mt-[5px] font-[700] text-[22px] '> + Create Post</div>
                    </Link>

                </div>



                <div className='flex  font-[700]  sm:pt-[76px]  '>
                    <div className='text-[#6DE580]  sm:w-[1033px] sm:h-[285px] sm:text-[70px] sm:ml-[112px]'> BattleChan: Decentrilized Discussion Battlefeild </div>
                    <div className='text-light font-[400] text-[24px] sm:w-[630px] sm:h-[72px]' >Welcome to BattleChan, where every post battles for supremacy </div>
                </div>

                <div className=' sm:py-[100px] sm:px-[200px] border border-light-green rounded-[1.5rem] sm:mx-[100px] flex text-light font-[400] text-[30px] text-md justify-center'>

                    <div className=' sm:pr-[100px]  '>
                        <div className=' bg-light text-dark text-center rounded-full w-[52px] h-[48px] p-[7px]'>1</div>
                        <div>Connect your Wallet.</div>
                    </div>
                    <div className='   '>
                        <div className=' bg-light text-dark text-center rounded-full w-[52px] h-[48px] p-[7px]'>2</div>
                        <div>Make Post : Earn Time</div>
                    </div>
                    <div className=' sm:pl-[100px]'>
                        <div className=' bg-light text-dark text-center rounded-full w-[52px] h-[48px] p-[7px]'>3</div>
                        <div>Cast your vote</div>
                    </div>
                </div>

                <div className='  border-[0.5px] m-[25px] border-light px-[15px] rounded-md mt-5 pt-[20px] pb-[20px]'>

                    <div className='  grid grid-cols-10 border rounded-[1rem] py-[18px] font-[400] text-[20px] bg-[#3A6841] gap-4 p-[5px]'>
                        <div className="flex col-span-3 border-r-[1px] h-full text-[20px] font-[700] px-[50px]">Name of Subject</div>

                        
                        <div className=" col-span-1 border-r-[1px]">
                        <img src={Bussiness} alt=""  className='' />
                            Business</div>
                        <div className="col-span-1  border-r-[1px]">
                            <img src= {Politics} alt="" />
                            Politics</div>
                        <div className="col-span-1 border-r-[1px]">
                            <img src={Sports} alt="" />
                            Sports</div>
                        <div className="col-span-1  border-r-[1px]">
                            <img src= {Games} alt="" />
                            Games</div>
                        <div className="col-span-1  border-r-[1px]">
                            <img src={Technology} alt="" />
                            Technology</div>
                        <div className="col-span-1  border-r-[1px]">
                            <img src={Crypto} alt="" />
                            Crypto</div>
                        <div className="col-span-1">
                            <img src={Cinema} alt="" />
                            Cinema</div>
                    </div>


                    <div className="grid grid-cols-10 border-0 p-[10px] mt-0 gap-4 ">
                        <div className="col-span-3 font-[700] px-[50px]   border-r-[1px] ">Total Posts</div>
                        <div className="...  border-r-[1px] ">01</div>
                        <div className="...  border-r-[1px] ">02</div>
                        <div className="...  border-r-[1px] ">03</div>
                        <div className="...  border-r-[1px]  ">04</div>
                        <div className="...  border-r-[1px]  ">05</div>
                        <div className="...  border-r-[1px] ">06</div>
                        <div className="...   ">07</div>
                    </div>

                </div>

                <div>
                </div>

            </div>


        );
    }
}
