import { useContext, useState, useEffect } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState();

    async function handleKeyPress(event) {
        if (event.code === "Enter") {
            await store.changeListName(event.target.id, text).then(
                event.target.blur()
            );
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    function handleClose() {
        store.closeCurrentList();
    }
    function handlePublish() {
        store.publishList();
    }

    console.log(store.currentList);
    let editItems = "";
    let currentName = "";
    let currentId = "";
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '80%', bgcolor: 'background.paper' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
        currentName = store.currentList.name;
        currentId = store.currentList._id;
    }
    return (
        <div id="top5-workspace">
             <TextField
                margin="normal"
                required
                id={currentId}
                label={currentName}
                name="name"
                autoComplete={currentName}
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={currentName}
                inputProps={{style: {fontSize: 20}}}
                InputLabelProps={{style: {fontSize: 16}}}
                autoFocus
            />
            <div id="workspace-edit">
                <div id="edit-numbering">
                    <div className="item-number"><Typography variant="h5">1.</Typography></div>
                    <div className="item-number"><Typography variant="h5">2.</Typography></div>
                    <div className="item-number"><Typography variant="h5">3.</Typography></div>
                    <div className="item-number"><Typography variant="h5">4.</Typography></div>
                    <div className="item-number"><Typography variant="h5">5.</Typography></div>
                </div>
                {editItems}
            </div>
            <div id="workshop-btns">
                <Button
                className="workshop-btn"
                onClick={handleClose}
                >Save</Button>
                <Button
                className="workshop-btn"
                onClick={handlePublish}
                >Publish</Button>
            </div>
        </div>
    )
}

export default WorkspaceScreen;