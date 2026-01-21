document.getElementById("btnTest").addEventListener("click", function () {
    alert("Le JavaScript fonctionne !");
});
const btn = document.getElementById("btnTest");
const resultat = document.getElementById("resultat");

if (btn) {
    btn.addEventListener("click", () => {
        fetch("https://jsonplaceholder.typicode.com/posts/1")
            .then(response => response.json())
            .then(data => {
                resultat.innerHTML = `
                    <h2>${data.title}</h2>
                    <p>${data.body}</p>
                `;
            })
            .catch(error => {
                resultat.innerHTML = "<p>Erreur lors du chargement</p>";
                console.error(error);
            });
    });
}
