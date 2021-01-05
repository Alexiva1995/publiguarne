import React from 'react'
import SoonPage from './views/soon'
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import ThemeBasic from './resources/theme/basic';
import { NotificationProvider } from './@utils/Notification';


export default function App() {
  return (<NotificationProvider>
    <ThemeProvider theme={ThemeBasic}>
      <CssBaseline />
        <SoonPage />
    </ThemeProvider>
  </NotificationProvider>);
}