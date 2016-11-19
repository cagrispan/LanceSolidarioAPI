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
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,'973779339415023','Rua','123','Casa','Vila','Cidade','State','83025-580','2016-11-19 17:29:22','0000-00-00 00:00:00'),(2,'682913488534320','Viela','333','Apartamento','Vizinhanca','Cidade grande','Parana','80000-234','2016-11-19 17:47:46','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `auctions`
--

LOCK TABLES `auctions` WRITE;
/*!40000 ALTER TABLE `auctions` DISABLE KEYS */;
INSERT INTO `auctions` VALUES (1,1,1,'973779339415023',56,'2016-11-19 16:45:21','2016-11-21 16:39:30','2016-11-19 16:39:30','2016-11-19 16:39:30',0),(2,2,1,'973779339415023',12,'2016-11-19 18:00:00','2016-11-21 17:53:05','2016-11-19 17:53:05','2016-11-19 17:58:17',1),(3,2,1,'973779339415023',56,'2016-11-19 18:00:22','2016-11-21 17:58:39','2016-11-19 17:58:39','2016-11-19 18:03:42',1),(4,2,1,'973779339415023',12.08,'2016-11-19 18:15:29','2016-11-21 18:07:39','2016-11-19 18:07:39','2016-11-19 18:08:44',1),(5,2,1,'973779339415023',5.07,'2016-11-19 18:15:14','2016-11-21 18:09:24','2016-11-19 18:09:24','2016-11-19 18:09:33',1),(6,2,1,'973779339415023',5.03,'2016-11-19 18:15:47','2016-11-21 18:10:02','2016-11-19 18:10:02','2016-11-19 18:10:12',1),(7,2,1,'973779339415023',5.02,'2016-11-19 18:15:59','2016-11-21 18:11:09','2016-11-19 18:11:09','2016-11-19 18:11:23',1),(8,2,1,'973779339415023',78,'2016-11-19 18:15:53','2016-11-21 18:14:01','2016-11-19 18:14:01','2016-11-19 18:14:09',1),(9,2,1,'973779339415023',12.12,'2016-11-19 18:30:04','2016-11-21 18:15:14','2016-11-19 18:15:14','2016-11-19 18:15:26',1),(10,2,1,'973779339415023',56,'2016-11-19 18:30:43','2016-11-21 18:17:51','2016-11-19 18:17:51','2016-11-19 18:18:06',1);
/*!40000 ALTER TABLE `auctions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `bids`
--

LOCK TABLES `bids` WRITE;
/*!40000 ALTER TABLE `bids` DISABLE KEYS */;
INSERT INTO `bids` VALUES (1,'973779339415023',1,56.23,'2016-11-19 17:36:10','2016-11-19 17:36:10','2016-11-19 17:36:10',0),(2,'682913488534320',1,61.23,'2016-11-19 17:40:14','2016-11-19 17:40:14','2016-11-19 17:40:14',0),(3,'973779339415023',1,62.12,'2016-11-19 17:43:53','2016-11-19 17:43:53','2016-11-19 17:43:53',0),(4,'973779339415023',1,62.34,'2016-11-19 17:44:01','2016-11-19 17:44:01','2016-11-19 17:44:01',0),(5,'682913488534320',1,63,'2016-11-19 17:52:04','2016-11-19 17:52:04','2016-11-19 17:52:04',0),(6,'973779339415023',1,89,'2016-11-19 18:19:00','2016-11-19 18:19:00','2016-11-19 18:19:00',0),(7,'973779339415023',1,90,'2016-11-19 18:19:18','2016-11-19 18:19:18','2016-11-19 18:19:18',0);
/*!40000 ALTER TABLE `bids` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `emails`
--

LOCK TABLES `emails` WRITE;
/*!40000 ALTER TABLE `emails` DISABLE KEYS */;
INSERT INTO `emails` VALUES (1,'682913488534320','test@tete.com','2016-11-19 17:57:13','0000-00-00 00:00:00'),(2,'682913488534320','test@tata.com','2016-11-19 17:57:24','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `emails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,1,'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','2016-11-19 16:39:19','2016-11-19 16:39:19');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `institutions`
--

LOCK TABLES `institutions` WRITE;
/*!40000 ALTER TABLE `institutions` DISABLE KEYS */;
INSERT INTO `institutions` VALUES (1,'test','test@test.com','(41) 9999-9999','Sr Doidao','É um teste muito louco','2016-11-19 16:25:54','0000-00-00 00:00:00',NULL,NULL,NULL),(2,'Nao é um test','naoehtest@test.com','(41) 8888-8888','Sr Certinho','Não é um teste muito louco','2016-11-19 16:25:54','0000-00-00 00:00:00',NULL,NULL,NULL);
/*!40000 ALTER TABLE `institutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'973779339415023','Camera legal','Camelra legas descrição bacana',0,0,'2016-11-19 16:39:19','2016-11-19 16:39:19',NULL,NULL),(2,'973779339415023','Teste 02','Chocolate',0,0,'2016-11-19 17:52:58','2016-11-19 17:52:58',NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (1,1,1,1,NULL,NULL,NULL,'2016-11-19 17:40:31','0000-00-00 00:00:00','682913488534320',NULL,NULL,'test',NULL,NULL,NULL);
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `telephones`
--

LOCK TABLES `telephones` WRITE;
/*!40000 ALTER TABLE `telephones` DISABLE KEYS */;
INSERT INTO `telephones` VALUES (1,'682913488534320','9999-9999','2016-11-19 18:07:41','0000-00-00 00:00:00'),(2,'682913488534320','8888-8888','2016-11-19 18:07:41','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `telephones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'973779339415023','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3Mzc3OTMzOTQxNTAyMyIsImlhdCI6MTQ3OTU3OTg3OX0.uxFSqHbYxZSukOGdmT9NfvOiuUpro96LqsgnhF9jklE','EAACEWrdrtNoBAAvfxAzzwNnoD9FzS99FyQZA7ZB3EByrSmV9uh8ongNB9G26tMZBFBtpSENRppA5qw7u5pYvw1CEebBeuZAs1oEiK0I5tkuqApZCx06DZBquNgazO7sO9n1WAgc2hKBhVRtZAjZByD3lCzGdsZB5zr0bAT82RkicrcQZDZD','Alisson Krul','1970-01-01','2016-11-19 16:38:52','2016-11-19 18:24:39','https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/13427991_935719576554333_300151272319627782_n.jpg?oh=f47fc9456e56008627bdb62f16ec5a47&oe=58CBD36C'),(2,'682913488534320','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjkxMzQ4ODUzNDMyMCIsImlhdCI6MTQ3OTU3NzIwOH0.XNZqPO6WKBt1YSTi2POihAuVAb4ck2KUQSBuhb5q74Q','EAACEWrdrtNoBALYXwugsXMxbZBDP9WuYT8jx63R2lB7ZC25GptCyhNLsfqsEZB9rRhNvaHajOlis2vimgyeZBS6tNK3o5hooSnCyEhsoCxu3Wn6ZC8nB8jx0z9VrdigwdnDMBwtjt608rJAswGaZCad5mFsQEjyZBOT8iQm8TXfsQZDZD','Viviana Marcia Moro Krul','1970-01-01','2016-11-19 17:40:08','2016-11-19 17:40:08','https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/306747_119424618216546_1056532257_n.jpg?oh=4e8a167b317cfbe75ea09f7bf30fba43&oe=588BC98D');
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

-- Dump completed on 2016-11-19 16:24:55
