import { format, parse } from "date-fns"

export function validateEmail(email) {
  let isValid = false

  if (!email.includes('@') || !email.includes('.')) {
    return isValid
  }

  if (email.split('@').length !== 2) {
    return isValid
  }

  return isValid = true
}

export function validadePassword(password, passwordToConfirm) {

  if (password !== passwordToConfirm) {
    return 'As senhas não coincidem!'
  }

  if (password.length < 8) {
    return 'A senha deve ter pelo menos 8 caracteres!'
  }

  return 'senhas validas'
}

export function formatDate(dateStr) {
  const date = parse(dateStr, 'dd/MM/yyyy', new Date());
  const dateFormated = format(date, 'dd/MM/yy');
  return dateFormated
}

export function getWeekDay(dateStr) {
  const date = parse(dateStr, 'dd/MM/yyyy', new Date());
  const NumberOfDay = date.getDay()

  if (NumberOfDay === 1) { return 'Segunda' }
  if (NumberOfDay === 2) { return 'Terça' }
  if (NumberOfDay === 3) { return 'Quarta' }
  if (NumberOfDay === 4) { return 'Quinta' }
  if (NumberOfDay === 5) { return 'Sexta' }
  if (NumberOfDay === 6) { return 'Sábado' }
  if (NumberOfDay === 0) { return 'Domindo' }
}

export const formatValue = (value) => {
  const valueFormated = (value / 100).toFixed(2)
  return valueFormated.replace('.', ',')
}