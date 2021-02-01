const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')

app.use(cors())

const reverserWord = text => text.split('').reverse().join('')

const palindrome = text => {
  const word = text.toLowerCase().replace(/ /g, "")
  return word === reverserWord(word)
}

app.get('/', (req, res) => {
  res.send('Server prueba toolbox!')
})

app.get('/iecho', (req, res) => {
  const { text } = req.query;
  if (!text) return res.status(400).json({ "error": "no text" })
  const word = reverserWord(text)
  res.status(200).json({
    text: word,
    palindrome: palindrome(word)
  })
})

const server = app.listen(port, () => {
  console.log(`back toolbox listening at http://localhost:${port}`)
})

module.exports = server
