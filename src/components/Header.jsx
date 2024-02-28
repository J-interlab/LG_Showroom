import React, {useState, useEffect} from "react"

import "./header.css";
import Select, {components} from "react-select";
import { useLocation } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Arrow from './arrow.svg';
import MODELS from "../data/constants";

const CaretDownIcon = ({menuIsOpen}) => {
    // console.log(1, menuIsOpen)
    return <img src={Arrow} alt="arrow" style={{ height: "10px", marginRight: "2px", transform: menuIsOpen ? "rotate(180deg)" : null}}/>
};

const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
            {/* {console.log(1, props.selectProps.menuIsOpen)} */}
            <CaretDownIcon menuIsOpen={props.selectProps.menuIsOpen}/>
        </components.DropdownIndicator>
    );
};
  
const Header = ({modelChanged}) => {
    const location = useLocation();
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState(undefined);
    const [qualityValue, setQualityValue] = useState('pc');


    const qualityOptions = [
        {value: 'pc', label: "High"}, 
        {value: 'medium', label: "Medium"},
        {value: 'low', label: 'Low'} ]

    useEffect(() => {
        const url = './products.json';
        fetch(url)
        .then(response => response.json())
        .then(data => {
            let optionsFromConfig = [];
            for(let item of data) {
                if(item.model != null && MODELS[item.model] != null) { // valid model
                    let label = MODELS[item.model];
                    if(item.label != null && item.label !== '') {
                        label = item.label;
                    }
                    optionsFromConfig.push({
                        value: item.model,
                        label
                    });
                }
            }
            setOptions(optionsFromConfig);
            if(optionsFromConfig.length > 0) {
                selectChanged(optionsFromConfig[0])
            } else {
                setValue(undefined)
            }
        })
        .catch((error) => {
            console.error('products json error:', error);
        });
    }, []);
    // const options = []
    

    const style = {
        control: (provided, state) => ({
          ...provided,
          fontFamily: "ArialMT",
          fontSize: "16px",
          boxShadow: "none",
          textAlign: "left",
          color: "black",
          backgroundColor: "#e4e4e4",
          border: "none"
        }),
        menu: (provided, state) => ({
          ...provided,
          fontFamily: "ArialMT",
          fontSize: "16px",
          border: "none",
          boxShadow: "none"
        }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
        
            return { ...provided, opacity, transition };
          },
        option: (provided, state) => {
            return {
           ...provided,
           textAlign: "left",
        //    backgroundColor: state.isFocused ? "lightgray" : (state.isSelected && "red"),
           color: state.isFocused && "#b1233d",
           borderWidth: state.innerProps.id.match(/react-select-\d-option-0/g) ? "0" : "1px 0 0 0",
           borderStyle: "solid",
           borderColor: "#ccc",
           padding: "20px 10px",
           margin: "0 10px",
           width: "calc(100% - 20px)"
        }}
      };

    const theme = (theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
        ...theme.colors,
          text: 'orangered',
          primary50: 'white',
          primary25: 'white',
          primary: 'white',
        },
      })
    const selectChanged = (option) => {
        setValue(option.value);
        modelChanged(option.value);
    }

    const selectQualityChanged = (option) => {
        setQualityValue(option.value);
    }

    const getQualityString = () => {
        if(qualityValue === 'medium' || qualityValue === 'low') {
            return '-' + qualityValue;
        }
        return '';
    }

    return (<>
    <div className="header">
        <div className="logo-wrapper">
            <img src="./images/img-lg-ci@2x.png" alt="logo" className="logo"/>
        </div>
        
        <div className="input-wrapper">
            <div className="select-wrapper" >
                <Select className="select"
                    styles={style}
                    options={options} 
                    components={{IndicatorSeparator: () => null, DropdownIndicator }}
                    theme={theme}
                    value={options.filter(option => option.value === value)}
                    onChange={selectChanged}
                    />
                
            </div>
            <div className="quality-select-wrapper" >
                <Select className="select"
                    styles={style}
                    options={qualityOptions} 
                    components={{IndicatorSeparator: () => null, DropdownIndicator }}
                    theme={theme}
                    value={qualityOptions.filter(option => option.value === qualityValue)}
                    onChange={selectQualityChanged}
                    />
            </div>
            <input readOnly type="text" value={value != null ? (window.location + '#/products/' + value + getQualityString()) : ''} className="textbox" />
            <CopyToClipboard 
                text={value != null ? (window.location + '#/products/' + value + getQualityString()) : ''}
                >
                <button className="button">Copy</button>
            </CopyToClipboard>
            
        </div>
    </div>
    </>)
}

export default Header;
