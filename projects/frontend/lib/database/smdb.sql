-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06-Dez-2022 às 00:54
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `smdb`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `smcads`
--

CREATE TABLE `smcads` (
  `idCad` int(4) NOT NULL,
  `namecCad` varchar(255) NOT NULL,
  `emailCad` varchar(255) NOT NULL,
  `seCad` varchar(255) NOT NULL,
  `rmCad` varchar(255) NOT NULL,
  `teleCad` varchar(255) NOT NULL,
  `stateCad` tinyint(1) NOT NULL DEFAULT 1,
  `typeCad` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `smcads`
--

INSERT INTO `smcads` (`idCad`, `namecCad`, `emailCad`, `seCad`, `rmCad`, `teleCad`, `stateCad`, `typeCad`, `createdAt`, `updatedAt`) VALUES
(1, 'Administrador', 'spacemanagergr@gmail.com', '$2b$10$tH3FpJSfFtHCfX9Rg7ozYebGSXg5wDBavTx4JN4CELuuFBY0xlVma', '0', '(00)00000-0000', 1, 'admin', '2022-12-05 18:35:53', '2022-12-05 18:35:53'),
(2, 'Professor 01', 'gussales14@gmail.com', '$2b$10$sU5aNsyE7diHoiOsOkha7uZVV7.Dt1WhTeJqGw7af5DCOS4z4ElOa', '00001', '(00)00000-0000', 1, 'prof', '2022-12-05 21:12:53', '2022-12-05 21:12:53'),
(3, 'Coordenador 01', 'gustavosalles2005@outlook.com', '$2b$10$apGVkGHlXrEeKbN4XrV8s.4b0H5CUylCpECvhYFgya6Q3DLMnBFUm', '00002', '(00)00000-0000', 1, 'coord', '2022-12-05 21:13:17', '2022-12-05 21:13:17'),
(4, 'Professor 02', 'gustavo.souza418@etec.sp.gov.br', '$2b$10$6LS6rVF69kzMv1XZfKUVA.GZBh0D04vc9EqnN0e4cSViJdZlo5tRK', '00003', '(00)00000-0000', 0, 'prof', '2022-12-05 21:13:47', '2022-12-05 21:13:54');

-- --------------------------------------------------------

--
-- Estrutura da tabela `smcurs`
--

CREATE TABLE `smcurs` (
  `idCurs` int(4) NOT NULL,
  `curCurs` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `smcurs`
--

INSERT INTO `smcurs` (`idCurs`, `curCurs`, `createdAt`, `updatedAt`) VALUES
(1, '1 ano de Informática para Internet', '2022-12-05 19:55:11', '2022-12-05 19:55:11'),
(2, '2 ano de Informática para Internet', '2022-12-05 19:55:20', '2022-12-05 19:55:20'),
(3, '3 ano de Informática para Internet', '2022-12-05 19:55:27', '2022-12-05 19:55:27'),
(4, '1 ano de Contabilidade', '2022-12-05 19:55:38', '2022-12-05 19:55:38'),
(5, '2 ano de Contabilidade', '2022-12-05 19:55:43', '2022-12-05 19:55:43'),
(6, '3 ano de Contabilidade', '2022-12-05 19:55:48', '2022-12-05 19:55:48'),
(7, '1 ano de Administração', '2022-12-05 19:55:57', '2022-12-05 19:55:57'),
(8, '2 ano de Administração', '2022-12-05 19:56:06', '2022-12-05 19:56:06'),
(9, '3 ano de Administração', '2022-12-05 19:56:38', '2022-12-05 19:56:38');

-- --------------------------------------------------------

--
-- Estrutura da tabela `smespas`
--

CREATE TABLE `smespas` (
  `idEspa` int(4) NOT NULL,
  `espEspa` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `smespas`
--

INSERT INTO `smespas` (`idEspa`, `espEspa`, `createdAt`, `updatedAt`) VALUES
(1, 'Laboratório 1', '2022-12-05 20:01:39', '2022-12-05 20:01:39'),
(2, 'Laboratório 2', '2022-12-05 20:01:44', '2022-12-05 20:01:44'),
(3, 'Laboratório 3', '2022-12-05 20:01:49', '2022-12-05 20:01:49'),
(4, 'Laboratório 4', '2022-12-05 20:01:54', '2022-12-05 20:01:54'),
(5, 'Quadra', '2022-12-05 20:02:06', '2022-12-05 20:02:06'),
(6, 'Auditório', '2022-12-05 20:02:12', '2022-12-05 20:02:12'),
(7, 'Sala Maker', '2022-12-05 20:02:18', '2022-12-05 20:02:18'),
(8, 'Biblioteca', '2022-12-05 20:02:25', '2022-12-05 20:02:25');

-- --------------------------------------------------------

--
-- Estrutura da tabela `smhoras`
--

CREATE TABLE `smhoras` (
  `idHora` int(4) NOT NULL,
  `horsHora` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `smhoras`
--

INSERT INTO `smhoras` (`idHora`, `horsHora`, `createdAt`, `updatedAt`) VALUES
(1, '7:30', '2022-12-05 19:58:19', '2022-12-05 19:58:19'),
(2, '8:20', '2022-12-05 19:58:24', '2022-12-05 19:58:24'),
(3, '9:10', '2022-12-05 19:58:30', '2022-12-05 19:58:30'),
(4, '10:00', '2022-12-05 19:58:36', '2022-12-05 19:58:36'),
(5, '10:20', '2022-12-05 19:58:42', '2022-12-05 19:58:42'),
(6, '11:10', '2022-12-05 19:58:46', '2022-12-05 19:58:46'),
(7, '12:00', '2022-12-05 19:58:52', '2022-12-05 19:58:52'),
(8, '12:50', '2022-12-05 19:58:57', '2022-12-05 19:58:57'),
(9, '13:00', '2022-12-05 19:59:03', '2022-12-05 19:59:03'),
(10, '13:50', '2022-12-05 19:59:11', '2022-12-05 19:59:11'),
(11, '14:40', '2022-12-05 20:00:11', '2022-12-05 20:00:11'),
(12, '15:30', '2022-12-05 20:00:16', '2022-12-05 20:00:16'),
(13, '00:00', '2022-12-05 20:00:24', '2022-12-05 20:00:24');

-- --------------------------------------------------------

--
-- Estrutura da tabela `smmats`
--

CREATE TABLE `smmats` (
  `idMat` int(4) NOT NULL,
  `matsMat` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `smmats`
--

INSERT INTO `smmats` (`idMat`, `matsMat`, `createdAt`, `updatedAt`) VALUES
(1, 'Matemática', '2022-12-05 19:57:23', '2022-12-05 19:57:23'),
(2, 'L. Portuguesa', '2022-12-05 19:57:30', '2022-12-05 19:57:30'),
(3, 'L. Inglesa', '2022-12-05 19:57:36', '2022-12-05 19:57:36'),
(4, 'Química', '2022-12-05 19:57:45', '2022-12-05 19:57:45'),
(5, 'Física', '2022-12-05 19:57:51', '2022-12-05 19:57:51'),
(6, 'Desenvolvimento de Tcc', '2022-12-05 19:58:01', '2022-12-05 19:58:01'),
(7, 'Sistemas Web II', '2022-12-05 19:58:14', '2022-12-05 19:58:14');

-- --------------------------------------------------------

--
-- Estrutura da tabela `smrelacionamentoreservas`
--

CREATE TABLE `smrelacionamentoreservas` (
  `idRel` int(4) NOT NULL,
  `idHora` varchar(255) NOT NULL,
  `idRes` varchar(255) NOT NULL,
  `espRes` varchar(255) NOT NULL,
  `dayRes` varchar(255) NOT NULL,
  `idUser` int(4) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `smrelacionamentoreservas`
--

INSERT INTO `smrelacionamentoreservas` (`idRel`, `idHora`, `idRes`, `espRes`, `dayRes`, `idUser`, `createdAt`, `updatedAt`) VALUES
(1, '7:30', '1', 'Auditório', 'December 08, 2022', 2, '2022-12-05 21:16:57', '2022-12-05 21:16:57'),
(2, '8:20', '1', 'Auditório', 'December 08, 2022', 2, '2022-12-05 21:16:57', '2022-12-05 21:16:57'),
(3, '10:00', '1', 'Auditório', 'December 08, 2022', 2, '2022-12-05 21:16:57', '2022-12-05 21:16:57'),
(4, '9:10', '1', 'Auditório', 'December 08, 2022', 2, '2022-12-05 21:16:57', '2022-12-05 21:16:57'),
(5, '10:20', '1', 'Auditório', 'December 08, 2022', 2, '2022-12-05 21:16:57', '2022-12-05 21:16:57'),
(6, '11:10', '1', 'Auditório', 'December 08, 2022', 2, '2022-12-05 21:16:57', '2022-12-05 21:16:57'),
(7, '12:00', '1', 'Auditório', 'December 08, 2022', 2, '2022-12-05 21:16:57', '2022-12-05 21:16:57'),
(9, '8:20', '3', 'Auditório', 'December 09, 2022', 3, '2022-12-05 23:51:07', '2022-12-05 23:51:07'),
(10, '7:30', '3', 'Auditório', 'December 09, 2022', 3, '2022-12-05 23:51:07', '2022-12-05 23:51:07'),
(11, '9:10', '3', 'Auditório', 'December 09, 2022', 3, '2022-12-05 23:51:07', '2022-12-05 23:51:07'),
(12, '10:20', '3', 'Auditório', 'December 09, 2022', 3, '2022-12-05 23:51:07', '2022-12-05 23:51:07'),
(13, '10:00', '3', 'Auditório', 'December 09, 2022', 3, '2022-12-05 23:51:07', '2022-12-05 23:51:07'),
(14, '11:10', '3', 'Auditório', 'December 09, 2022', 3, '2022-12-05 23:51:07', '2022-12-05 23:51:07'),
(15, '12:00', '3', 'Auditório', 'December 09, 2022', 3, '2022-12-05 23:51:07', '2022-12-05 23:51:07');

-- --------------------------------------------------------

--
-- Estrutura da tabela `smrelacionamentousermats`
--

CREATE TABLE `smrelacionamentousermats` (
  `idRel` int(4) NOT NULL,
  `idMat` varchar(255) NOT NULL,
  `idUser` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `smrelacionamentousermats`
--

INSERT INTO `smrelacionamentousermats` (`idRel`, `idMat`, `idUser`, `createdAt`, `updatedAt`) VALUES
(1, '7', '2', '2022-12-05 21:12:53', '2022-12-05 21:12:53'),
(2, '6', '2', '2022-12-05 21:12:53', '2022-12-05 21:12:53'),
(3, '1', '4', '2022-12-05 21:13:47', '2022-12-05 21:13:47'),
(4, '5', '4', '2022-12-05 21:13:47', '2022-12-05 21:13:47');

-- --------------------------------------------------------

--
-- Estrutura da tabela `smres`
--

CREATE TABLE `smres` (
  `idRes` int(5) NOT NULL,
  `userRes` varchar(255) NOT NULL,
  `curRes` varchar(255) NOT NULL,
  `matRes` varchar(255) NOT NULL,
  `dayRes` varchar(255) NOT NULL,
  `horaResDe` varchar(255) NOT NULL,
  `horaResAte` varchar(255) NOT NULL,
  `espaRes` varchar(255) NOT NULL,
  `descriRes` varchar(255) NOT NULL,
  `estaRes` varchar(255) NOT NULL,
  `horSolicRes` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `smres`
--

INSERT INTO `smres` (`idRes`, `userRes`, `curRes`, `matRes`, `dayRes`, `horaResDe`, `horaResAte`, `espaRes`, `descriRes`, `estaRes`, `horSolicRes`, `createdAt`, `updatedAt`) VALUES
(1, 'Professor 01', '3 ano de Informática para Internet', 'Desenvolvimento de Tcc', 'December 08, 2022', '7:30', '12:50', 'Auditório', 'Apresentação do Trabalho de Conclusão de Curso', 'yellow', '18:16:57', '2022-12-05 21:16:57', '2022-12-05 21:16:57'),
(3, 'Coordenador 01', '3 ano de Administração', 'Desenvolvimento de Tcc', 'December 09, 2022', '7:30', '12:50', 'Auditório', 'Apresentação dos Trabalhos de Conclusão de Curso da turma de 3 administração', 'yellow', '20:51:7', '2022-12-05 23:51:07', '2022-12-05 23:51:07');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `smcads`
--
ALTER TABLE `smcads`
  ADD PRIMARY KEY (`idCad`);

--
-- Índices para tabela `smcurs`
--
ALTER TABLE `smcurs`
  ADD PRIMARY KEY (`idCurs`);

--
-- Índices para tabela `smespas`
--
ALTER TABLE `smespas`
  ADD PRIMARY KEY (`idEspa`);

--
-- Índices para tabela `smhoras`
--
ALTER TABLE `smhoras`
  ADD PRIMARY KEY (`idHora`);

--
-- Índices para tabela `smmats`
--
ALTER TABLE `smmats`
  ADD PRIMARY KEY (`idMat`);

--
-- Índices para tabela `smrelacionamentoreservas`
--
ALTER TABLE `smrelacionamentoreservas`
  ADD PRIMARY KEY (`idRel`);

--
-- Índices para tabela `smrelacionamentousermats`
--
ALTER TABLE `smrelacionamentousermats`
  ADD PRIMARY KEY (`idRel`);

--
-- Índices para tabela `smres`
--
ALTER TABLE `smres`
  ADD PRIMARY KEY (`idRes`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `smcads`
--
ALTER TABLE `smcads`
  MODIFY `idCad` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `smcurs`
--
ALTER TABLE `smcurs`
  MODIFY `idCurs` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `smespas`
--
ALTER TABLE `smespas`
  MODIFY `idEspa` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `smhoras`
--
ALTER TABLE `smhoras`
  MODIFY `idHora` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `smmats`
--
ALTER TABLE `smmats`
  MODIFY `idMat` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `smrelacionamentoreservas`
--
ALTER TABLE `smrelacionamentoreservas`
  MODIFY `idRel` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `smrelacionamentousermats`
--
ALTER TABLE `smrelacionamentousermats`
  MODIFY `idRel` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `smres`
--
ALTER TABLE `smres`
  MODIFY `idRes` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
