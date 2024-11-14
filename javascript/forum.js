let publicacao = [];
let EditIndexMoleza = null;

document.addEventListener('DOMContentLoaded', function () {
    const cookieBanner = document.getElementById('cookie');
    const acceptButton = document.getElementById('aceitarCookie');

    if (!document.cookie.includes('cookieConsent=true')) {
        cookieBanner.style.display = 'block';
    } else {
        cookieBanner.style.display = 'none';
    }

    acceptButton.addEventListener('click', function () {
        document.cookie = "cookieConsent=true; path=/; max-age=" + 60 * 60 * 24 * 30;
        cookieBanner.style.display = 'none';
    });

    const savedPublicacoes = JSON.parse(localStorage.getItem('publicacao'));
    if (savedPublicacoes) {
        publicacao = savedPublicacoes;
        publicacaoMolezinha();
    }

    document.getElementById('addButton').addEventListener('click', function () {
        addPublicacao();
    });

    document.getElementById('saveEdit').addEventListener('click', function () {
        SalvarEdit();
    });

    document.getElementById('closeModal').addEventListener('click', FecharModal);
});

function addPublicacao() {
    const userName = document.getElementById('newName').value;
    const publicacaoText = document.getElementById('newInfo').value;

    if (userName !== '' && publicacaoText !== '') {
        publicacao.push({ name: userName, text: publicacaoText });
        document.getElementById('newName').value = '';
        document.getElementById('newInfo').value = '';
        publicacaoMolezinha();
        saveToLocalStorage();
    }
}

function publicacaoMolezinha() {
    const infoList = document.getElementById('infoList');
    infoList.innerHTML = '';

    publicacao.forEach(function (publi, index) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${publi.name}:</strong> ${publi.text}`;

        setTimeout(function () {
            li.classList.add('visible');
        }, index * 100);

        const editButton = document.createElement('button');
        editButton.innerText = 'Editar';
        editButton.className = 'button-edit';

        editButton.onclick = function () {
            abrirModalEdit(index);
        };

        li.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Remover';
        deleteButton.className = 'button-delete';

        deleteButton.onclick = function () {
            deletarComentario(index);
        };

        li.appendChild(deleteButton);

        infoList.appendChild(li);
    });
}

function abrirModalEdit(index) {
    EditIndexMoleza = index;
    document.getElementById('editInput').value = publicacao[index].text;
    document.getElementById('editModal').style.display = 'flex';
}

function SalvarEdit() {
    publicacao[EditIndexMoleza].text = document.getElementById('editInput').value;
    FecharModal();
    publicacaoMolezinha();
    saveToLocalStorage();
}

function FecharModal() {
    document.getElementById('editModal').style.display = 'none';
}

function deletarComentario(index) {
    publicacao.splice(index, 1);
    publicacaoMolezinha();
    saveToLocalStorage();
}

// Função para salvar as publicações no localStorage
function saveToLocalStorage() {
    localStorage.setItem('publicacao', JSON.stringify(publicacao));
}
