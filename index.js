let participantes = [
  {
    nome: "Paula Souza",
    email: "Paula@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: "Diego Fernandes",
    email: "Diego@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Mariana Silva",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 2, 10, 12, 45),
    dataCheckIn: new Date(2024, 2, 10, 18, 30)
  },
  {
    nome: "Pedro Almeida",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 14, 10),
    dataCheckIn: new Date(2024, 2, 6, 9, 45)
  },
  {
    nome: "Carla Oliveira",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 2, 7, 16, 55),
    dataCheckIn: new Date(2024, 2, 8, 10, 15)
  },
  {
    nome: "Rafael Martins",
    email: "rafael@gmail.com",
    dataInscricao: new Date(2024, 2, 14, 20, 30),
    dataCheckIn: null
  },
  {
    nome: "Ana Costa",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 17, 18, 10),
    dataCheckIn: new Date(2024, 2, 18, 8, 20)
  },
  {
    nome: "Lucas Oliveira",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 3, 21, 50),
    dataCheckIn: new Date(2024, 2, 4, 12, 15)
  },
  {
    nome: "Camila Pereira",
    email: "camila@gmail.com",
    dataInscricao: new Date(2024, 2, 18, 10, 35),
    dataCheckIn: null
  },
  {
    nome: "Gustavo Souza",
    email: "gustavo@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 14, 20),
    dataCheckIn: new Date(2024, 2, 26, 11, 10)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)
  
  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

 // estrutura condicional
  if(participante.dataCheckIn == null) { 
    dataCheckIn = `
     <button 
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
     >
      Confirmar check-in
     </button>` 
  }
 
  
  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de rep - loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  
  // subtituir inf do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formDate = new FormData(event.target)

  const participante = {
    nome: formDate.get('nome'),
    email: formDate.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }
  
  // verificar se o participante ja existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email ja cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""


}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  
  if (confirm(mensagemConfirmacao) == false) {
    return
  }


  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  //atualizar a lista de participante
  atualizarLista(participantes)
}