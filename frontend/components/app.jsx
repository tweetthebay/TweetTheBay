import React from 'react';
import MapContainer from './map/map_container';
import HeaderContainer from './header/header_container';
import SidebarContainer from './sidebar/sidebar_container';

const App = ({ children }) => (
  <div className='root-div'>
    <HeaderContainer />
    <main className='index-body'>
      <SidebarContainer />
      <MapContainer />
    </main>
    {children}
  </div>
);

export default App;
