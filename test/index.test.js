
const app = require('../index')
const request = require('supertest').agent(app)
const chai = require('chai')
const expect = chai.expect


describe('App toolbox', () => {
  after((done) => {
    app.close();
    done()
  });


  it('check bad request in app', () => {
    const word = 'LOBO'
    request
      .get(`/iecho?badRequest=${word}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.eql(400)
        expect(res.body).to.eql({
          error: 'no text'
        })
      })
  })

  it('check string is palindrome by app', () => {
    const word = 'ANITA LAVA LA TINA'
    request
      .get(`/iecho?text=${word}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.eql(200)
        expect(res.body).to.eql({
          text: 'ANIT AL AVAL ATINA',
          palindrome: true
        })
      })
  })

  it('check string is not palindrome by app', () => {
    const word = 'LOBO'
    request
      .get(`/iecho?text=${word}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.eql(200)
        expect(res.body).to.eql({
          text: 'OBOL',
          palindrome: false
        })
      })
  })
})