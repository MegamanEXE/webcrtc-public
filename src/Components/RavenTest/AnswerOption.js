import '../../App.css'
import ImageListItem from '@mui/material/ImageListItem';

export default function AnswerOption({src,id}) {
    function handleClick(name){
        console.log(`${name} selected`)
    }

    return (
        <ImageListItem onClick={(e) => handleClick(id,e)} sx={{maxWidth:'100%'}}><img src={src} className="answerImage" alt="Answer Option" /></ImageListItem> 
    );
}

