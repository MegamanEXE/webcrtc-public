import { Button, IconButton, List, ListItem, ListItemButton, ListSubheader, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { GridAddIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function TestModalQuestions(props) {

  const setSelectedQuestion = props.setSelectedQuestion;
  const selectedQuestion = props.selectedQuestion;
  

  const td = props.testData.questions || [];

  const emptyInitialStates = { "1":"", "2":"", "3":"", "4":"","5":"", "6":"","7":"", "8":"" };

  const handleListItemClick = (q) => {
    console.log(q);
    setSelectedQuestion(q);
  };

  const handleDeleteQuestion = (name, id) => {
    console.log(`Deleting id:${id}, ${name}`)

  }

  const handleAddQuestion = () => {
    const newIndex = td.length + 1;
    const newQ = { "number":newIndex, "correct_answer":-1, "questionImages":emptyInitialStates, "answerImages":emptyInitialStates }
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
  <List
    className='listShadow'
    sx={{ width: '100%', overflow: 'auto' }}
    subheader={
      <ListSubheader className='listSubheader'><Typography variant='subtitle2' fontWeight='bold' color='white' p="8px 16px">Questions</Typography></ListSubheader>
    }
  >

    {selectableItems()}

  </List>
  <Button onClick={()=>handleAddQuestion()} className="addQuestionItemBtn" variant="contained" fullWidth sx={{backgroundColor:'#e0e0e0', my:1}}><GridAddIcon sx={{color:'#676767'}} /></Button>
  </>)
}

TestModalQuestions.defaultProps = {
  questions: [],
  question: "",
  testData:[],
};