import React from "react";
import './LoadingScreen.css';

const LoadingScreen = ({ratio}) => {
    const getPercentFromRatio = (ratio) => {
        let percent = Math.round(ratio * 100);
        percent = Math.min(Math.max(percent, 0), 100);
        return percent;
    }
    return (
        <div className="popup">
            <div className="loader-wrapper">
                <div className="loader">
                    <div className="outer-spin">
                        <div className="outer-arc outer-arc_start-a"></div>
                        <div className="outer-arc outer-arc_end-a"></div>
                        <div className="outer-arc outer-arc_start-b"></div>
                        <div className="outer-arc outer-arc_end-b"></div>
                    </div>
                </div>
                <div className="loading-percent">Loading<div className="loading-progress">...</div></div>
            </div>
        </div>
    );
}

export default LoadingScreen;