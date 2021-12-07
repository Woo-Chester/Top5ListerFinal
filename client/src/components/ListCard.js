import { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Fab, Typography } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import Grid from '@mui/material/Grid';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import AuthContext from '../auth';
import CommentCard from './CommentCard'



/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const { idNamePair, index } = props;
    const [list, setList] = useState();
    const [open, setOpen] = useState(null);
    const [comments, setComments] = useState("");
        
    useEffect(() => {
        // Make other things better
        store.getTopListById(idNamePair._id).then( (result) => {
            if(list !== result){
                setList(result)
            }
        });
        store.getListComments(idNamePair._id).then( (result) => {
            let commentCards = 
            <List sx={{ width: '90%', left: '5%', maxHeight: '200px', overflow: 'scroll', paddingTop: '0px'}}>
            {
                result.map((commentData, index) => (
                    <CommentCard
                        commentData={commentData}
                        index={index}
                        key={commentData._id}
                        className='comment-cards'
                    />
                ))
            }
            </List>;
            if(commentCards !== comments){
                setComments(commentCards);
            }
        });
    }, [comments]);
    //console.log(list);

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

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleSubmitComment(event){
        if(event.code === "Enter"){
            store.submitComment({list_id: idNamePair._id, commenter: auth.user.username, comment: event.target.value});
            event.target.value = "";
        }
    }

    let published = false;
    let published_date = "";
    let ownerEmail = "";
    let ownerUsername = "";
    let likes = 0 ;
    let dislikes = 0;
    let views = 0;
    let top5List = [];

    let trash = "block";

    if(list != undefined){
        published_date = list.published_date;
        published = list.published;
        published_date = new Date(published_date);
        published_date = published_date.toDateString();
        ownerUsername = list.ownerUsername;
        ownerEmail = list.ownerEmail;
        likes = list.likes;
        dislikes = list.dislikes;
        views = list.views;
        top5List = list.items;
        top5List = top5List.map((item, index) => (
            <Typography
                sx={ {paddingLeft: '30px', lineHeight: '200%', color: '#f1c026', fontSize: '25px'} }
            >
                {(index+1) + ". " + item }
            </Typography>
        ));
        trash = auth.user.email == ownerEmail ? "block" : "none";
    }
    //console.log(published);
    let bg_color = published ? "#c8d2fd" : "#fefdf0";
    let pub_edit = published ? <Typography sx={{p : 1}}>{"Published: " + published_date }</Typography>: <Typography sx={{p: 1, color: 'red'}} onClick={(event) => {handleLoadList(event, idNamePair._id)}}>Edit</Typography>;

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
                            item
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
                                    {comments}
                                    <TextField
                                    onKeyPress={handleSubmitComment}
                                    label="Add a Comment"
                                    sx={{left: '5%', position: 'relative', width: '90%', backgroundColor: '#fff'}}
                                    >
                                    </TextField>
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
                        <p>By: {ownerUsername}</p>
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
                                <DeleteIcon 
                                    sx={{display: trash}}
                                />
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
        </ListItem>

    // if (editActive) {
    //     cardElement =
    //         <TextField
    //             margin="normal"
    //             required
    //             fullWidth
    //             id={"list-" + idNamePair._id}
    //             label="Top 5 List Name"
    //             name="name"
    //             autoComplete="Top 5 List Name"
    //             className='list-card'
    //             onKeyPress={handleKeyPress}
    //             onChange={handleUpdateText}
    //             defaultValue={idNamePair.name}
    //             inputProps={{style: {fontSize: 48}}}
    //             InputLabelProps={{style: {fontSize: 24}}}
    //             autoFocus
    //         />
    // }
    return (
        cardElement
    );
}

export default ListCard;