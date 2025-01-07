function makeRecommendation(){
    var searchTerm = document.getElementById("searchbar").value.toLowerCase();
    const locales = [];

    if(searchTerm){
        fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            var displayTime = false;
            switch(searchTerm){
                case "country" || "countries":
                    displayTime = true;
                    data.countries.forEach(e => {
                        e.cities.forEach(location => locales.push(location)) 
                    });
                    break;
                case "beach" || "beaches":
                    data.beaches.forEach(e => {locales.push(e);});
                    break;
                case "temple" || "temples":
                    data.temples.forEach(e => {locales.push(e);});
                    break;
                default:
                    displayTime = true;
                    data.countries.forEach(e => {
                        if(e.name.toLowerCase() == searchTerm.toLowerCase()){
                            e.cities.forEach(location => locales.push(location)) 
                        }
                    });
                    break;
            } 

            if(locales.length > 0){
                const flexbox = document.getElementById("target");

                var element = document.getElementById("recommendations");
                if(element){
                    element.parentNode.removeChild(element);
                }

                const recs = document.createElement("div");
                recs.setAttribute("id", "recommendations");
                recs.innerHTML = `<br>Recommendations:<br>`;
                locales.forEach( place => {
                    recs.innerHTML += `<img src=${place.imageUrl}>
                    <h2>${place.name}</h2>`;
                    if(displayTime){
                        const options = { timeZone: `${place.timezone}`, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                        const timezone = new Date().toLocaleTimeString('en-US', options);
                        recs.innerHTML += `<p>Current Time: ${timezone}</p>`;
                    }
                    recs.innerHTML += `<p>${place.description}</p>`;
                })

                flexbox.appendChild(recs);
            }
        })
    }
}
function display(locales){
    
}

document.getElementById("btn-search").addEventListener("click", makeRecommendation);

function clearItAll(){
    var element = document.getElementById("recommendations");
    if(element){
        element.parentNode.removeChild(element);
    }

    document.getElementById("searchbar").value = "";
}

document.getElementById("clearButton").addEventListener("click", clearItAll);