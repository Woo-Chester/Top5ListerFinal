import React, { useContext,useState, useEffect } from 'react'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import List from '@mui/material/List';
import DeleteModal from './DeleteModal';
import Navigation from './Navigation';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [lists, setLists] = useState();

    useEffect(() => {
        store.loadIdNamePairs(store.searchQuery);
    },[]);

    function handleCreateNewList() {
        store.createNewList();
    }

    const deleteModal = store.listMarkedForDeletion != null ? <DeleteModal></DeleteModal> : null;
    const disabled = store.isListNameEditActive;
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'var(--swatch-primary)' }}>
            {
                store.idNamePairs.map((pair, index) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        index={index}
                    />
                ))
            }
            </List>;
    }
    return (
        <div>
            <Navigation
                active="0"
            />
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            {deleteModal}
        </div>)
}

export default HomeScreen;