import React from 'react';
import MapContainer from './map/map_container';
import HeaderContainer from './header/header_container';
import FooterContainer from './footer/footer_container';
import SidebarContainer from './sidebar/sidebar_container';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = ({ children }) => (
  <MuiThemeProvider>
    <div className='root-div'>
      <HeaderContainer />
      <main className='index-body'>
        <SidebarContainer />
        <MapContainer />
      </main>
      {children}
      <FooterContainer />
    </div>
  </MuiThemeProvider>
);

export default App;
