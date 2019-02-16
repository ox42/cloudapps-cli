module.exports = (name, data) => {
    console.log('Exposing global object: ' + name);
    global[name] = data;
};
