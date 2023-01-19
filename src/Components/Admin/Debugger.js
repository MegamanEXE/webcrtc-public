
import { useEffect, useState } from 'react';
import componentLibraries from '../../data/componentLibraries.json'
const Debugger = () => {
  const [DATA, setDATA] = useState([]);

  useEffect(() => {
    setDATA(componentLibraries);
  }, []);


  useEffect(()=>{
    const testCode = () => {
      let c = DATA.find((r) => r["loc_name"] === "Standard Component Library");
      if(c===undefined) return;
      console.log(Object.keys(c["components"]));
    }

    testCode();
  });
  

  return (
    <div>Yo</div>
  )
}

export default Debugger