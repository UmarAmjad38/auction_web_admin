const theme = {
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h5: {
      fontWeight: 700,
      color: '#2D3748',
    },
    h4: {
      fontSize: '24px',
      fontWeight: 500,
      color: '#2D3748',
    },
    body1: {
      color: '#383838',
    },
  },
  palette: {
    primary: {
      main: "#2F83E9",
      main1: "#2D3748",
      main2: "#838383",
      main3: "#FFFFFF",
      main4: "#E2E8F0",
      main5: "#212121",
      main6: "#DBDFED",
      main7: "#C4C4C4",
      main8: "#19549F",
      main9: "#2D8CF0",
      main10: "#383838",
    },
    secondary: {
      main: '#FF5630', // Set secondary color
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: '#383838', // Default text color for all typography
        },
      },
    },
  },
};

export default theme;
