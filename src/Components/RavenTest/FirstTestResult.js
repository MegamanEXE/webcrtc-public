import '../../App.css'
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Cancel, CheckCircle } from '@mui/icons-material';
import { Stack } from '@mui/system';
import { QuestionPopper } from './QuestionPopper';

export default function FirstTestResult(props) {
  const navigate = useNavigate();
  const results = props.results; //ref

  function handleClick(){
    navigate('/CreateTest',{replace:true});
  }

  //Stop timer
  useEffect(() => {
    props.setTimerStart(false)
  }, []);

  const detailTable = () => {
    const d = results.current.details; //questionNumber, given, correct, qImages, aImages

    

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="Details Table">
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="center">Correct Answer</TableCell>
              <TableCell align="center">Submitted Answer</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {d.map((row) => (
              <TableRow
                key={row.questionNumber}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell><QuestionPopper row={row} qImages={row.qImages} aImages={row.aImages} /></TableCell>
                <TableCell align="center">{row.correct}</TableCell>
                <TableCell align="center">{row.given}</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  

  return (
    <Grid item flexGrow={1} sx={{ order: 2 }}>
      <Box className='resultsContainer'>
        <Typography sx={{ fontWeight:700, size: '24px'}}>First part of the test is complete! </Typography>

        <Typography variant='h2' sx={{fontWeight: 800}}>RESULTS</Typography>

        <Typography variant='h5'>You got <strong>{results.current.score}/{results.current.totalQuestions}</strong> questions correct</Typography>

        <Box id="details">
          {detailTable()}
        </Box>

        <Box className='finishRavenTestBtn'>
          <Button sx={{ flexGrow: '1' }} variant="contained" color="success" onClick={() => handleClick()}>
            CONTINUE TO FINAL PART OF THE TEST
          </Button>
        </Box>
      </Box>
    </Grid>
  )
}

