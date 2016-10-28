-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lance
-- ------------------------------------------------------
-- Server version	5.7.13-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
  `addressId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `neighborhood` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `cep` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`addressId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (9,'123456','Rua Izaac Ferreira da Cruz','332','Ap 401','Pinheirinho','Curitiba','Paraná','81870000','2016-09-16 14:20:05','2016-09-16 14:20:05'),(10,'9999','streetTest','numberTest','complementTest','neighborhoodTest','cityTest','stateTest','cepTest','2016-09-20 20:07:39','2016-09-20 20:07:39'),(11,'9999','streetTest','numberTest','complementTest','neighborhoodTest','cityTest','stateTest','cepTest','2016-09-20 20:09:12','2016-09-20 20:09:12'),(12,'9999','streetTest','numberTest','complementTest','neighborhoodTest','cityTest','stateTest','cepTest','2016-09-20 20:10:56','2016-09-20 20:10:56'),(13,'9999','streetTest','numberTest','complementTest','neighborhoodTest','cityTest','stateTest','cepTest','2016-09-20 20:12:42','2016-09-20 20:12:42'),(14,'9999','streetTest','numberTest','complementTest','neighborhoodTest','cityTest','stateTest','cepTest','2016-09-20 20:12:56','2016-09-20 20:12:56'),(15,'9999','streetTest','numberTest','complementTest','neighborhoodTest','cityTest','stateTest','cepTest','2016-09-20 20:18:16','2016-09-20 20:18:16'),(16,'9999','streetTest','numberTest1','complementTest','neighborhoodTest','cityTest','stateTest','cepTest','2016-09-20 20:19:58','2016-09-20 20:19:58'),(17,'9999','streetTest','numberTest1','complementTest','neighborhoodTest','cityTest','stateTest','cepTest','2016-09-20 20:20:29','2016-09-20 20:20:29'),(18,'9999','streetTest','numberTest1','complementTest','neighborhoodTest','cityTest','stateTest','cepTest','2016-09-20 20:20:48','2016-09-20 20:20:48'),(19,'9999','streetTest','numberTest','complementTest','neighborhoodTest','cityTest','stateTest','cepTest','2016-09-20 20:21:04','2016-09-20 20:21:04'),(20,'9999','streetTest','numberTest','complementTest','neighborhoodTest','cityTest','stateTest','cepTest','2016-09-20 20:21:13','2016-09-20 20:21:13');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auctions`
--

DROP TABLE IF EXISTS `auctions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auctions` (
  `auctionId` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `institutionId` int(11) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `minimumBid` double DEFAULT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isClosed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`auctionId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auctions`
--

LOCK TABLES `auctions` WRITE;
/*!40000 ALTER TABLE `auctions` DISABLE KEYS */;
INSERT INTO `auctions` VALUES (1,1,1,'123456',10.25,'1987-10-10 03:00:00','1997-10-10 03:00:00','2016-09-19 05:31:31','2016-09-19 05:33:40',NULL),(2,9999,9999,'userIdTest',99.99,'2016-09-21 18:01:29','2016-09-21 18:01:29','2016-09-21 18:01:29','2016-09-21 18:01:29',NULL),(3,9999,9999,'userIdTest',99.99,'2016-09-21 18:06:35','2016-09-21 18:06:35','2016-09-21 18:06:35','2016-09-21 18:06:35',NULL),(4,9999,9999,'userIdTest',99.99,'2016-09-21 18:07:42','2016-09-21 18:07:42','2016-09-21 18:07:42','2016-09-21 18:07:42',NULL),(5,9999,9999,'userIdTest',99.99,'2016-09-21 18:07:49','2016-09-21 18:07:49','2016-09-21 18:07:49','2016-09-21 18:07:49',NULL),(6,9999,9999,'userIdTest',99.99,'2016-09-21 18:08:09','2016-09-21 18:08:09','2016-09-21 18:08:09','2016-09-21 18:08:09',NULL),(7,9999,9999,'userIdTest',99.99,'2016-09-21 18:10:38','2016-09-21 18:10:38','2016-09-21 18:10:38','2016-09-21 18:10:38',NULL),(8,9999,9999,'userIdTest',99.99,'2016-09-21 18:13:03','2016-09-21 18:13:03','2016-09-21 18:13:03','2016-09-21 18:13:03',NULL),(9,9999,9999,'userIdTest',999.99,'2016-09-21 18:14:53','2016-09-21 18:14:53','2016-09-21 18:14:53','2016-09-21 18:14:53',NULL);
/*!40000 ALTER TABLE `auctions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bids`
--

DROP TABLE IF EXISTS `bids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bids` (
  `bidId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `auctionId` int(11) NOT NULL,
  `bid` double NOT NULL,
  `date` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isDeleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`bidId`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bids`
--

LOCK TABLES `bids` WRITE;
/*!40000 ALTER TABLE `bids` DISABLE KEYS */;
INSERT INTO `bids` VALUES (1,'123456',1,56.1,'2016-09-19 06:15:44','2016-09-19 06:15:44','2016-09-19 06:15:44',0),(2,'123456',1,57.2,'2016-09-19 06:56:16','2016-09-19 06:56:16','2016-09-19 07:05:29',1),(3,'123456',1,58.2,'2016-09-19 07:04:42','2016-09-19 07:04:42','2016-09-19 07:04:42',0),(4,'userIdTest',9999,99.99,'2016-09-21 18:19:31','2016-09-21 18:19:31','2016-09-21 18:19:31',0),(5,'userIdTest',9999,99.99,'2016-09-21 18:26:53','2016-09-21 18:26:53','2016-09-21 18:26:53',0),(6,'userIdTest',9999,99.99,'2016-09-21 18:27:00','2016-09-21 18:27:00','2016-09-21 18:27:00',0),(7,'userIdTest',9999,99.99,'2016-09-21 18:27:08','2016-09-21 18:27:08','2016-09-21 18:27:08',0),(8,'userIdTest',9999,99.99,'2016-09-21 18:28:24','2016-09-21 18:28:24','2016-09-21 18:28:24',0),(9,'userIdTest',9999,99.99,'2016-09-21 18:28:30','2016-09-21 18:28:30','2016-09-21 18:28:30',0),(10,'userIdTest',9999,99.99,'2016-09-21 18:28:48','2016-09-21 18:28:48','2016-09-21 18:28:48',0),(11,'userIdTest',9999,99.99,'2016-09-21 18:30:04','2016-09-21 18:30:04','2016-09-21 18:30:04',0),(12,'userIdTest',9999,99.99,'2016-09-21 18:30:15','2016-09-21 18:30:15','2016-09-21 18:30:15',0),(13,'userIdTest1',9999,99.99,'2016-09-21 18:31:27','2016-09-21 18:31:27','2016-09-21 18:31:27',0),(14,'userIdTest1',9999,99.99,'2016-09-21 18:31:40','2016-09-21 18:31:40','2016-09-21 18:31:40',0);
/*!40000 ALTER TABLE `bids` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emails`
--

