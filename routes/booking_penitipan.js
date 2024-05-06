const express = require('express');
const router = express.Router();
const connection = require('../config/database');

router.get('/', (req, res, next) => {
    const query = `
        SELECT * FROM booking_penitipan
        JOIN paket_penitipan ON booking_penitipan.id_paket_penitipan = paket_penitipan.id_paket_penitipan
        ORDER BY id_booking_penitipan DESC`;

    connection.query(query, (err, rows) => {
        if (err) {
            req.flash('err', err);
            res.redirect('/booking_penitipan');
        } else {
            res.render('booking_penitipan/index', {
                data: rows
            });
        }
    });
});

router.get('/create', (req, res, next) => {
    connection.query('SELECT * FROM paket_penitipan ORDER BY id_paket_penitipan DESC', (err, rows) => {
        if (err) {
            req.flash('err', err);
            res.redirect('/booking_penitipan');
        } else {
            res.render('booking_penitipan/create', {
                paket: rows
            });
        }
    });
});

router.post('/store', (req, res, next) => {
    const { id_users_pet, nama_hewan_penitipan, jumlah_hari_penitipan, id_paket_penitipan, keterangan_tambahan_penitipan, total_harga_penitipan } = req.body;
    const time_create_booking_penitipan = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const data = { id_users_pet, nama_hewan_penitipan, jumlah_hari_penitipan, id_paket_penitipan, keterangan_tambahan_penitipan, time_create_booking_penitipan, total_harga_penitipan };

    connection.query('INSERT INTO booking_penitipan SET ?', data, (err, rows) => {
        if (err) {
            req.flash('err', err);
            res.redirect('/booking_penitipan');
        } else {
            req.flash('succ', 'Berhasil menambahkan booking penitipan');
            res.redirect('/booking_penitipan');
        }
    });
});

router.get('/edit/:id', (req, res, next) => {
    const id = req.params.id;
    connection.query('SELECT * FROM booking_penitipan WHERE id_booking_penitipan = ?', [id], (err, booking) => {
        if (err) {
            req.flash('err', err);
            res.redirect('/booking_penitipan');
        } else {
            connection.query('SELECT * FROM paket_penitipan ORDER BY id_paket_penitipan DESC', (err, paket) => {
                if (err) {
                    req.flash('err', err);
                    res.redirect('/booking_penitipan');
                } else {
                    res.render('booking_penitipan/edit', {
                        booking: booking[0],
                        paket: paket 
                    });
                }
            });
        }
    });
});


router.post('/update/:id', (req, res, next) => {
    const id = req.params.id;
    const { nama_hewan_penitipan, jumlah_hari_penitipan, id_paket_penitipan, keterangan_tambahan_penitipan, total_harga_penitipan } = req.body;
    const data = { nama_hewan_penitipan, jumlah_hari_penitipan, id_paket_penitipan, keterangan_tambahan_penitipan, total_harga_penitipan };

    connection.query('UPDATE booking_penitipan SET ? WHERE id_booking_penitipan = ?', [data, id], (err, rows) => {
        if (err) {
            req.flash('err', err);
            res.redirect('/booking_penitipan');
        } else {
            req.flash('succ', 'Berhasil memperbarui booking penitipan');
            res.redirect('/booking_penitipan');
        }
    });
});

router.get('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    connection.query('DELETE FROM booking_penitipan WHERE id_booking_penitipan = ?', [id], (err, rows) => {
        if (err) {
            req.flash('err', err);
            res.redirect('/booking_penitipan');
        } else {
            req.flash('succ', 'Berhasil menghapus booking penitipan');
            res.redirect('/booking_penitipan');
        }
    });
});

module.exports = router;
