import '../../App.css'
import ImageListItem from '@mui/material/ImageListItem';

export default function AnswerOption({src,id,setSelectedAnswer,selectedAnswer}) {
    function handleClick(name){
        console.log(`${name[1]} selected.`)
        setSelectedAnswer(parseInt(name[1]))
    }

    return (
        <ImageListItem key={id} onClick={(e) => handleClick(id,e)} sx={{maxWidth:'100%'}}>
            <img src={src} style={{ width: 85 }} className={`answerImage ${id===("a"+selectedAnswer) ? 'answerBorder':''}`} alt="Answer Option" />
        </ImageListItem> 
    );
}

