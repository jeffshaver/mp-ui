import { createMuiTheme } from 'material-ui/styles'
import pink from 'material-ui/colors/pink'
import teal from 'material-ui/colors/teal'

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: pink,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
})

export default theme
