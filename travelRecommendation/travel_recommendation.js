function makeRecommendation(){
    var searchTerm = document.getElementById("searchbar").value.toLowerCase();
    const locales = [];

    if(searchTerm){
        fetch("travel_recommendation_api.json")
        .then(response => response.json())
        .then(data => {
            switch(searchTerm){
                case "countries":
                    data.countries.forEach(e => {locales.push(e);});
                    break;
                case "beaches":
                    data.beaches.forEach(e => {locales.push(e);});
                    break;
                case "temples":
                    data.temples.forEach(e => {locales.push(e);});
                    break;
            }

            const recs = document.getElementById("recommendations");
            recs.innerHTML += `<br>Recommendations:<br>`;
            for (const place in locales) {
                recs.innerHTML += `<h2>${place.name}</h2>
                <p>${place.description}</p>`;
            }
        })
    }
}

document.getElementById("btn-search").addEventListener("click", makeRecommendation);