const form = document.querySelector("#novoItem");
const lista = document.querySelector("#lista");

// Operador lógico que retorna com dados salvos, ou string vazia, utilizando localStorage.getItem, modificando o valor de `string` com JSON.parse()
//JSON.parse() analisa uma string JSON, construindo o valor ou um objeto JavaScript descrito pela string
const itens =  JSON.parse(localStorage.getItem("itens")) || []; 

// Uso do forEach para que todos os itens já escritos na lista sejam mantidos ao atualizar a página
itens.forEach((elemento) => {
  criaElemento(elemento)
})

// Refatoração do addEventListener para receber as funções extras da função criaElemento
form.addEventListener("submit", (evento) => {
  evento.preventDefault(); //tira o comportamento padrao do evento, neste caso é enviar os dados do form para a url

  const nome = evento.target.elements['nome']
  const quantidade = evento.target.elements['quantidade']

  const existe = itens.find(elemento => elemento.nome === nome.value)

  const itemAtual = { //cria um objeto - grupo de elementos
    "nome": nome.value,
    "quantidade": quantidade.value
  }
  if(existe){
    itemAtual.id = existe.id

    atualizaElemento(itemAtual)

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

  } else {
    itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 :0;
    criaElemento(itemAtual)
    itens.push(itemAtual) // adiciona o objeto no array com .push()
  }

  localStorage.setItem("itens", JSON.stringify(itens)) //localStorage aceita apenas string, por isso é necessário utiliziar JSON.stringify(exemplo) para converter

  nome.value = ""
  quantidade.value = ""

});

// Refatoração da função `criaElemento` para que possua apenas a função que faça sentido ao nome. 
function criaElemento(item){

  const novoItem = document.createElement('li')
  novoItem.classList.add("item")

  const numeroItem = document.createElement('strong')
  numeroItem.innerHTML = item.quantidade
  numeroItem.dataset.id = item.id //adiciona um data-id no elemento
  novoItem.appendChild(numeroItem) // adidiciona um elemento dentro do outro
  
  novoItem.innerHTML += item.nome

  novoItem.appendChild(botaoDeleta(item.id))

  lista.appendChild(novoItem)

}

function atualizaElemento(item){
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button")

  elementoBotao.innerText = "X"

  elementoBotao.addEventListener("click", function () {
    deletaElemento(this.parentNode, id)
  })

  return elementoBotao
}

function deletaElemento (tag, id){
  tag.remove()

  itens.splice(itens.findIndex(elemento => elemento.id === id), 1) //splice(chave,quantidade) deleta itens de um array. Neste caso, no array 'itens', buscar um elemento que tenha o id igual ao que foi recebido

  localStorage.setItem("itens", JSON.stringify(itens))
}