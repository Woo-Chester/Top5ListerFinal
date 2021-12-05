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
import Grid from '@mui/material/Grid';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const { idNamePair, index } = props;
    const [text, setText] = useState(idNamePair.name);
    const [list, setList] = useState();
    const [open, setOpen] = useState(null);
        
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

    function handleOpenList(){
        setOpen(idNamePair._id);
    }
    function handleCloseList(){
        setOpen(null);
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
    let published = false;
    let published_date = "";
    let ownerEmail = "";
    let likes = 0 ;
    let dislikes = 0;
    let views = 0;
    let top5List = [];

    if(list != undefined){
        published_date = list.published;
        published = published_date != '3000-01-01T05:00:00.000Z';
        published_date = new Date(published_date);
        published_date = published_date.toDateString();
        ownerEmail = list.ownerEmail;
        likes = list.likes;
        dislikes = list.dislikes;
        views = list.views;
        top5List = list.items;
        top5List = top5List.map((item, index) => (
            <Typography
                sx={ {paddingLeft: '30px', lineHeight: '200%', color: '#f1c026'} }
            >
                {(index+1) + ". " + item }
            </Typography>
        ))
    }
    //console.log(published);
    let bg_color = published ? "#c8d2fd" : "#fefdf0";
    let pub_edit = published ? "Published: " + published_date : <Typography onClick={(event) => {handleLoadList(event, idNamePair._id)}}>Edit</Typography>;

    let arrow = open==idNamePair._id ?
                 <KeyboardArrowUpOutlinedIcon 
                onClick={() => {
                    handleCloseList();
                }}
                /> :
                <KeyboardArrowDownOutlinedIcon 
                onClick={() => {
                    handleOpenList();
                }}
                /> ;

    let open_menu = open ? <Grid
                            container
                            xs={12}
                            sm={12}
                            md={12}
                            >
                                <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                >
                                    <Box sx={{p:1, background: '#273888', borderRadius: '3%'}}>
                                    {
                                        top5List
                                    }
                                    </Box>
                                </Grid>
                                <Grid
                                item
                                xs={false}
                                sm={6}
                                md={6}
                                >
                                    Comments
                                </Grid>
                            </Grid> : "";
    
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            button
            // onClick={(event) => {
            //     handleLoadList(event, idNamePair._id)
            // }}
            style={{
                width: '100%',
                background: bg_color,
                borderRadius: '2%',
                lineHeight: '75%'
            }}
        >
                <Grid container component="main">
                    <Grid
                    item
                    xs={6}
                    sm={9}
                    md={9}
                    >
                        <h3>{idNamePair.name}</h3>
                        <p>By: {ownerEmail}</p>
                    </Grid>
                    <Grid
                    container
                    item
                    xs={3}
                    sm={3}
                    md={3}
                    >
                        <Grid
                        item
                        xs={4}
                        sm={4}
                        md={4}
                        >
                            <IconButton>
                                <ThumbUpOutlinedIcon />
                            </IconButton>
                            <Typography variant='span'>{likes}</Typography>
                        </Grid>

                        <Grid
                        item
                        xs={4}
                        sm={4}
                        md={4}
                        >
                            <IconButton>
                                <ThumbDownOutlinedIcon />
                            </IconButton>
                            <Typography variant='span'>{dislikes}</Typography>
                        </Grid>

                        <Grid
                        item
                        xs={4}
                        sm={4}
                        md={4}
                        >
                           <IconButton onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete'>
                                <DeleteIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    {open_menu}
                    <Grid
                    item
                    xs={9}
                    sm={9}
                    md={9}
                    >
                        {
                            pub_edit
                        }
                    </Grid>
                    <Grid
                    container
                    item
                    xs={3}
                    sm={3}
                    md={3}
                    >
                        <Grid
                        item
                        xs={8}
                        sm={8}
                        md={8}
                        >
                            Views: {views}
                        </Grid>
                        <Grid
                        item
                        xs={4}
                        sm={4}
                        md={4}
                        >
                            {arrow}
                        </Grid>
                    </Grid>
                </Grid>
                

                {/* <Box sx={{ p: 1, flexGrow: 1 }}><h3>{idNamePair.name}</h3><p>By: {ownerEmail}</p><p>Edit</p></Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={handleToggleEdit} aria-label='edit'>
                        <EditIcon style={{fontSize:'48pt'}} />
                    </IconButton>
                </Box>
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
                        <DeleteIcon/>
                    </IconButton>
                </Box> */}
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