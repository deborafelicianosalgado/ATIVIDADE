const participantes = [];

let participanteEditando = null;
let ordemCrescente = true;

function adicionarParticipante(event) {
    event.preventDefault();

    const nome = document.getElementById("input_nome").value;

    // Verifica se está alterando um participante
    if (participanteEditando !== null) {
        const participante = participantes.find(
            p => p.id === participanteEditando
        );

        participante.nome = nome;

        participanteEditando = null;

        document.querySelector("button[type='submit']").textContent = "Adicionar";

        document.getElementById("input_nome").value = "";

        listar();

        return;
    }

    const obj = {
        id: participantes.length + 1,
        nome: nome
    };

    participantes.push(obj);

    document.getElementById("input_nome").value = "";

    console.log(participantes);

    listar();
}

function listar(sorteadoId) {
    const tbody = document.getElementById("lista");

    tbody.innerHTML = '';

    participantes.forEach(p => {
        const tr = document.createElement("tr");

        if (p.id == sorteadoId) {
            tr.classList.add('sorteado', 'destaque');
        }

        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nome}</td>
            <td>
                <button onclick="editarParticipante(${p.id})">
                    ALTERAR
                </button>

                <button onclick="excluirParticipante(${p.id})">
                    EXCLUIR
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });


    if (participantes.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3">Nenhum participante</td>
            </tr>
        `;
    }
}


function editarParticipante(id) {
    const participante = participantes.find(p => p.id === id);

    if (!participante) {
        return;
    }

    document.getElementById("input_nome").value = participante.nome;

    participanteEditando = id;

    document.querySelector("button[type='submit']").textContent = "ALTERAR";
}


function excluirParticipante(id) {
    const indice = participantes.findIndex(p => p.id === id);

    if (indice !== -1) {
        participantes.splice(indice, 1);


        if (participanteEditando === id) {
            participanteEditando = null;

            document.getElementById("input_nome").value = "";

            document.querySelector("button[type='submit']").textContent = "Adicionar";
        }

        listar();
    }
}


function ordenarParticipantes() {
    participantes.sort((a, b) => {
        const resultado = a.nome.localeCompare(b.nome, "pt-BR");

        return ordemCrescente ? resultado : -resultado;
    });

    document.getElementById("btn_ordenar").textContent =
        ordemCrescente ? "Nome ⬆️" : "Nome ⬇️";

    ordemCrescente = !ordemCrescente;

    listar();
}

function sortear() {
    if (participantes.length === 0) {
        alert("Adicione pelo menos um participante!");
        return;
    }

    const idx = Math.floor(Math.random() * participantes.length);

    const sorteado = participantes[idx];

    listar(sorteado.id);
}

