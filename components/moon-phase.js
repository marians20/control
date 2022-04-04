import moonPhase from "../services/moon-phases-service";

const MoonPhase = () => {
    const today = new Date();
    const imageSource = moonPhase(today.getFullYear(), today.getMonth(), today.getDate()).image;

    return (<img src={imageSource}></img>)
}

export default MoonPhase;