// frontend/components/app.jsx
// @flow

import React from 'react';
// support for Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MapContainer from './map/map_container';
import HeaderContainer from './header/header_container';
import SidebarContainer from './sidebar/sidebar_container';
import Footer from './footer/footer';

const App = ({ children }: { children: Object }) => (
  <MuiThemeProvider>
    <div className="root-div">
      <HeaderContainer />
      <main className="index-body">
        <SidebarContainer />
        <MapContainer />
      </main>
      {children}
      <Footer />
    </div>
  </MuiThemeProvider>
);

export default App;
