function formatarCep(input){
    let cep = input.value.replace(/\D/g, '');
    if (cep.length > 5){
        cep = cep.replace(/^(\d{2})(\d{3})(\d{0,3})/, "$1.$2-$3");
    } else if (cep.length > 2){
        cep = cep.replace(/^(\d{2})(\d{0,3})/, "$1.$2");
    }
    input.value = cep;
}