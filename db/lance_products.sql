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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buyerUser` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `isUsed` tinyint(1) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `auctions` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,NULL,'titletest','descriptionTest','categoryTest','tagstest',0,'','','2016-08-30 21:24:46','2016-08-30 21:24:46'),(2,NULL,'titletest','descriptionTest','categoryTest','tagstest',0,'','','2016-08-31 17:59:22','2016-08-31 17:59:22'),(3,NULL,'titletest','descriptionTest','categoryTest','tagstest',0,'','','2016-08-31 18:00:05','2016-08-31 18:00:05'),(4,NULL,'titletest','descriptionTest','categoryTest','tagstest',0,'','','2016-08-31 18:00:29','2016-08-31 18:00:29'),(5,NULL,'titletest','descriptionTest','categoryTest','tagstest',0,'','','2016-08-31 18:00:43','2016-08-31 18:00:43'),(6,NULL,'titletest','descriptionTest','categoryTest','tagstest',0,'','','2016-08-31 18:00:52','2016-08-31 18:00:52'),(7,NULL,'titletest','descriptionTest','categoryTest','tagstest',0,'','','2016-08-31 18:01:12','2016-08-31 18:01:12'),(8,NULL,'titletest','descriptionTest','categoryTest','tagstest',0,'','','2016-08-31 18:01:25','2016-08-31 18:01:25'),(9,NULL,'titletest','descriptionTest','categoryTest','tagstest',0,'','','2016-08-31 18:02:06','2016-08-31 18:02:06'),(10,NULL,'titletest','descriptionTest','categoryTest','tagstest',0,'','','2016-08-31 18:02:27','2016-08-31 18:02:27'),(11,NULL,'titletest','descriptionTest','categoryTest','tagstest',0,'','','2016-08-31 18:03:20','2016-08-31 18:03:20'),(12,NULL,'titletest','descriptionTest','categoryTest','tagstest',0,'','','2016-08-31 18:03:38','2016-08-31 18:03:38'),(13,NULL,'titletest','descriptionTest','categoryTest','tagstest',0,'','','2016-08-31 18:03:59','2016-08-31 18:03:59'),(14,NULL,'oi','descriptionTest','categoryTest','tagstest',0,'','','2016-08-31 19:39:55','2016-08-31 19:39:55'),(15,NULL,'oi','descriptionTest','categoryTest','tagstest',0,'','','2016-08-31 19:43:45','2016-08-31 19:43:45'),(16,NULL,'oi','descriptionTest','categoryTest','tagstest',0,'','','2016-08-31 19:47:51','2016-08-31 19:47:51');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-09-08 15:44:27
