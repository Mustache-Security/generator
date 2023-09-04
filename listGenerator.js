const fs = require("fs")
const readline = require("readline-sync")
const people = require("gerador-pessoas")

const options = ["CPF", "NOME_COMPLETO"]

const optionsOutput = {
  0: "cpf's",
  1: "nomes completos",
}

const choice = readline.keyInSelect(
  options,
  "Escolha uma opção para gerar sua lista: "
)
const choiceString = choice.toString()

if (choice === -1) {
  console.log("Operação cancelada")
  return
}

const fileName = readline.question("Nome do arquivo de saída: ")
const amount = readline.question(
  `Quantos ${optionsOutput[choiceString]} ficticios deseja gerar: `
)

const digit = (numberOne, numberTwo, numberThree, numberFour) => {
  const numbers = numberOne
    .split("")
    .concat(numberTwo.split(""), numberThree.split(""))

  if (numberFour !== undefined) numbers[9] = numberFour

  let x = 0

  for (let i = numberFour !== undefined ? 11 : 10, j = 0; i >= 2; i--, j++) {
    x += parseInt(numbers[j]) * i
  }

  const y = x % 11

  return y < 2 ? 0 : 11 - y
}

const ramdom = () => {
  const rom = Math.floor(Math.random() * 999)

  return ("" + rom).padStart(3, "0")
}

const genCpf = () => {
  const number1 = ramdom()
  const number2 = ramdom()
  const number3 = ramdom()

  const dig1 = digit(number1, number2, number3)
  const dig2 = digit(number1, number2, number3, dig1)

  const cpf = `${number1}.${number2}.${number3}-${dig1}${dig2}`

  return cpf
}

for (let i = 0; i < Number(amount); i++) {
  if (choice === 0) {
    const cpf = genCpf() + "\n"
    fs.appendFileSync(`${fileName}.txt`, cpf, "utf-8")
    console.log(cpf)
  }
  if (choice === 1) {
    people.setCampoNome("nome")
    people.setCampoCpf()
    people.gerarJson(1)
    const name = people._registros[0].nome + "\n"
    fs.appendFileSync(`${fileName}.txt`, name, "utf-8")
    console.log(name)
  }
}
