-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2023 at 05:35 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `diarytest`
--

-- --------------------------------------------------------

--
-- Table structure for table `details`
--

CREATE TABLE `details` (
  `username` varchar(100) NOT NULL,
  `phone` int(11) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `pwrd` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `journal`
--

CREATE TABLE `journal` (
  `uname` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `journal`
--

INSERT INTO `journal` (`uname`, `title`, `content`, `time`) VALUES
('shrishtest', '351159728e96b210126e5014f06452c4', 'dc54e330ed87986587be0f774d066cf105110eeb632abe791e758bf75c873320', '11/11/2022, 8:08:58 pm'),
('shrishtest', 'f6de45ab98b4809e63b95928ae436183', 'f7d76a3e177dd6b90c70f9231246cfbb95a022a998f74a9c77a9d5a487f07147', '11/11/2022, 8:09:56 pm'),
('shrishtest', '51705da87de9bb71e061540f2f7fbbef', 'fa665512a505cbd1fc095ffa1b33de423dc55c98306a6063069e75fdd8f087f2b00cff631b6aee6b10e4d5cea2ec2d49', '11/11/2022, 10:59:55 pm'),
('testabc', '502a4291fcddcc5efa645a3406478d8c', 'baaa4f3e6f38a36530fa04c0299fc100ee59d96769454899d9ed3fd1df27c956', '24/11/2022, 11:27:38 am');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `S.no` int(11) NOT NULL,
  `Uname` varchar(100) NOT NULL,
  `phnumber` varchar(10) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `Pword` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`S.no`, `Uname`, `phnumber`, `mail`, `Pword`) VALUES
(1, 'shrish', '8940410946', 'abx@gmail.com', '$2b$10$cQ9IrZeNm3hhpW0IKDLOR.M4RxRNZ0cHKDiEXhDt4qxAkb1j8rHru'),
(2, 'pandi', '1234567890', 'pandi@gmail.com', '$2b$10$4IRRJCC3LrW7jY2r3EVCY.Or4iPwDoaRpEfgMbdxoEjd9wc5VWHZW'),
(3, 'pandisathosh', '1234567891', 'pandisan@gmail.com', '$2b$10$b07uJegqoTEuaGn4OPa9F./Bna5sbYZaVGVjojflWzgkL3c4ytgTi'),
(4, 'jaja', '8888888888', 'uju@gmail.com', '$2b$10$jHuvus5zR6z6Wo54MVhNGe5R80ZCyndFfc6GohS2PlNaTq1feXavO'),
(5, 'test', '1234567890', 'test1@gmail.com', '$2b$10$mwF2HevodRJhVU3CM6PBb.AYXCtfkHuwy7E7etKn2IUQpz0MbKhX2'),
(6, 'Shrish', '8940410946', 'mynameisshrish@gmail.com', '$2b$10$tUPf88EXQ6rBKWCV5OfHBuhlXH2wAhUv3YIIv93rhwyM9DK.PUaZa'),
(7, 'shreeyas', '1234512345', 'mynameisshreeyas@gmail.com', '$2b$10$04GoFIQ6qN8JDu8bkQ.J5u8lR/d85jAjaEoTtIV9DwOAsPjDN/ZMW'),
(8, 'siva', '1234512344', 'siva@gmail.com', '$2b$10$jL0GmPM7xV5F6pX7m5bJtOYzCZkWW5NhexUrzXeSakfVifIMKMz52'),
(9, 'usertest', '1234123412', 'test1@gmail.com', '$2b$10$iMMqnEwKoGO5pApbsJOxIuYphpAkfOvgu2Fow.w80rfboEPKqo2Em'),
(10, 'shrishtest', '1234123423', 'ahrishtest@gmail.com', '$2b$10$W3oBTtFhv6ZGu3YmeaEoDOTAl46hEQFvt0vrJrRKhu10EU73bhYcG'),
(11, 'shrishtestt', '1234567890', 'test1@gmail.com', '$2b$10$Ijj3vZzs.U8LlmFEkWYhLOWRJBl8ZifmiB2Wkca4k.jqsspMHI1DC'),
(12, 'sidarrth', '9498449731', 'gendaigo5@gmail.com', '$2b$10$Dg5gt9Mr9sIV9ZHYmwHxQ.D5czRL/sbiJ8bLwqJXysHWEh4zbOD0y'),
(13, 'testabc', '1234567890', 'test1@gmail.com', '$2b$10$Xmt.aYc/Hov81spURB5QZuUPuBBsAti4n1LP73X9QgDj43Nn58vle');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`S.no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `S.no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
