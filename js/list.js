document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("button-search").addEventListener("click", async e => {
        var inputSearch = document.getElementById("input-search");
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${inputSearch.value}`);
        const characterList = await response.json();
        var itemList = document.getElementById("my-list");
        itemList.replaceChildren();
        createList(characterList);
    })
    document.querySelector("#exampleModal").addEventListener('show.bs.modal', async event => {
        // Button that triggered the modal
        console.log(event);
        var characterId = event.relatedTarget.getAttribute("data-detail");
        const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
        const character = await response.json();
        console.log(character);
        var modalTemplate = document.getElementById("exampleModal")
        modalTemplate.querySelector("[data-title]").textContent = character.name
        modalTemplate.querySelector("[data-species]").textContent = character.species
        modalTemplate.querySelector("[data-episode]").textContent = `Total Episodes: ${character.episode.length}`
        var statusBadge = modalTemplate.querySelector("[data-status]")
        statusBadge.textContent = character.status
        statusBadge.setAttribute("data-status", character.status);
        modalTemplate.querySelector("[data-img]").src = character.image;

    });
    document.querySelector(".btn.btn-primary").addEventListener("click", event => {
        fetch("https://rickandmortyapi.com/api/character").then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(response);
            return response.json();
        }).then((response) => {
            console.log(response);
            createList(response);
        });
    });
    document.querySelector(".btn.btn-light").addEventListener("click", event => {
        var itemList = document.getElementById("my-list");
        itemList.replaceChildren();
    });

    function createList(response) {
        var itemList = document.getElementById("my-list");
        var template = document.getElementById("list-template");
        response.results.forEach(element => {
            var clone = template.content.cloneNode(true);
            clone.querySelector(".col-xs-12").setAttribute("data-detail", element.id);
            clone.querySelector("[data-id='title']").textContent = element.name;
            clone.querySelector("[data-id='content']").textContent = element.species;
            clone.querySelector("[data-id='img']").src = element.image;
            itemList.appendChild(clone);
        });
    }

});