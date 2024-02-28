import React, {useState, useEffect, useRef} from "react";
import Header from './Header';
import MODELS from "../data/constants";
import { getModel, checkParam, sendMessageFromModelname } from "../utils/helpers";


const AdminPage = () => {
    const [model, setModel] = useState('');
    const containerRef = useRef();
    const stateRef = useRef();
    stateRef.current = model;

    // '65r1'
    const modelChanged = (model) => {
        // check if valid model name
        if(MODELS[model] != null) {
            setModel(model);
            if(containerRef.current != null) {
                sendMessageFromModelname(containerRef.current.contentWindow, model);
            }
        }
    }

    const handleLoad = (event) => {
        let obj = event.data;
        
        if(typeof obj === "string")
            obj = JSON.parse(obj);

        if(obj.message === 'scriptLoaded'){
            containerRef.current.contentWindow.postMessage(JSON.stringify({message: 'loadEngine'}), '*');
        }
        else if(obj.message === 'engineLoaded') {
            const _model = stateRef.current;
            sendMessageFromModelname(containerRef.current.contentWindow, _model);
        } 
        return <></>
    }

    useEffect(() => {
        window.addEventListener('message', handleLoad);
    }, []);

    return (<>
        <Header modelChanged={modelChanged}/>
        <div className="viewer-wrapper">
            {model !== '' && <iframe src={`./models/pc_${getModel(model)}.html`} className="viewer" ref={containerRef}></iframe>}
        </div>
    </>);
}

export default AdminPage;