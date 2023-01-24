import { Button, IconButton, List, ListItem, ListItemButton, ListSubheader, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { GridAddIcon } from "@mui/x-data-grid";
import { useState } from "react";

export default function TestModalQuestions(props) {
  const [items, setItems] = useState({});
  let questions = props.questions;
  let selectedQuestion = props.selectedQuestion;


  const handleListItemClick = (q) => {
    console.log(q);
  };

  const handleDeleteQuestion = (name, id) => {
    console.log(`Deleting id:${id}, ${name}`)

  }

  const handleAddQuestion = () => {
    console.log("Item added");
  };

  const selectableItems = () => {
    return questions.map((question, index) => (
      <ListItem
        key={question}
        secondaryAction={selectedQuestion === question && (<IconButton edge="end" onClick={() => handleDeleteQuestion(question, index)}><DeleteForeverIcon /></IconButton>)}
        disablePadding
      >
        <ListItemButton
          onClick={(event) => handleListItemClick(question)}
          selected={selectedQuestion === question}
        >
          {question}
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
  questions: ["Item 1"],
  question: "Item 1",
};