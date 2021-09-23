// sa id iz html-a fata  element i ubacuje ga u const
const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Trazi predmete i filtrira

// Ovime vraca ono sto pretrazujemo, async returna ime kolegija
const searchSubjects = async searchText => {
    const res = await fetch("http://www.fulek.com/VUA/SUPIT/GetNastavniPlan");
    const subjects = await res.json(); //prebacio iz stringa u json

    // Get matches to current text input
    let matches = subjects.filter(subject => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return subject.label.match(regex); //da li je isto, autocomplete
    });

    //nema char u search baru pa mora biti prazno
    if(searchText.length == 0) {
        matches = [];
        matchList.innerHTML = '';
    }

    outputhtml(matches);
    //Ispisuje listu istih subjecta
}

//Nacin ispisa
const outputhtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
            <div class = "card card-body mb-1">
                <h4>${match.label}</h4>
            </div>`
        )
        .join('');

        matchList.innerHTML = html;
    }
};

//Underlist kad se upise prvo slovo
search.addEventListener('input', () => searchSubjects(search.value));



//Brisanje redova
$("#tbSubject").on("click", ".delete-row", function(){
    $(this).closest("tr").remove()//Brise najblizi redak tom gumbu
 });