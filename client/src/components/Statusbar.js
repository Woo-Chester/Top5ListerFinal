import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import AuthContext from '../auth';


/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let text ="";

    function handleCreateNewList() {
        store.createNewList();
    }
    const disabled = store.isListNameEditActive;

    const add_list = auth.user ? <Typography variant="h2">Your Lists</Typography> : "";

    if (store.currentList)
        text = store.currentList.name;
    return (
        <div id="top5-statusbar">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
                disabled={disabled}
            >
                <AddIcon />
            </Fab>
            {add_list}
            {/* <Typography variant="h4">{text}</Typography> */}
        </div>
    );
}

export default Statusbar;