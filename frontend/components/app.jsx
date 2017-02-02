import React from 'react';
import MapContainer from './map/map_container';
import HeaderContainer from './header/header_container';
import SearchSidebarContainer from './search_sidebar/search_sidebar_container';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = ({ children }) => (
  <MuiThemeProvider>
    <div className='root-div'>
      <HeaderContainer />
      <main className='index-body'>
        <SearchSidebarContainer />
        <MapContainer />
      </main>
      {children}
    </div>
  </MuiThemeProvider>
);

export default App;
