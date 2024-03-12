import * as React from 'react';
import { Link } from 'react-router-dom';
export interface IAppProps {
}

export default class App extends React.Component<IAppProps> {
    public render() {
        return (
            <div className='bg-black text-white'>
                {/* <Link to="/">
                    <div className='mx-10 text-[30px] w-[340px] bg-blue-400 p-2'>Go to Landing Page... </div>
                </Link> */}
                <div className='flex  justify-center'>

                    <Link to="/createPost">
                        <div className='mx-10 bg-green-600 w-[288px] h-[65px] px-[73px] py-[20px] text-center mt-[5px] font-[700] text-[22px] '> + Create Post</div>
                    </Link>

                </div>



                <div className='flex  font-[700]  pt-[76px] '>
                    <div className='text-[#6DE580]  w-[1033px] h-[285px] text-[70px] ml-[112px]'> BattleChan: Decentrilized Discussion Battlefeild </div>
                    <div className='text-white font-[400] text-[24px] w-[630px] h-[72px]' >Welcome to BattleChan, where every post battles for supremacy </div>
                </div>

                {/* <div className=' w-[1000px] flex border pb-[200px] font-[400] text-[30px] justify-center '> */}
                <div className=' py-[100px] px-[200px] border mx-[100px] flex text-white font-[400] text-[30px] text-md justify-center'>

                    <div className=' pr-[100px]  '>
                        <div className=' bg-white text-black text-center rounded-full w-[52px] h-[48px] p-[7px]'>1</div>
                        <div>Connect your Wallet.</div>
                    </div>
                    <div className='   '>
                        <div className=' bg-white text-black text-center rounded-full w-[52px] h-[48px] p-[7px]'>2</div>
                        <div>Make Post : Earn Time</div>
                    </div>
                    <div className=' pl-[100px]'>
                        <div className=' bg-white text-black text-center rounded-full w-[52px] h-[48px] p-[7px]'>3</div>
                        <div>Cast your vote</div>
                    </div>
                </div>

                <div className='  justify-center border  '>
                    <div className='flex bg-green-500'>
                        <div className='border-spacing-y-1 '> Name of Subject</div>
                        <div>Bussiness</div>
                        <div>Politics</div>
                        <div>Sports</div>
                        <div>Games</div>
                        <div>Technology</div>
                        <div>Crypto</div>
                        <div>Cinema</div>
                    </div>
                    <div className='flex'>
                        <div>Total Posts</div>
                        <div>
                            <div>12</div>
                            <div>2hrs</div>
                        </div>
                        <div>
                            <div>12</div>
                            <div>2hrs</div>
                        </div>
                        <div>
                            <div>12</div>
                            <div>2hrs</div>
                        </div><div>
                            <div>12</div>
                            <div>2hrs</div>
                        </div><div>
                            <div>12</div>
                            <div>2hrs</div>
                        </div><div>
                            <div>12</div>
                            <div>2hrs</div>
                        </div><div>
                            <div>12</div>
                            <div>2hrs</div>
                        </div>

                    </div>
                </div>



            </div>


        );
    }
}
