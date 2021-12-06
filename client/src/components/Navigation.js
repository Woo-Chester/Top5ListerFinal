import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import EditToolbar from './EditToolbar'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import TextField from '@mui/material/TextField';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';
import Grid from '@mui/material/Grid';


export default function Navigation(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const active = props.active;

    let ths_page = "home";

    return (
        <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        >
            <Grid
            item
            xs={3}
            sm={3}
            md={3}
            sx={{m:-1}}
            >
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/'>
                        <HomeOutlinedIcon
                            className={"navbar-btn" + (active=="0" ? " active-nav": "")}
                        ></HomeOutlinedIcon>
                    </Link>
                </IconButton>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <Link style={{ textDecoration: 'none', color: 'black' }} to='/allLists'>
                        <GroupsOutlinedIcon
                            className={"navbar-btn" + (active=="1" ? " active-nav" : "")}
                        ></GroupsOutlinedIcon>
                    </Link>
                </IconButton>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <PersonOutlineOutlinedIcon
                        className="navbar-btn">
                    </PersonOutlineOutlinedIcon>
                </IconButton>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <FunctionsOutlinedIcon                    
                        className="navbar-btn"
                    ></FunctionsOutlinedIcon>
                </IconButton>
            </Grid>
            <Grid
            item
            xs={7}
            sm={7}
            md={7}
            >
                <TextField
                    fullWidth
                    id="search_nav"
                    label="Search"
                    name="search"
                    autoComplete="search"
                    autoFocus
                ></TextField>
            </Grid>
            <Grid
            item
            xs={2}
            sm={2}
            md={2}
            sx={{paddingLeft: '5px'}}
            >
                <Typography variant="span">
                    Sort By
                 </Typography>
               <IconButton
                    size="large"
                    edge="end"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <SortOutlinedIcon
                        className="navbar-btn">
                    </SortOutlinedIcon>
                </IconButton>
            </Grid>
        </Grid>
    );
}