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
-- Table structure for table `apis_order`
--

DROP TABLE IF EXISTS `apis_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apis_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `total_price` decimal(10,2) NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `apis_order_user_id_a7b21c1a_fk_apis_user_id` (`user_id`),
  CONSTRAINT `apis_order_user_id_a7b21c1a_fk_apis_user_id` FOREIGN KEY (`user_id`) REFERENCES `apis_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apis_order`
--

LOCK TABLES `apis_order` WRITE;
/*!40000 ALTER TABLE `apis_order` DISABLE KEYS */;
INSERT INTO `apis_order` VALUES (30,1299.00,'pending','2025-03-15 12:52:52.046079','2025-03-15 12:52:52.084361',2),(31,1299.00,'pending','2025-03-15 12:57:11.568971','2025-03-15 12:57:11.834716',2),(32,1299.00,'pending','2025-03-15 13:06:43.884222','2025-03-15 13:06:43.924196',2),(33,2598.00,'pending','2025-03-15 13:26:27.865225','2025-03-15 13:26:27.881997',2),(34,1999.00,'pending','2025-03-15 19:26:33.262304','2025-03-15 19:26:33.287143',2),(35,1299.00,'Pending','2025-03-15 22:32:36.598217','2025-03-15 22:32:36.598217',2),(36,1299.00,'Pending','2025-03-15 22:40:49.146268','2025-03-15 22:40:49.146268',2),(37,58663.00,'pending','2025-03-15 23:04:53.613857','2025-03-15 23:04:53.785691',2),(38,599.00,'Pending','2025-03-15 23:08:13.694830','2025-03-15 23:08:13.695808',2),(39,699.00,'pending','2025-03-15 23:39:32.465534','2025-03-15 23:39:32.574980',2),(40,1299.00,'Pending','2025-03-15 23:40:43.007266','2025-03-15 23:40:43.007266',2),(41,499.00,'Pending','2025-03-16 02:52:33.523631','2025-03-16 02:52:33.523631',2),(42,4895.00,'pending','2025-03-16 02:53:01.401764','2025-03-16 02:53:01.418888',2);
/*!40000 ALTER TABLE `apis_order` ENABLE KEYS */;
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
