import '../../App.css'
import ImageListItem from '@mui/material/ImageListItem';

export default function AnswerOption({src,id,setSelectedAnswer,selectedAnswer}) {
    function handleClick(id){
        // console.log(`${name[1]} selected.`)
        setSelectedAnswer(parseInt(id))
    }

    return (
        <ImageListItem key={id} onClick={(e) => handleClick(id,e)} sx={{maxWidth:'100%'}}>
            <img src={src} style={{ width: 85 }} className={`answerImage ${id===selectedAnswer ? ' answerBorder':''}`} alt="Answer Option" />
        </ImageListItem> 
    );
}

