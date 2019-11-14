//Captura o CardBoard//
const cardBoard = document.getElementById("cardboard");
const images =[
  'Askiv Roxa.jpg',
  'Askiv vermelha.jpg',
  'Askov amarela.jpg',
  'askov preta.jpg',
  'Askov pura.jpg',
  'Askov verde.jpg'
];
//Cria o HTML com as imagens//
let cardHMTL = '';
//Concatena o HTML com as imagens//
// Além disso a classe memorycard cria varias divs com as classes frente e verso
images.forEach(img => {
  cardHMTL += `
  <div class="memory-card" data-card="${img}">
  <img class="front-face" src="img/${img}">
  <img class="back-face" src="img/logo.png">
  </div>

  `
});
//Executa a troca de conteudo e os carrega dentro da tag//
// E a condição de soma faz com que as imagens se dupliquem formando pares//
cardBoard.innerHTML = cardHMTL + cardHMTL;
/** FIM RENDERIZAÇÃO HMTL */

/** Faz a seleção de todos os cards estão dentro da classe "memory-card" formando então um array
que guarda todos os valor da classe em nós*/
const cards = document.querySelectorAll(".memory-card");
let firstCard, secondCard; /** Representam a 1° e 2° cartas a serem reveladas no jogo*/
let lockCard = false;
/** Função que faz o evento de "click" a todos os cards em nó dentro do array para que eles se virem então*/
function flipCard(){
  if(lockCard) return false; /** Condição que fez com que não seja possivel abri 3 cards de uma só vez*/
  this.classList.add("flip");

  if(!firstCard){
	firstCard =this; /** Faz a declaração de que primeira carta foi escolhida*/

	return false;
  }

  secondCard =this; /** Faz a declaração de que segunda carta foi escolhida*/

  checkForMatch();
}

function checkForMatch(){
 let isMatch = firstCard.dataset.card == secondCard.dataset.card; /** Faz a comparaçã se a 1° e 2° carta são iguas*/

 !isMatch ? disbleCards(): resetCards(isMatch);

}

function disbleCards(){   /** Faz com que as cartas se virem novamente caso não sejam iguais desabilitando elas*/
	lockCard = true; /** Salva as cartas, e as trava caso sejam verdadeiras*/

	setTimeout(() => {
	firstCard.classList.remove("flip");
	secondCard.classList.remove("flip");

  resetCards();   /** Função na qual caso as cartas não sejam iguais faz com que após um tempo elas virem novamente*/
  lockCard = false;
   
  }, 1000);
  ;  
}
/** Função para que as cartas não fiquem sempre na mesma posição*/
(function shuffle(){
  cards.forEach(card =>{
    let rand =Math.floor(Math.random()*12);  /** Operação que gera valores randomicos entre 0 e 12 */
    card.style.order = rand;

  })
})()
/** Remove o evento de "click" caso as cartas não sejam iguas*/
function resetCards(isMatch = false){
  if(isMatch){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  }
    [firstCard, secondCard, lockCard] =[null, null, false]; /**Condição que limpa as variaveis e as reseta ao mesmo tempo
                                                            ao fim de cada jogada*/
                                                            
}

cards.forEach(card => card.addEventListener("click",flipCard));

