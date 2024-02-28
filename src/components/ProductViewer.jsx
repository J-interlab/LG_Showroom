import React, {useState, useEffect, useRef} from "react";

import {useParams} from "react-router-dom";
import {isMobile} from "react-device-detect";
import MODELS from "../data/constants";
import Guide from "./Guide";
import LoadingScreen from "./LoadingScreen";
import ButtonPanel from "./ButtonPanel";

import { getFullModel, getQuality, getModel, checkParam, sendMessageFromModelname } from "../utils/helpers";

const ProductViewer = () => {
    const { productName } = useParams();
    
    const [progress, setProgress] = useState(0);
    const [showLoadingScreen, setShowLoadingScreen] = useState(true);
    const [showGuide, setShowGuide] = useState(true);
    const [modelName, setModelName] = useState('');

    const containerRef = useRef();
    
    
    const handleLoad = (event) => {
        let obj = event.data;
        
        if(typeof obj === "string")
            obj = JSON.parse(obj);

        if(obj.message === 'scriptLoaded'){
            containerRef.current.contentWindow.postMessage(JSON.stringify({message: 'loadEngine'}), '*');
        }
        else if(obj.message === 'engineLoaded') {
            const fullModel = getFullModel(productName);
            sendMessageFromModelname(containerRef.current.contentWindow, fullModel);
        } else if(obj.message === 'engineLoadProgress') {
            const _progress = obj.payload;
            setProgress(_progress);
            if(_progress > 1.0 - 1e-5) {
                setTimeout(() => {
                    setShowLoadingScreen(false);
                    setTimeout(() => {
                        setShowGuide(false);
                    }, 8000)
                    
                    const quality = getQuality(productName);
                    if(quality === 'medium' || quality === 'pc') {
                        // console.log('quality')
                        containerRef.current.contentWindow.postMessage(JSON.stringify({message: 'setQuality', payload: quality === 'pc'}), '*');
                    }
                }, 500);
            }
        }
    }

    const guideCloseClicked = () => {
        setShowGuide(false);
    }

    useEffect(() => {
        window.addEventListener('message', handleLoad);
    }, []);

    useEffect(() => {
        const _modelName = getModel(productName);
        if(_modelName == modelName) {
            const fullModel = getFullModel(productName);
            if(containerRef.current != null) {
                sendMessageFromModelname(containerRef.current.contentWindow, fullModel);
            }
        } else {
            setModelName(_modelName);
        }
    }, [productName]); 

    const getSrcString = () => {

        const quality = getQuality(productName);
        const model = getModel(productName);

        return `./models/pc_${model}.html`
    }

    const onReset = () => {
        containerRef.current.contentWindow.postMessage(JSON.stringify({message: 'reset'}), '*');
    }

    const onInfill = (infill) => {
        containerRef.current.contentWindow.postMessage(JSON.stringify({message: 'infill', payload: infill}), '*');
    }

    const isValidModel = () => {
        const fullModel = getFullModel(productName);
        if(MODELS[fullModel] != null) return true;
        return false;
    }

    return (<>
        {isValidModel() ? 
        <div className="viewer-wrapper">
            {productName != null && <iframe src={getSrcString()} className="viewer" ref={containerRef} title="product-viewer"></iframe>}
            {showLoadingScreen && <LoadingScreen ratio={progress}/>}
            {showGuide && <Guide isMobile={isMobile} closeHandler={guideCloseClicked}/>}
            <ButtonPanel handleInfill={onInfill} handleReset={onReset} />
        </div> 
        :
        <div className="viewer-wrapper" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div style={{}}>
                Model not found
            </div>
        </div>
        }
    </>);
}

export default ProductViewer;