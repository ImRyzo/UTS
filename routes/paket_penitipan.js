var express = require('express');
var router = express.Router();

var connection = require('../config/database.js');

router.get('/', (req, res, next) => {
    connection.query('SELECT * FROM paket_penitipan ORDER BY id_paket_penitipan DESC', (err, rows) => {
        if (err) {
            req.flash('err', err);
        } else {
            res.render('paket_penitipan/index', {
                data: rows
            });
        }
    });
});

router.get('/create', (req, res, next) => {
    res.render('paket_penitipan/create');
});

router.post('/store', (req, res, next) => {
    let { nama_paket_penitipan, keterangan_paket_penitipan, harga_paket_penitipan, gambar_paket_penitipan } = req.body;
    let data = { nama_paket_penitipan, keterangan_paket_penitipan, harga_paket_penitipan, gambar_paket_penitipan };
    try {
        connection.query('INSERT INTO paket_penitipan SET ?', data, (err, rows) => {
            if (err) {
                console.log(err);
                res.redirect('/paket_penitipan');
                return false;
            }
            req.flash('succ', 'Berhasil menambahkan data');
            res.redirect('/paket_penitipan');
        });
    } catch (err) {
        req.flash('err', err);
        res.redirect('/paket_penitipan');
    }
});

router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    connection.query('SELECT * FROM paket_penitipan WHERE id_paket_penitipan = ?', [id], (err, rows) => {
        if (err) {
            req.flash('err', err);
        } else {
            rows = rows[0];
            res.render('paket_penitipan/edit', {
                nama: rows.nama_paket_penitipan,
                keterangan: rows.keterangan_paket_penitipan,
                harga: rows.harga_paket_penitipan,
                gambar: rows.gambar_paket_penitipan,
                id: rows.id_paket_penitipan,
            });
        }
    });
});

router.post('/update/:id', (req, res, next) => {
    let id = req.params.id;
    let { nama_paket_penitipan, keterangan_paket_penitipan, harga_paket_penitipan, gambar_paket_penitipan } = req.body;
    let data = { nama_paket_penitipan, keterangan_paket_penitipan, harga_paket_penitipan, gambar_paket_penitipan };
    try {
        connection.query('UPDATE paket_penitipan SET ? WHERE id_paket_penitipan = ?', [data, id], (err, rows) => {
            if (err) {
                req.flash('err', err);
                res.redirect('/paket_penitipan');
                return false;
            }
            req.flash('succ', 'Berhasil mengubah data');
            res.redirect('/paket_penitipan');
        });
    } catch (err) {
        req.flash('err', err);
        res.redirect('/paket_penitipan');
    }
});

router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    connection.query('DELETE FROM paket_penitipan WHERE id_paket_penitipan = ?', [id], (err, rows) => {
        if (err) {
            console.log(err);
            req.flash('err', 'Query gagal');
            res.redirect('/paket_penitipan');
            return false;
        }
        req.flash('succ', 'Berhasil menghapus data');
        res.redirect('/paket_penitipan');
    });
});

module.exports = router;
