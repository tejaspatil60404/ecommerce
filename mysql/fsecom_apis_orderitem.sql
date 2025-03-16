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
-- Table structure for table `apis_orderitem`
--

DROP TABLE IF EXISTS `apis_orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apis_orderitem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `apis_orderitem_order_id_f11a6ada_fk_apis_order_id` (`order_id`),
  KEY `apis_orderitem_product_id_26acbd16_fk_apis_product_id` (`product_id`),
  CONSTRAINT `apis_orderitem_order_id_f11a6ada_fk_apis_order_id` FOREIGN KEY (`order_id`) REFERENCES `apis_order` (`id`),
  CONSTRAINT `apis_orderitem_product_id_26acbd16_fk_apis_product_id` FOREIGN KEY (`product_id`) REFERENCES `apis_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apis_orderitem`
--

LOCK TABLES `apis_orderitem` WRITE;
/*!40000 ALTER TABLE `apis_orderitem` DISABLE KEYS */;
INSERT INTO `apis_orderitem` VALUES (40,1,1299.00,30,2),(41,1,1299.00,31,2),(42,1,1299.00,32,2),(43,2,2598.00,33,2),(44,1,1999.00,34,5),(45,1,1299.00,35,2),(46,1,1299.00,36,2),(47,7,6993.00,37,1),(48,4,13996.00,37,8),(49,10,12990.00,37,2),(50,6,4194.00,37,3),(51,1,3499.00,37,30),(52,1,3499.00,37,30),(53,1,3499.00,37,30),(54,1,1299.00,37,29),(55,2,2998.00,37,4),(56,1,1799.00,37,7),(57,1,1599.00,37,12),(58,1,1299.00,37,23),(59,1,999.00,37,16),(60,1,599.00,38,10),(61,1,699.00,39,3),(62,1,1299.00,40,2),(63,1,499.00,41,15),(64,3,3897.00,42,2),(65,1,499.00,42,15),(66,1,499.00,42,15);
/*!40000 ALTER TABLE `apis_orderitem` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-16 13:12:00
