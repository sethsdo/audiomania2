export const guid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 1*10000).toString(16).substring(1);
    }
    console.log(s4())
    return (s4() + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4());
}