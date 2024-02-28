import React from "react";
import "./guide.css";
const Guide = ({isMobile, closeHandler}) => {

    return (isMobile ? 
        <div className="guide-wrapper-mobile">
            <img src="./images/guide/guide_popup_m.png" alt="guide-popup" className="guide-popup-mobile"/>
            <img src="./images/guide/close_m.png" alt="guide-popup" className="guide-close-mobile" onClick={closeHandler}/>    
        </div> :
        <div className="guide-wrapper">
            <img src="./images/guide/guide_popup.png" alt="guide-popup" className="guide-popup"/>
            <img src="./images/guide/close.png" alt="guide-popup" className="guide-close" onClick={closeHandler}/>    
        </div>
    );
}

export default Guide;