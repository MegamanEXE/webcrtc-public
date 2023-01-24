import { IconButton, List, ListItem, ListItemButton, ListSubheader, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function TestModalQuestions(props) {
  let questions = props.questions;
  let selectedQuestion = props.selectedQuestion;


  const handleListItemClick = (q) => {
    console.log(q);
  };

  const handleDeleteQuestion = (name, id) => {
    console.log(`Deleting id:${id}, ${name}`)

  }

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

  return (<List
    className='listShadow'
    sx={{ width: '100%', overflow: 'auto' }}
    subheader={
      <ListSubheader className='listSubheader'><Typography variant='subtitle2' fontWeight='bold' color='white' p="8px 16px">Questions</Typography></ListSubheader>
    }
  >

    {selectableItems()}

  </List>
  )
}

TestModalQuestions.defaultProps = {
  questions: ["Item 1"],
  question: "Item 1",
};