let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let URL_API = 'https://rickandmortyapi.com/api/character/'

const fetchData = (url_api, callback) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url_api, true)
    
    xhttp.onreadystatechange = ((e) => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            callback(null, JSON.parse(xhttp.responseText))
        }else{
            const error = new Error('Error: ' + url_api)
            callback(error, null)
        }
    })
    xhttp.send()
}

fetchData(URL_API, (err1, data1) => {
    if (err1) return console.log(err1);
    
    fetchData(URL_API, data1.results[0].id, (err2, data2) => {
        if (err2) return console.log(err2);

        fetchData(data2.origin.url, (err3, data3) => {
            if (err3) return console.log(err3)

            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
        })
    
    })
})


