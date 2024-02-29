const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

const singularize = (word) => {
  if (word.slice(-3) === 'ies') {
    return word.slice(0, -3) + 'y'
  } else {
    return word.slice(0, -1)
  }
}

export { capitalize, singularize }