DROP TABLE IF EXISTS `emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emails` (
  `emailId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`emailId`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emails`
--

LOCK TABLES `emails` WRITE;
/*!40000 ALTER TABLE `emails` DISABLE KEYS */;
INSERT INTO `emails` VALUES (1,'123456','cagrispan@gmail.com','2016-09-16 15:46:52','2016-09-16 15:46:52'),(3,'userIdTest','emailTest','2016-09-21 18:50:35','2016-09-21 18:50:35'),(4,'userIdTest','emailTest','2016-09-21 18:52:04','2016-09-21 18:52:04'),(5,'userIdTest','emailTest','2016-09-21 18:52:12','2016-09-21 18:52:12'),(6,'userIdTest','emailTest','2016-09-21 18:52:40','2016-09-21 18:52:40'),(7,'userIdTest','emailTest','2016-09-21 18:53:50','2016-09-21 18:53:50');
/*!40000 ALTER TABLE `emails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `imageId` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `base64` varchar(250) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`imageId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,1,'test','2016-10-25 16:46:40','2016-10-25 16:46:40');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `productId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 NOT NULL,
  `description` varchar(1023) CHARACTER SET utf8 NOT NULL,
  `isUsed` tinyint(1) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productId`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'22','Título','Descrição',0,0,'2016-09-16 17:29:42','2016-09-16 17:29:42'),(2,'123456','Título','Descrição',1,0,'2016-09-16 17:30:00','2016-09-16 17:30:00'),(3,'123456','Título','Descrição Modificada',1,1,'2016-09-16 17:30:07','2016-09-16 17:30:37'),(4,'0','titleTest','descriptionTest',1,0,'2016-09-20 19:40:37','2016-09-20 19:40:37'),(5,'0','titleTest','descriptionTest',1,0,'2016-09-20 19:45:59','2016-09-20 19:45:59'),(6,'0','titleTest','descriptionTest',1,0,'2016-09-20 19:46:55','2016-09-20 19:46:55'),(7,'0','titleTest','descriptionTest',1,0,'2016-09-20 19:47:41','2016-09-20 19:47:41'),(8,'0','titleTest','descriptionTest',1,0,'2016-09-20 19:48:34','2016-09-20 19:48:34'),(9,'0','titleTest','descriptionTest',1,0,'2016-09-20 19:50:55','2016-09-20 19:50:55'),(10,'0','titleTest','descriptionTest',1,0,'2016-09-20 19:50:59','2016-09-20 19:50:59'),(11,'9999','titleTest','descriptionTest',1,0,'2016-09-20 20:07:46','2016-09-20 20:07:46'),(12,'9999','titleTest','descriptionTest',1,0,'2016-09-20 20:09:06','2016-09-20 20:09:06'),(13,'10209487248445496','Notebook','Meu note',1,0,'2016-10-14 19:53:59','2016-10-14 19:53:59');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchases` (
  `purchaseId` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `auctionId` int(11) NOT NULL,
  `paymentId` int(11) DEFAULT NULL,
  `deliveryId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` varchar(255) NOT NULL,
  `redirectUrl` varchar(255) DEFAULT NULL,
  `reviewUrl` varchar(255) DEFAULT NULL,
  `reference` varchar(255) NOT NULL,
  `currency` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`purchaseId`),
  UNIQUE KEY `reference_UNIQUE` (`reference`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (6,1,1,NULL,NULL,'2016-10-05 19:02:12','2016-10-05 19:02:12','asd','teste','reviewUrl','eita','tete',NULL),(21,1,1,NULL,NULL,'2016-10-14 03:41:22','2016-10-14 03:41:22','asd','teste','reviewUrl','lala','tete','PENDING'),(22,1,1,NULL,NULL,'2016-10-14 03:43:19','2016-10-14 03:43:19','asd','teste','reviewUrl','5871cc20-91c0-11e6-8f56-fdc03ac71e8f','tete','PENDING'),(23,1,1,NULL,NULL,'2016-10-14 14:10:34','2016-10-14 14:27:04','asd','teste','reviewUrl','f7f1c960-9217-11e6-b3e0-9df596d06aef','tete','PAID'),(24,1,1,NULL,NULL,'2016-10-14 19:35:07','2016-10-14 19:40:56','asd','blablabla','reviewUrl','4f4e5070-9245-11e6-8377-2f31adcb7202',NULL,'PAID'),(25,1,1,NULL,NULL,'2016-10-26 18:03:43','2016-10-26 18:03:43','asd','teste','reviewUrl','865d59c0-9ba6-11e6-89bd-3fb2304f2679',NULL,'PENDING');
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telephones`
--

DROP TABLE IF EXISTS `telephones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `telephones` (
  `telephoneId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `telephone` varchar(255) CHARACTER SET utf8 NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`telephoneId`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telephones`
--

LOCK TABLES `telephones` WRITE;
/*!40000 ALTER TABLE `telephones` DISABLE KEYS */;
INSERT INTO `telephones` VALUES (1,'123456','41998946575','2016-09-16 15:52:02','2016-09-16 15:53:56'),(2,'123456','4132277738','2016-09-16 15:52:19','2016-09-16 15:52:19'),(4,'userIdTest','telephoneTest','2016-09-21 20:18:55','2016-09-21 20:18:55'),(5,'userIdTest','telephoneTest','2016-09-21 20:21:18','2016-09-21 20:21:18'),(6,'userIdTest','telephoneTest','2016-09-21 20:22:17','2016-09-21 20:22:17'),(7,'userIdTest','telephoneTest','2016-09-21 20:23:25','2016-09-21 20:23:25');
/*!40000 ALTER TABLE `telephones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `facebookId` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `facebookToken` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `facebookId` (`facebookId`),
  UNIQUE KEY `users_facebookId_unique` (`facebookId`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (22,'asd','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFzZCIsImlhdCI6MTQ3MjI0NDc2Nn0.80MLz52WG1SX2dKB3fIJuGc_ej3dF2ivEaifvY7gizQ','EAACEWdrtNoBAMVC5sQFjPeE9XTPlzSKooPl5NJtKUGWITmZCaTjcUjJRmFLURDtB36E2oWqJTpYQxJ2fu9ALNT215YOpWx5wZBD3nY7quwWtpYM4eLFc0L5Jka3QXcj0VPwzFB6xKqiFmPQ7zQwjdMWbqGwnKmAQDpvBIqwZDZD','Alisson222','2016-08-11 03:00:00','2016-08-26 20:42:12','2016-08-26 20:52:46',NULL),(23,'asddsdfs','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFzZGRzZGZzIiwiaWF0IjoxNDcyMjQ1NDU0fQ.V_1IR-a3mE6KFtRVAfBszCxttZU7izsOWwQOYe1X0es','EAACEWdrtNoBAMVC5sQFjPeE9XTPlzSKooPl5NJtKUGWITmZCaTjcUjJRmFLURDtB36E2oWqJTpYQxJ2fu9ALNT215YOpWx5wZBD3nY7quwWtpYM4eLFc0L5Jka3QXcj0VPwzFB6xKqiFmPQ7zQwjdMWbqGwnKmAQDpvBIqwZDZD','Alisson222','2016-08-11 03:00:00','2016-08-26 20:53:12','2016-08-26 21:04:14',NULL),(24,'aehooo','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFlaG9vbyIsImlhdCI6MTQ3MjI0NTcyN30.YPg0pVerWMZIjek_oLZ_TjiFfroo1opAUY5iFId8tZg','aehooo','12312312','2016-08-10 03:00:00','2016-08-26 20:57:31','2016-08-26 21:08:47',NULL),(25,'973779339415023','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3Mzc3OTMzOTQxNTAyMyIsImlhdCI6MTQ3MzgwNjA1MH0.CmTkMjtVCgzmoixPOg41dNVkMpfElZ-a4fQrKGIoetU','EAACEWrdrtNoBAIdbMyzIAIknYbaWZCiI14NqCN249CFfbkZBFJO4w4v0nukZAoudblvpwNtKHNaUovtw7fMYoHurMmZCRU3kt7frZC7yh8wwGie0hdvnMQPM47MtPCvB5s7cweAKi0yy13WYiIZCLmr4WTNVz6HQFqiDq21ywQ9gZDZD','Alisson Krul','1996-07-08 03:00:00','2016-09-06 19:04:48','2016-09-13 22:34:11',NULL),(27,'123456','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1NiIsImlhdCI6MTQ3NDAzMjU1Nn0.maHtyimKG1Jk8Mh26S8kkf6SscwMJBxR3vuEIAZHnyw','123456qwerty','Carlos Augusto Grispan','1987-10-10 03:00:00','2016-09-16 13:11:01','2016-09-16 13:29:16',NULL),(28,'facebookId9xE3S','tokenCctye','facebookTokenQbNjL','name','2016-09-20 18:55:24','2016-09-20 18:55:24','2016-09-20 18:55:24',NULL),(29,'facebookIdKtIPr','token3zLh4','facebookTokenbE4EL','name','2016-09-20 18:55:50','2016-09-20 18:55:50','2016-09-20 18:55:50',NULL),(30,'facebookIdRviZR','tokenXlTbY','facebookTokenRFAsJ','name','2016-09-20 18:56:10','2016-09-20 18:56:10','2016-09-20 18:56:10',NULL),(31,'facebookIdvn586','tokenDjPmz','facebookTokenv8mNZ','name','2016-09-20 18:56:22','2016-09-20 18:56:22','2016-09-20 18:56:22',NULL),(32,'facebookId6egG0','tokenYa0fu','facebookToken67VXm','name','2016-09-20 18:56:44','2016-09-20 18:56:44','2016-09-20 18:56:44',NULL),(33,'facebookId4hxda','tokenSqbTa','facebookToken4KEyi','name','2016-09-20 19:06:28','2016-09-20 19:06:29','2016-09-20 19:06:29',NULL),(34,'facebookId5EiZF','tokenOfKrK','facebookTokenauvad','name','2016-09-20 19:08:29','2016-09-20 19:08:29','2016-09-20 19:08:29',NULL),(35,'facebookId8DFnq','tokenCjMNy','facebookTokenTZ2yL','name','2016-09-20 19:08:55','2016-09-20 19:08:55','2016-09-20 19:08:55',NULL),(36,'facebookIdLe2u0','tokenfZkct','facebookTokenyjy5g','name','2016-09-20 19:09:08','2016-09-20 19:09:09','2016-09-20 19:09:09',NULL),(37,'facebookIdMcaE5','tokenrDsEH','facebookToken7ai1A','name','2016-09-20 19:09:29','2016-09-20 19:09:30','2016-09-20 19:09:30',NULL),(38,'facebookIdjhF3Y','tokenEadRv','facebookToken7WUqw','name','2016-09-20 19:14:11','2016-09-20 19:14:12','2016-09-20 19:14:12',NULL),(39,'facebookIdt1HPD','tokeneONQJ','facebookTokenKiOuw','name','2016-09-20 19:14:37','2016-09-20 19:14:37','2016-09-20 19:14:37',NULL),(40,'facebookIdl0iib','tokenpgrvJ','facebookTokenSwIqe','name','2016-09-20 19:15:35','2016-09-20 19:15:35','2016-09-20 19:15:35',NULL),(41,'facebookIdjLjLH','tokenJluLh','facebookTokenToUkr','name','2016-09-20 19:15:44','2016-09-20 19:15:44','2016-09-20 19:15:44',NULL),(42,'facebookIdAhU3T','tokenBmE3E','facebookTokenjcJ85','name','2016-09-20 19:15:55','2016-09-20 19:15:55','2016-09-20 19:15:55',NULL),(43,'facebookIdTxfWD','tokennJicf','facebookTokenBs31y','name1','2016-09-20 19:16:52','2016-09-20 19:16:52','2016-09-20 19:16:52',NULL),(44,'facebookIdwa3BL','tokenHgbdK','facebookTokenm25UD','name1','2016-09-20 19:18:37','2016-09-20 19:18:37','2016-09-20 19:18:37',NULL),(45,'teste123456','tokenTest','tokenTest','testeZao','1998-10-09 03:00:00','2016-09-23 12:23:28','2016-09-23 12:23:28',NULL),(46,'10209487248445496','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMjA5NDg3MjQ4NDQ1NDk2IiwiaWF0IjoxNDc2NDc0MjkyfQ.hYyPGYm2p1A-U7AIotvIXuA0Ax9JHDi5HSrNkmBQpK8','EAACEWrdrtNoBAGOWZAtDojcoNOhIMMV13wZCIhOH8z75AxtHufZCFHg2ZApz8MRNA52HKoZCWtRY7snMhn8tskiH3ES8tW23iZAcpSf5piltvZCHNF1ZATGbz0dX9Ks1VkQmH8zd3p2RTEQ4XHebpmO6XFJwiwfjH9ciAZCmZALUsYJgZDZD','Carlos Augusto Grispan','1970-01-01 00:00:00','2016-10-14 19:44:52','2016-10-14 19:44:52',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-28 15:47:03
