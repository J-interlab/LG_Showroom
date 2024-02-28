const getQuality = (param) => {
    const token = param.split('-')
    if(token.length > 1) {
        return token[1];
    }
    return 'pc';
}

// 83g2_ns-medium
const getFullModel = (param) => {
    return param.split('-')[0]
}

const getModel = (param) => {
    const fullModel = getFullModel(param);
    return fullModel.split('_')[0]
}

const checkParam = (param, part) => {
    return param.split('_').indexOf(part) >= 0;
}

const sendMessageFromModelname = (contentWindow, modelName) => {
    const isBlack = checkParam(modelName, 'b');
    contentWindow.postMessage(JSON.stringify({message: 'setWhite', payload: !isBlack}), '*');

    const isOnePole = checkParam(modelName, '1pole');
    contentWindow.postMessage(JSON.stringify({message: 'setNormalStand', payload: !isOnePole}), '*');

    const isNoStand = checkParam(modelName, 'ns');
    const _modelName = getModel(modelName);
    if(_modelName === '83g2' || _modelName === '65g2') {
        contentWindow.postMessage(JSON.stringify({message: 'showStand', payload: !isNoStand}), '*');
    }
}

export {getQuality, getFullModel, getModel, checkParam, sendMessageFromModelname}