// import * as React from 'react';
// import img1 from "../../../../asset/post-images/post1img.png"
// import userimg from "../../../../asset/post-images/userimg.png"

// export interface IAppProps {
// }

// export default class App extends React.Component<IAppProps> {
//   public render() {
//     return (
//       <div> 
//         <div className=' text-black p-3 '>
//             <div>
//                 <img src={img1} alt="" />
//             </div>
//             <div>
//             <div className='flex flex-wrap justify-between  '>
//                 <div>
//                     <img src={userimg} alt="" />
//                      </div>
//                 <div>user name </div>
//                 <div>Date</div>
//                 <div>time</div>
//                 <div>id</div>
//             </div>
//             <div className=''>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
//              incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
//              sed do eiusmod tempor incididunt ut labore 
//             </div>
//             </div>
//             <div className='flex flex-wrap justify-between'>
//                 <div>donward</div>
//                 <div>upward</div>
//                 <div>Like</div>
//                 <div>Comments</div>
//             </div>
//              </div>
//       </div>
//     );
//   }
// }

import * as React from 'react';

export interface IAppProps {
}

export default class App extends React.Component<IAppProps> {
  public render() {
    return (
      <div>
        Post 1
      </div>
    );
  }
}
