function formatarCep(input){
    let cep = input.value.replace(/\D/g, '');
    if (cep.length > 5){
        cep = cep.replace(/^(\d{2})(\d{3})(\d{0,3})/, "$1.$2-$3");
    } else if (cep.length > 2){
        cep = cep.replace(/^(\d{2})(\d{0,3})/, "$1.$2");
    }
    input.value = cep;
}

function buscaCep(){
    const cep = document.getElementById("cep").value.replace(/\D/g, '');
    const resultadoDiv = document.getElementById("resultado");

    if (cep.length !== 8 || isNaN(cep)){
        resultadoDiv.innerHTML = "<p>Informe um CEP válido com 8 dígitos!</p>";
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            if (!response.ok) throw new Error("Falha ao consultar CEP!");
            return response.json();
        })
        .then(data => {
            if (data.erro){
                resultadoDiv.innerHTML = "<p>CEP não localizado!</p>";
            } else {
                resultadoDiv.innerHTML = `
                <p><b>Endereço:</b> ${data.logradouro}</p>
                <p><b>Bairro:</b> ${data.bairro}</p>
                <p><b>Cidade:</b> ${data.localidade}</p>
                <p><b>Estado:</b> ${data.uf}</p>
                <p><b>Região:</b> ${data.regiao}</p>
                <p><b>DDD:</b> ${data.ddd}</p>
                <p><b>IBGE:</b> ${data.ibge}</p>
                `;
            }
        })
        .catch(error => {
            resultadoDiv.innerHTML = "<p>Erro ao tentar localizar o CEP!</p>";
            console.erro(error);
        });
}       