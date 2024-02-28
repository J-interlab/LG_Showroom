import {useState} from "react";

import './buttonPanel.css';

const ButtonPanel = ({handleInfill, handleReset}) => {
    const [infill, setInfill] = useState(true);

    const onInfill = (value) => {
        setInfill(value);
        handleInfill(value)
    }

    const onReset = () => {
        // setInfill(true);
        handleReset();
    }
    
    return ( <div className="panel">
        <div className={"infill infill-on" + (infill ? ' active' : ' inactive') } onClick={()=>onInfill(true)}>
            <img className="img-btn" src={"./images/infill-on" + (infill ? "-active" : "") + ".png"} alt="infill-on" />
        </div>
        <div className="seperator"></div>
        <div className={"infill infill-off" + (infill ? '' : ' active') } onClick={()=>onInfill(false)}>
            <img className="img-btn" src={"./images/infill-off" + (infill ? "" : "-active") + ".png"} alt="infill-off" />
        </div>
        <div className="reset" onClick={onReset}></div>
            
    </div>
    );
}
 
export default ButtonPanel;