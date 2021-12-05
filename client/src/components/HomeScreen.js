import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import DeleteModal from './DeleteModal';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SortOutlinedIcon from '@mui/icons-material/SortOutlined';


/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    const deleteModal = store.listMarkedForDeletion != null ? <DeleteModal></DeleteModal> : null;
    const disabled = store.isListNameEditActive;
    let ths_page = "home";
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'var(--swatch-primary)' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
            {/* <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                disabled={disabled}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography> */}

                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <HomeOutlinedIcon
                        className={"navbar-btn" + (ths_page=="home" ? " active-nav": "")}
                    ></HomeOutlinedIcon>
                </IconButton>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <GroupsOutlinedIcon
                        className="navbar-btn"
                    ></GroupsOutlinedIcon>
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
                <TextField
                fullWidth
                id="search_nav"
                label="Search"
                name="search"
                autoComplete="search"
                autoFocus
              ></TextField>
              <div>
              <Typography style={{display :"inline"}}>
              Sort By
            </Typography>
              <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <SortOutlinedIcon
                        className="navbar-btn">
                    </SortOutlinedIcon>
                </IconButton>
              </div>
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            {deleteModal}
        </div>)
}

export default HomeScreen;