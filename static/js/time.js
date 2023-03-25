const getHoChiMinhTime = () => {
    const d = new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60 * 1000;
    const OFFSET = 7;
    const newD = new Date(utc + 1000 * 60 * 60 * OFFSET);
    
    document.getElementById('time').innerHTML = newD.toLocaleTimeString();
};

const interval = setInterval(getHoChiMinhTime, 1000);

const stopGetTime = () => {
    clearInterval(interval);
};
