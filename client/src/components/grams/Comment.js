import React from 'react'
import {
  CardHeader, CardContent, CardActions, IconButton,
  Button, TextField, Avatar, Typography, Box, Checkbox
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const Comment = (props) => {

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
