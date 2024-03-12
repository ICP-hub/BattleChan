import * as React from 'react';
import Posts from "./Posts"
export interface IAppProps {
}

export default class App extends React.Component<IAppProps> {
  public render() {
    return (
      <div className='bg-black text-white'>
        <h1 className='font-[800] text-center text-[30px]'>Recent Posts </h1>
        <Posts/>
      </div>
    );
  }
}
