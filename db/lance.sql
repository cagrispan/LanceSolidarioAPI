-- phpMyAdmin SQL Dump
-- version 4.5.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 16-Set-2016 às 18:09
-- Versão do servidor: 5.7.11
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lance`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `addresses`
--

CREATE TABLE `addresses` (
  `addressId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `neighborhood` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `cep` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `addresses`
--

INSERT INTO `addresses` (`addressId`, `userId`, `street`, `number`, `complement`, `neighborhood`, `city`, `state`, `cep`, `createdAt`, `updatedAt`) VALUES
(9, 123456, 'Rua Izaac Ferreira da Cruz', '332', 'Ap 401', 'Pinheirinho', 'Curitiba', 'Paraná', 81870000, '2016-09-16 14:20:05', '2016-09-16 14:20:05');

-- --------------------------------------------------------

--
-- Estrutura da tabela `emails`
--

CREATE TABLE `emails` (
  `emailId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `emails`
--

INSERT INTO `emails` (`emailId`, `userId`, `email`, `createdAt`, `updatedAt`) VALUES
(1, 123456, 'cagrispan@gmail.com', '2016-09-16 15:46:52', '2016-09-16 15:46:52');

-- --------------------------------------------------------

--
-- Estrutura da tabela `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `userId` varchar(255) CHARACTER SET utf8 NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 NOT NULL,
  `description` varchar(1023) CHARACTER SET utf8 NOT NULL,
  `isUsed` tinyint(1) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `products`
--

INSERT INTO `products` (`productId`, `userId`, `title`, `description`, `isUsed`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(1, '123456', 'Título', 'Descrição', 0, 0, '2016-09-16 17:29:42', '2016-09-16 17:29:42'),
(2, '123456', 'Título', 'Descrição', 1, 0, '2016-09-16 17:30:00', '2016-09-16 17:30:00'),
(3, '123456', 'Título', 'Descrição Modificada', 1, 1, '2016-09-16 17:30:07', '2016-09-16 17:30:37');

-- --------------------------------------------------------

--
-- Estrutura da tabela `telephones`
--

CREATE TABLE `telephones` (
  `telephoneId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `telephone` varchar(255) CHARACTER SET utf8 NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `telephones`
--

INSERT INTO `telephones` (`telephoneId`, `userId`, `telephone`, `createdAt`, `updatedAt`) VALUES
(1, 123456, '41998946575', '2016-09-16 15:52:02', '2016-09-16 15:53:56'),
(2, 123456, '4132277738', '2016-09-16 15:52:19', '2016-09-16 15:52:19');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `facebookId` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `facebookToken` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`userId`, `facebookId`, `token`, `facebookToken`, `name`, `birthday`, `createdAt`, `updatedAt`) VALUES
(22, 'asd', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFzZCIsImlhdCI6MTQ3MjI0NDc2Nn0.80MLz52WG1SX2dKB3fIJuGc_ej3dF2ivEaifvY7gizQ', 'EAACEWdrtNoBAMVC5sQFjPeE9XTPlzSKooPl5NJtKUGWITmZCaTjcUjJRmFLURDtB36E2oWqJTpYQxJ2fu9ALNT215YOpWx5wZBD3nY7quwWtpYM4eLFc0L5Jka3QXcj0VPwzFB6xKqiFmPQ7zQwjdMWbqGwnKmAQDpvBIqwZDZD', 'Alisson222', '2016-08-11 03:00:00', '2016-08-26 20:42:12', '2016-08-26 20:52:46'),
(23, 'asddsdfs', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFzZGRzZGZzIiwiaWF0IjoxNDcyMjQ1NDU0fQ.V_1IR-a3mE6KFtRVAfBszCxttZU7izsOWwQOYe1X0es', 'EAACEWdrtNoBAMVC5sQFjPeE9XTPlzSKooPl5NJtKUGWITmZCaTjcUjJRmFLURDtB36E2oWqJTpYQxJ2fu9ALNT215YOpWx5wZBD3nY7quwWtpYM4eLFc0L5Jka3QXcj0VPwzFB6xKqiFmPQ7zQwjdMWbqGwnKmAQDpvBIqwZDZD', 'Alisson222', '2016-08-11 03:00:00', '2016-08-26 20:53:12', '2016-08-26 21:04:14'),
(24, 'aehooo', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFlaG9vbyIsImlhdCI6MTQ3MjI0NTcyN30.YPg0pVerWMZIjek_oLZ_TjiFfroo1opAUY5iFId8tZg', 'aehooo', '12312312', '2016-08-10 03:00:00', '2016-08-26 20:57:31', '2016-08-26 21:08:47'),
(25, '973779339415023', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3Mzc3OTMzOTQxNTAyMyIsImlhdCI6MTQ3MzgwNjA1MH0.CmTkMjtVCgzmoixPOg41dNVkMpfElZ-a4fQrKGIoetU', 'EAACEWrdrtNoBAIdbMyzIAIknYbaWZCiI14NqCN249CFfbkZBFJO4w4v0nukZAoudblvpwNtKHNaUovtw7fMYoHurMmZCRU3kt7frZC7yh8wwGie0hdvnMQPM47MtPCvB5s7cweAKi0yy13WYiIZCLmr4WTNVz6HQFqiDq21ywQ9gZDZD', 'Alisson Krul', '1996-07-08 03:00:00', '2016-09-06 19:04:48', '2016-09-13 22:34:11'),
(27, '123456', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1NiIsImlhdCI6MTQ3NDAzMjU1Nn0.maHtyimKG1Jk8Mh26S8kkf6SscwMJBxR3vuEIAZHnyw', '123456qwerty', 'Carlos Augusto Grispan', '1987-10-10 03:00:00', '2016-09-16 13:11:01', '2016-09-16 13:29:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`addressId`);

--
-- Indexes for table `emails`
--
ALTER TABLE `emails`
  ADD PRIMARY KEY (`emailId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`);

--
-- Indexes for table `telephones`
--
ALTER TABLE `telephones`
  ADD PRIMARY KEY (`telephoneId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `facebookId` (`facebookId`),
  ADD UNIQUE KEY `users_facebookId_unique` (`facebookId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `addressId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `emails`
--
ALTER TABLE `emails`
  MODIFY `emailId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `telephones`
--
ALTER TABLE `telephones`
  MODIFY `telephoneId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
