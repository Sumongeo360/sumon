function toggle(id) {

    let cards = document.querySelectorAll(".card");

    cards.forEach(c => c.classList.remove("show"));

    document.getElementById(id).classList.add("show");
}
