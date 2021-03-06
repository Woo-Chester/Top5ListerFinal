import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';

/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function CommentCard(props) {
    let { commentData, index } = props;

    let commenter = commentData.commenter;
    let comment = commentData.comment;


    let commentElement = 
            <ListItem
                id={commentData._id}
                className='comment-card'
                key={commentData._id}
            >
                <Typography 
                display='block'
                >
                    <p>{commenter}</p>
                    <p>{comment}</p>
                </Typography>
                
            </ListItem>;

    return (
            commentElement
    )
}

export default CommentCard;