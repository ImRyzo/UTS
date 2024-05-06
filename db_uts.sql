-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 06, 2024 at 08:40 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_uts`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking_penitipan`
--

CREATE TABLE `booking_penitipan` (
  `id_booking_penitipan` int NOT NULL,
  `id_users_pet` int DEFAULT NULL,
  `nama_hewan_penitipan` varchar(255) DEFAULT NULL,
  `jumlah_hari_penitipan` varchar(255) DEFAULT NULL,
  `id_paket_penitipan` int DEFAULT NULL,
  `keterangan_tambahan_penitipan` varchar(255) DEFAULT NULL,
  `time_create_booking_penitipan` datetime DEFAULT NULL,
  `total_harga_penitipan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `booking_penitipan`
--

INSERT INTO `booking_penitipan` (`id_booking_penitipan`, `id_users_pet`, `nama_hewan_penitipan`, `jumlah_hari_penitipan`, `id_paket_penitipan`, `keterangan_tambahan_penitipan`, `time_create_booking_penitipan`, `total_harga_penitipan`) VALUES
(16, 1, '1', '1', 5, '1', '2024-05-06 06:48:10', '1'),
(19, 1, '1', '1', 5, '1', '2024-05-06 08:34:22', '1'),
(20, 2201, 'kambing5', '1', 6, 'no', '2024-05-06 08:38:06', '5000');

-- --------------------------------------------------------

--
-- Table structure for table `paket_penitipan`
--

CREATE TABLE `paket_penitipan` (
  `id_paket_penitipan` int NOT NULL,
  `nama_paket_penitipan` varchar(255) DEFAULT NULL,
  `keterangan_paket_penitipan` varchar(255) DEFAULT NULL,
  `harga_paket_penitipan` varchar(255) DEFAULT NULL,
  `gambar_paket_penitipan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `paket_penitipan`
--

INSERT INTO `paket_penitipan` (`id_paket_penitipan`, `nama_paket_penitipan`, `keterangan_paket_penitipan`, `harga_paket_penitipan`, `gambar_paket_penitipan`) VALUES
(6, 'laptop2', 'nitip', '1000', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking_penitipan`
--
ALTER TABLE `booking_penitipan`
  ADD PRIMARY KEY (`id_booking_penitipan`);

--
-- Indexes for table `paket_penitipan`
--
ALTER TABLE `paket_penitipan`
  ADD PRIMARY KEY (`id_paket_penitipan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking_penitipan`
--
ALTER TABLE `booking_penitipan`
  MODIFY `id_booking_penitipan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `paket_penitipan`
--
ALTER TABLE `paket_penitipan`
  MODIFY `id_paket_penitipan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
