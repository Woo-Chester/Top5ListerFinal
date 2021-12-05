import { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Fab, Typography } from '@mui/material'
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const { idNamePair } = props;
    const [text, setText] = useState(idNamePair.name);
    const [list, setList] = useState();
        
    useEffect(() => {
        // Make other things better
        store.getTopListById(idNamePair._id).then( (result) => {
            setList(result)
        });
    });

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    let published = "";
    let ownerEmail = "";
    let likes = 0 ;
    let dislikes = 0;
    //console.log(list);
    if(list != undefined){
        published = list.published=='3000-01-01T05:00:00.000Z' ? "#fefdf0" : "#c8d2fd" ;
        ownerEmail = list.ownerEmail;
        likes = list.likes;
        dislikes = list.dislikes;
    }
    
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            button
            onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }
            }
            style={{
                width: '100%',
                height: '15vh',
                background: published,
                borderRadius: '2%',
                lineHeight: '75%'
            }}
        >
                <Box sx={{ p: 1, flexGrow: 1 }}><h3>{idNamePair.name}</h3><p>By: {ownerEmail}</p><p>Edit</p></Box>
                {/* <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box> */}
                <Box sx={{ p: 1}}>
                    <IconButton>
                        <ThumbUpOutlinedIcon />
                    </IconButton>
                    <Typography variant='span'>{likes}</Typography>
                </Box>
                <Box sx={{ p: 1}}>
                    <IconButton>
                        <ThumbDownOutlinedIcon />
                    </IconButton>
                    <Typography variant='span'>{dislikes}</Typography>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                        <DeleteIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;