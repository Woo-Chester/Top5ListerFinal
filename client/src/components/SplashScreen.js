import { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import Copyright from './Copyright'
import ErrorModal from './ErrorModal'

const theme = createTheme();

export default function SplashScreen() {
    return (
    
        <div id="splash-screen">
            <div id="splash-title">
                Welcome To,<br/>
                The Top 5 Lister
                <div id="splash-subtitle">
                    Create your own Top 5 List and see <br/>
                    what others are putting for their Top 5!
                </div>
            </div>
            <div id="splash-buttons">
                <Link href='/login/'>
                    <Button
                        fullWidth
                        variant="contained"
                        className="splash-btn"
                    >
                        Login
                    </Button>
                </Link>
                <Link href='/register/'>
                    <Button
                        fullWidth
                        variant="contained"
                        id="splash_create_btn"
                        className="splash-btn"
                    >
                        Create Account
                    </Button>
                </Link>
                <Link href="#" variant="body2" id="splash-guest-link">
                    Continue as Guest
                </Link>
            </div>
        </div>
    )
}