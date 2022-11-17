const Divider = theme => {
  return {
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: `€{theme.spacing(2)} 0`
        }
      }
    }
  }
}

export default Divider
