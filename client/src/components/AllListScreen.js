import React, { useState,useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import List from '@mui/material/List';
import DeleteModal from './DeleteModal';
import Navigation from './Navigation';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const AllListScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [lists, setLists] = useState();

    useEffect(() => {
        const query = {published: true};
        const search = "^" + store.searchQuery;
        const searchFor = "name";
        const sort = {};

        store.getTop5ListsByQuery(query, search, searchFor, sort).then((result) => {
            setLists(result);
        })
    }, [store.searchQuery]);

    function handleCreateNewList() {
        store.createNewList();
    }

    const deleteModal = store.listMarkedForDeletion != null ? <DeleteModal></DeleteModal> : null;
    const disabled = store.isListNameEditActive;
    let listCard = "";
    if (lists) {
        console.log("LIST:");
        console.log(lists);
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'var(--swatch-primary)' }}>
            {
                lists.top5Lists.map((list, index) => (
                    <ListCard
                        key={list._id}
                        idNamePair={{_id: list._id, name: list.name}}
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
                active="1"
            />
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            {deleteModal}
        </div>)
}

export default AllListScreen;