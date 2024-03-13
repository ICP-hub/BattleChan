import * as React from 'react';
import bclogo from "../../images/dark_logo.png"
export interface IAppProps {
}

export default class App extends React.PureComponent<IAppProps> {
  public render() {
    return (
      <div className=' bg-[#0A0A0A]  text-white       ' >
        <div ><img src={bclogo} alt="" /></div>
        <div className='p-2 m-2 rounded-sm'>
            <input type="text" placeholder='Search here...' />
        </div>
        <div className=' border-solid-1 '>
            <div >1 $Time Token: $0.0050</div>
            <div className='bg-white text-black p-2 m-2' >Buy</div>
        </div>


      </div>
    );
  }
}
