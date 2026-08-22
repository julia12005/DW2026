const cursos = [
    {
        id: 1,
        nome : "HTML e CSS",
        descrição : "Aprenda a estrtutra",
        categoriaHoras : 40,
        ativo : true,
        categoria : "Frontend"
    },
    {
        id: 2,
        nome : "JavaScript",
        descrição : "Aprenda a estrtutra",
        categoriaHoras : 40,
        ativo : false,
        categoria : "Backend"
    },
]


const listaCursos = document.querySelector("#listaCursos")
const btnTodos = document.querySelector("#btnTodos")
const btnAtivos = document.querySelector("#btnAtivos")

function renderizarCursos(lista) {
    listaCursos.innerHTML = "";

    lista.forEach(cursos => {
        const card = `
        
            <div>
                <span>
                    ${cursos.categoria}
                </span>
                <h3>
                ${cursos.nome}
                </h3>
                <p>
                ${cursos.descrição}
                </p>
            </div>
        `;
        listaCursos.insertAdjacentHTML("beforebegin", card);
    });

}

renderizarCursos(cursos);

btnTodos.addEventListener("click", () => {});