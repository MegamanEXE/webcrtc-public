import { Box, Button, IconButton, List, ListItem, ListItemButton, ListSubheader, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { GridAddIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import produce from "immer";

export default function TestModalQuestions(props) {

  const setSelectedQuestion = props.setSelectedQuestion;
  const selectedQuestion = props.selectedQuestion;
  

  const td = props.testData.questions || [];

  const emptyInitialStates = { "1":"", "2":"", "3":"", "4":"","5":"", "6":"","7":"", "8":"" };

  const handleListItemClick = (q) => {
    setSelectedQuestion(q);
  };

  const handleDeleteQuestion = (name, id) => {
    // console.log(`Deleting id:${id}, ${name}`)
    props.setTestData(td => produce(td, d=>{
      d["questions"].splice(id,1);
    }));

  }

  const handleAddQuestion = () => {
    const newIndex = td.length + 1;
    const newQ = { "number":newIndex, "correct_answer":-1, "questionImages":emptyInitialStates, "answerImages":emptyInitialStates }

    //I did not know of immer at this point of time. I completed handleDeleteQuestion at the end which is why it's using immer.
    props.setTestData({ ...props.testData, "questions": [...props.testData.questions, newQ] });
  };

  const selectableItems = () => {
    return td.map((question, index) => (
      <ListItem
        key={index+1}
        secondaryAction={selectedQuestion === index+1 && (<IconButton edge="end" onClick={() => handleDeleteQuestion(question, index)}><DeleteForeverIcon /></IconButton>)}
        disablePadding
      >
        <ListItemButton
          onClick={(event) => handleListItemClick(index+1)}
          selected={selectedQuestion === index+1}
        >
          {`Item ${index+1}`}
        </ListItemButton>
      </ListItem>
    ));

    ;
  }

  return (<>
    <Box sx={{ maxHeight: '64.5vh', overflowY: 'auto' }}>
      <List
        className='listShadow'
        sx={{ width: '100%' }}
        subheader={
          <ListSubheader className='listSubheader'><Typography variant='subtitle2' fontWeight='bold' color='white' p="8px 16px">Questions</Typography></ListSubheader>
        }
      >

        {selectableItems()}

      </List>
    </Box>
      <Button onClick={() => handleAddQuestion()} className="addQuestionItemBtn" variant="contained" fullWidth sx={{ backgroundColor: '#e0e0e0', my: 1 }}><GridAddIcon sx={{ color: '#676767' }} /></Button>
  </>)
}

TestModalQuestions.defaultProps = {
  questions: [],
  question: "",
  testData:[],
};