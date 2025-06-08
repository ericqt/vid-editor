const splitFileName = (fileName) => {
    console.log('in splitFilename');
    let splitted = fileName.split('.');
    const ext = splitted.pop();
    const name = splitted.join('.')
    console.log('in splitFileName', name, ext)
    return [name, ext]
}

export default splitFileName;
