-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: fsecom
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `apis_wishlist`
--

DROP TABLE IF EXISTS `apis_wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apis_wishlist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `apis_wishlist_product_id_17745331_fk_apis_product_id` (`product_id`),
  KEY `apis_wishlist_user_id_4d65fc60_fk_apis_user_id` (`user_id`),
  CONSTRAINT `apis_wishlist_product_id_17745331_fk_apis_product_id` FOREIGN KEY (`product_id`) REFERENCES `apis_product` (`id`),
  CONSTRAINT `apis_wishlist_user_id_4d65fc60_fk_apis_user_id` FOREIGN KEY (`user_id`) REFERENCES `apis_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apis_wishlist`
--

LOCK TABLES `apis_wishlist` WRITE;
/*!40000 ALTER TABLE `apis_wishlist` DISABLE KEYS */;
INSERT INTO `apis_wishlist` VALUES (9,'2025-03-15 21:49:15.673049',1,2),(10,'2025-03-15 21:51:18.969269',1,2),(11,'2025-03-15 21:51:41.951780',2,2),(12,'2025-03-15 22:32:51.987402',2,2),(13,'2025-03-15 22:33:01.611504',2,2),(14,'2025-03-15 22:34:10.868483',2,2),(15,'2025-03-15 22:36:33.876982',2,2),(16,'2025-03-15 22:40:31.259379',2,2),(17,'2025-03-15 22:41:15.456160',2,2),(18,'2025-03-16 02:52:22.655515',15,2);
/*!40000 ALTER TABLE `apis_wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-16 13:11:59
