//This is used in the ViewTestModal.js. Derived from FirstTestResult.js.
import { Cancel, CheckCircle } from "@mui/icons-material";
import { Button, Fade, Grid, ImageList, ImageListItem, Paper, Popper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { QuestionPopper } from "../RavenTest/QuestionPopper";
import mockTestResults_Images from "../../data/mockTestResults_Images.json"
import mockTestResults from "../../data/mockTestResults.json"
import mockQuizQuestions from "../../data/mockQuizQuestions.json"
import { useEffect, useRef, useState } from "react";


export default function RavenTestResults(props)  {
  const testID = props.testID;
  // const d = results.current.details; //questionNumber, given, correct, qImages, aImages
  const [d, setD] = useState([]);

  useEffect(() => {
    if (d.length !== 0) return;

    const idx_details = mockTestResults_Images.findIndex(r => r.id === testID)
    const userData = mockTestResults_Images[idx_details].ravenTest; //test_name, answers={...}

    const idx_results = mockTestResults.findIndex(r => r.id === testID)
    const test_name = mockTestResults[idx_results].test;
    const testData = mockQuizQuestions[test_name] || "Test not found";

    let tempArr = [];
    for (const a in userData.answers) {
      let entry = {
        questionNumber: a,
        given: userData.answers[a],
        correct: testData.questions[parseInt(a) - 1].correct_answer,
        qImages: testData.questions[parseInt(a) - 1].questionImages,
        aImages: testData.questions[parseInt(a) - 1].answerImages,
      }
      tempArr.push(entry)
    }

    setD([...d, ...tempArr])

  }, [testID]);

  const populateTable = () => {
    //Note: without disablePortal, the popper will render beneath the modal 
    return d.map((row) => (
      <TableRow
        key={row['questionNumber']}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>{QuestionWithIcon(row)}</TableCell>
        <TableCell align="center"><QuestionPopper row={row} qImages={row.qImages} aImages={row.aImages} disablePortal={true} /></TableCell>
  

      </TableRow>
    ))
  }

  const QuestionWithIcon = (row) => {
    return row.correct === row.given ?
      <Stack direction="row" alignItems="center" gap={1}>
        <CheckCircle color='success' fontSize='small' />
        Q{row.questionNumber}
      </Stack>
      :
      <Stack direction="row" alignItems="center" gap={1}>
        <Cancel color='error' fontSize='small' />
        Q{row.questionNumber}
      </Stack>
  }


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 310 }} size="small" aria-label="Details Table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(d.length>0) && populateTable()}

        </TableBody>
      </Table>
    </TableContainer>
  );
}