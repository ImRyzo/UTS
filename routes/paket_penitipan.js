var express = require('express');
var router = express.Router();
var connection = require('../config/database.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/paket_penitipan'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });

router.get('/', (req, res, next) => {
    connection.query('SELECT * FROM paket_penitipan ORDER BY id_paket_penitipan DESC', (err, rows) => {
        if (err) {
            req.flash('err', err);
            res.redirect('/paket_penitipan');
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

router.post('/store', upload.single('gambar_paket_penitipan'), (req, res, next) => {
    let { nama_paket_penitipan, keterangan_paket_penitipan, harga_paket_penitipan } = req.body;
    let gambar_paket_penitipan = req.file.filename;
    let data = { nama_paket_penitipan, keterangan_paket_penitipan, harga_paket_penitipan, gambar_paket_penitipan };
    
    connection.query('INSERT INTO paket_penitipan SET ?', data, (err, rows) => {
        if (err) {
            console.log(err);
            req.flash('err', 'Gagal menambahkan data');
            res.redirect('/paket_penitipan');
        } else {
            req.flash('succ', 'Berhasil menambahkan data');
            res.redirect('/paket_penitipan');
        }
    });
});

router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    connection.query('SELECT * FROM paket_penitipan WHERE id_paket_penitipan = ?', [id], (err, rows) => {
        if (err) {
            req.flash('err', err);
            res.redirect('/paket_penitipan');
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

router.post('/update/:id', upload.single('gambar_paket_penitipan'), (req, res, next) => {
    let id = req.params.id;
    let { nama_paket_penitipan, keterangan_paket_penitipan, harga_paket_penitipan } = req.body;
    let gambar_paket_penitipan = req.file ? req.file.filename : req.body.gambar_lama;
    let data = { nama_paket_penitipan, keterangan_paket_penitipan, harga_paket_penitipan, gambar_paket_penitipan };
    
    connection.query('UPDATE paket_penitipan SET ? WHERE id_paket_penitipan = ?', [data, id], (err, rows) => {
        if (err) {
            req.flash('err', err);
            res.redirect('/paket_penitipan');
        } else {
            req.flash('succ', 'Berhasil mengubah data');
            res.redirect('/paket_penitipan');
        }
    });
});

router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    connection.query('DELETE FROM paket_penitipan WHERE id_paket_penitipan = ?', [id], (err, rows) => {
        if (err) {
            console.log(err);
            req.flash('err', 'Query gagal');
            res.redirect('/paket_penitipan');
        } else {
            req.flash('succ', 'Berhasil menghapus data');
            res.redirect('/paket_penitipan');
        }
    });
});

module.exports = router;
