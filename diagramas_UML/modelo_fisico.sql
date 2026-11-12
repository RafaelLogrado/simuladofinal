-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: db_solartech
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `codCliente` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(100) NOT NULL,
  PRIMARY KEY (`codCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Marcos','U2FsdGVkX18t1e8AGN++qXgHbkcaRfypx1Q/wCRjzps='),(2,'Arthur','U2FsdGVkX1851fRMOG25FVjLCqsvBHtgqegVqWRqF9w='),(3,'Tunes','U2FsdGVkX195P/7Ul3ZNh3UEPuXOuUm5KoDsaQXweck=');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipamentos`
--

DROP TABLE IF EXISTS `equipamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipamentos` (
  `codEquipamento` int NOT NULL AUTO_INCREMENT,
  `idCliente` int NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `fabricante` varchar(100) NOT NULL,
  `numSerie` varchar(100) NOT NULL,
  PRIMARY KEY (`codEquipamento`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `equipamentos_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`codCliente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipamentos`
--

LOCK TABLES `equipamentos` WRITE;
/*!40000 ALTER TABLE `equipamentos` DISABLE KEYS */;
INSERT INTO `equipamentos` VALUES (1,1,'modelo A','Huawei','U2FsdGVkX18vyyLoynHQvMEF/JD12DBfOHO6x8gs5O0='),(2,2,'modelo B','delta','U2FsdGVkX1+JMsjvoHvKGAx3vAJGZyXpADJbk3yf67Q='),(3,3,'modelo E','techcorp','U2FsdGVkX19zk23AIgCpjrd8pWq5z8uM0gT7xOyYpr4=');
/*!40000 ALTER TABLE `equipamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inspecoes`
--

DROP TABLE IF EXISTS `inspecoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inspecoes` (
  `codInspecao` int NOT NULL AUTO_INCREMENT,
  `idEquipamento` int NOT NULL,
  `status` enum('PENDENTE','REALIZADA') NOT NULL,
  `data` date NOT NULL,
  PRIMARY KEY (`codInspecao`),
  KEY `idEquipamento` (`idEquipamento`),
  CONSTRAINT `inspecoes_ibfk_1` FOREIGN KEY (`idEquipamento`) REFERENCES `equipamentos` (`codEquipamento`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inspecoes`
--

LOCK TABLES `inspecoes` WRITE;
/*!40000 ALTER TABLE `inspecoes` DISABLE KEYS */;
INSERT INTO `inspecoes` VALUES (1,1,'PENDENTE','2026-11-12'),(2,1,'PENDENTE','2026-11-12'),(3,3,'REALIZADA','2026-11-05');
/*!40000 ALTER TABLE `inspecoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `codUsuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL,
  PRIMARY KEY (`codUsuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Rafael','rafael@gmail.com','U2FsdGVkX1+QW7Ig0klPDlBui6zWuAduFK1nd4edTF4='),(2,'leafar','leafar@gmail.com','U2FsdGVkX181qEQ94HEe26WgK9M2gkKdLPjGh3fu4rM='),(3,'dacael','dacael@gmail.com','U2FsdGVkX1+j8U7Oufa6CY5XNBowi62GtO9zoruSvtc=');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-12  9:19:51
