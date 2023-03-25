const now = new Date();

if ([12, 1, 2].includes(now.getUTCMonth() + 1)) { // js utc starts from 0 and ends at 11
    document.write(`<link rel='stylesheet' href='/css/snow.css'>`);
}
