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
-- Table structure for table `apis_shippingaddress`
--

DROP TABLE IF EXISTS `apis_shippingaddress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apis_shippingaddress` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address_line_1` varchar(255) NOT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `order_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `apis_shippingaddress_order_id_6aa24c9b_fk_apis_order_id` (`order_id`),
  KEY `apis_shippingaddress_user_id_059b1a83_fk_apis_user_id` (`user_id`),
  CONSTRAINT `apis_shippingaddress_order_id_6aa24c9b_fk_apis_order_id` FOREIGN KEY (`order_id`) REFERENCES `apis_order` (`id`),
  CONSTRAINT `apis_shippingaddress_user_id_059b1a83_fk_apis_user_id` FOREIGN KEY (`user_id`) REFERENCES `apis_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apis_shippingaddress`
--

LOCK TABLES `apis_shippingaddress` WRITE;
/*!40000 ALTER TABLE `apis_shippingaddress` DISABLE KEYS */;
INSERT INTO `apis_shippingaddress` VALUES (5,'dlfhjdafhljdf',NULL,'dfldfjk','lfdkjfaljk','0243987','2025-03-15 13:26:27.967365',33,2),(6,'fshg',NULL,'fgshsg','srrgfsgh','365','2025-03-15 19:26:33.370013',34,2),(7,'mahabal',NULL,'jalgaon','maharashtra','425001','2025-03-15 23:04:53.914942',37,2),(8,'uygukgu',NULL,'jfffjgygh','khjghkv','87645547','2025-03-15 23:39:32.728716',39,2),(9,'tregthehy',NULL,'yr46u56','ryhyth','67665','2025-03-16 02:53:01.458247',42,2);
/*!40000 ALTER TABLE `apis_shippingaddress` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-16 13:11:57
