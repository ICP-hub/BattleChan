import * as React from 'react';
import Posts from "./Posts"
export interface IAppProps {
  darkColor:string
  lightColor:string
}

export default class App extends React.Component<IAppProps> {
  public render() {
    return (
      <div className='bg-dark text-light'>
        <h1 className='font-[800] text-center text-[30px]'>Recent Posts </h1>
        <Posts darkColor='dark' lightColor='light'/>
      </div>
    );
  }
}
