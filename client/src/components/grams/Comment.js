import React from 'react'
import {
  CardHeader, CardContent, CardActions, IconButton,
  Button, TextField, Avatar, Typography, Box, Checkbox
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    marginBottom: 20,
    height: "100%"
  },
  media: {
    width: "100%",
    // paddingTop: '56.25%', // 16:9
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  un: {
    display: 'inline-flex',
    paddingRight: 5,
    color: 'black'
  },
  cap: {
    display: 'inline-flex'
  },
  imageWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    justifyContent: "center"
  },
  button: {
    padding: 0,
    margin: 0
  }
}));

const Comment = (props) => {
  const classes = useStyles()

  const { accountName, comment } = props
  return (
    <>
      <div>
        <strong>{accountName.username}</strong> <span>{comment}</span>
        </div>
    </>
  )
}

export default Comment
