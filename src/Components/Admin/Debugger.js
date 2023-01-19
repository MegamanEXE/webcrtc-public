
import { useEffect, useState } from 'react';
import componentLibraries from '../../data/componentLibraries.json'
const Debugger = () => {
  const [DATA, setDATA] = useState([]);
  const DATA2 = componentLibraries;

  useEffect(() => {
    setDATA(componentLibraries);
  }, []);

  useEffect(() => {
    function foo() {
      let ticked = [];
      for (const [k, v] of Object.entries(DATA2[1]["components"]["Lines"]["shapes"])) {
        if (DATA2[1]["components"]["Lines"]["shapes"][k] === true) {
          console.log(`${k} ${v}`)
          ticked.push(k);

        }
      }
      //console.log(ticked)
    }

    foo()
  },[DATA]);

  return (
    <div>yeet</div>
  )
}

export default Debugger