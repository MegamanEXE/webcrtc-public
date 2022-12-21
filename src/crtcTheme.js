import { createTheme } from '@mui/material/styles';

export default function crtcTheme(){
    const theme = createTheme({
        palette: {
            primary: {main: '#5C54D6'},
            background: {default: '#F3F4F6'},
        }
    });

    return theme;
}