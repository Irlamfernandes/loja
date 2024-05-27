function salvarDados(nome, tamanho, descricao, preco) {
    let catalogo = JSON.parse(localStorage.getItem('catalogo')) || [];
    catalogo.push({ nome, tamanho, descricao, preco });
    localStorage.setItem('catalogo', JSON.stringify(catalogo));
}

function carregarDados() {
    const catalogo = JSON.parse(localStorage.getItem('catalogo')) || [];
    catalogo.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <h3>${item.nome}</h3>
            <p><strong>Tamanho:</strong> ${item.tamanho}</p>
            <p><strong>Descrição:</strong> ${item.descricao}</p>
            <p><strong>Preço:</strong> R$${item.preco}</p>
            <button onclick="excluirItem('${item.nome}')">Excluir</button>
        `;
        document.getElementById('catalogo').appendChild(itemDiv);
    });
}

function excluirItem(nome) {
    let catalogo = JSON.parse(localStorage.getItem('catalogo')) || [];
    catalogo = catalogo.filter(item => item.nome !== nome);
    localStorage.setItem('catalogo', JSON.stringify(catalogo));
    document.getElementById('catalogo').innerHTML = '';
    if (catalogo.length === 0) {
        document.getElementById('catalogo').innerHTML = '<h2>Catalogo</h2>';
    } else {
        carregarDados();
    }
}


document.getElementById('adicionar').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const tamanho = document.getElementById('tamanho').value;
    const descricao = document.getElementById('descricao').value;
    const preco = document.getElementById('preco').value;
    
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');
    itemDiv.innerHTML = `
        <h3>${nome}</h3>
        <p><strong>Tamanho:</strong> ${tamanho}</p>
        <p><strong>Descrição:</strong> ${descricao}</p>
        <p><strong>Preço:</strong> R$${preco}</p>
        <button onclick="excluirItem('${nome}')">Excluir</button>
    `;
    
    document.getElementById('catalogo').appendChild(itemDiv);
    
    salvarDados(nome, tamanho, descricao, preco);
    
    document.getElementById('adicionar').reset();
});

window.onload = carregarDados;
