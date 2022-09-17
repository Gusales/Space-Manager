const fetchSM = async () => {
    const resp = await fetch(`https://space-manager-api.herokuapp.com/`);
    console.log(resp)
}
fetchSM();