const data = require('../models/data.json')
const fs = require('fs')
const path = require('path')
const jsonPath = path.join(__dirname, '../models/data.json')
exports.login = function (req, res) {
  res.render('pages/login')
}
exports.dashboard = function (req, res) {
  res.redirect('/dashboard')
}
exports.index = function (req, res) {
  res.render('pages/dashboard', {
    path: req.originalUrl,
    data: data
  })
}

exports.lists = function (req, res) {
  res.render('pages/dashboard', {
    path: req.originalUrl,
    data: data
  })
}

// CRUD
exports.create = function (req, res) {
  res.render('pages/dashboard', {
    path: req.originalUrl,
  })
}
exports.save = function (req, res) {
  const date = new Date(Date.now()).getDate()
  const month = new Date(Date.now()).getMonth()
  const year = new Date(Date.now()).getFullYear()

  const id = Math.floor(1000 * Math.random() * 900)

  req.body.created_at = `${date}/0${month + 1}/${year}`
  req.body.updated_at = `${date}/0${month + 1}/${year}`

  // concat object
  const newData = Object.assign({ id }, req.body)
  console.log('New Data' + newData)
  data.push(newData)

  fs.writeFileSync(jsonPath, JSON.stringify(data))
  // res.redirect('/dashboard')
  res.render('pages/success', { redirect: '/dashboard' })

}
exports.edit = function (req, res) {
  const carId = Number(req.params.id)
  const toUpdateData = data.filter(item => item.id === carId)
  res.render('pages/dashboard', {
    id: carId,
    path: req.originalUrl,
    data: toUpdateData
  })
}
exports.update = function (req, res) {
  const date = new Date(Date.now()).getDate()
  const month = new Date(Date.now()).getMonth()
  const year = new Date(Date.now()).getFullYear()
  const newUpdateAt = req.body.updated_at = `${date}/0${month + 1}/${year}`
  // data.filter(item => item.id !== Number(req.body.id))
  const getData = data.filter(item => item.id === Number(req.body.id))[0]
  // console.log(getData);
  getData.id = Number(req.body.id)
  getData.nama = req.body.nama
  getData.harga = req.body.harga
  getData.ukuran = req.body.ukuran
  getData.foto = req.body.foto || getData.foto
  getData.startrent = req.body.startrent
  getData.finishrent = req.body.finishrent
  // getData.created_at = req.body.created_at
  getData.updated_at = newUpdateAt
  // data.push(getData)

  fs.writeFileSync(jsonPath, JSON.stringify(data))
  res.render('pages/success', { redirect: '/dashboard' })
}
exports.delete = function (req, res) {
  const carId = Number(req.params.id)
  // console.log(carId);
  const newData = data.filter(item => item.id !== carId)
  console.log(newData);
  fs.writeFileSync(jsonPath, JSON.stringify(newData))
  res.render('pages/success', { redirect: '/dashboard' })
}