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
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add user',7,'add_customuser'),(26,'Can change user',7,'change_customuser'),(27,'Can delete user',7,'delete_customuser'),(28,'Can view user',7,'view_customuser'),(29,'Can add user',7,'add_user'),(30,'Can change user',7,'change_user'),(31,'Can delete user',7,'delete_user'),(32,'Can view user',7,'view_user'),(33,'Can add coupon',8,'add_coupon'),(34,'Can change coupon',8,'change_coupon'),(35,'Can delete coupon',8,'delete_coupon'),(36,'Can view coupon',8,'view_coupon'),(37,'Can add product',9,'add_product'),(38,'Can change product',9,'change_product'),(39,'Can delete product',9,'delete_product'),(40,'Can view product',9,'view_product'),(41,'Can add order item',10,'add_orderitem'),(42,'Can change order item',10,'change_orderitem'),(43,'Can delete order item',10,'delete_orderitem'),(44,'Can view order item',10,'view_orderitem'),(45,'Can add payment',11,'add_payment'),(46,'Can change payment',11,'change_payment'),(47,'Can delete payment',11,'delete_payment'),(48,'Can view payment',11,'view_payment'),(49,'Can add cart',12,'add_cart'),(50,'Can change cart',12,'change_cart'),(51,'Can delete cart',12,'delete_cart'),(52,'Can view cart',12,'view_cart'),(53,'Can add shipping address',13,'add_shippingaddress'),(54,'Can change shipping address',13,'change_shippingaddress'),(55,'Can delete shipping address',13,'delete_shippingaddress'),(56,'Can view shipping address',13,'view_shippingaddress'),(57,'Can add notification',14,'add_notification'),(58,'Can change notification',14,'change_notification'),(59,'Can delete notification',14,'delete_notification'),(60,'Can view notification',14,'view_notification'),(61,'Can add cart item',15,'add_cartitem'),(62,'Can change cart item',15,'change_cartitem'),(63,'Can delete cart item',15,'delete_cartitem'),(64,'Can view cart item',15,'view_cartitem'),(65,'Can add review',16,'add_review'),(66,'Can change review',16,'change_review'),(67,'Can delete review',16,'delete_review'),(68,'Can view review',16,'view_review'),(69,'Can add category',17,'add_category'),(70,'Can change category',17,'change_category'),(71,'Can delete category',17,'delete_category'),(72,'Can view category',17,'view_category'),(73,'Can add wishlist',18,'add_wishlist'),(74,'Can change wishlist',18,'change_wishlist'),(75,'Can delete wishlist',18,'delete_wishlist'),(76,'Can view wishlist',18,'view_wishlist'),(77,'Can add order',19,'add_order'),(78,'Can change order',19,'change_order'),(79,'Can delete order',19,'delete_order'),(80,'Can view order',19,'view_order'),(81,'Can add Token',20,'add_token'),(82,'Can change Token',20,'change_token'),(83,'Can delete Token',20,'delete_token'),(84,'Can view Token',20,'view_token'),(85,'Can add Token',21,'add_tokenproxy'),(86,'Can change Token',21,'change_tokenproxy'),(87,'Can delete Token',21,'delete_tokenproxy'),(88,'Can view Token',21,'view_tokenproxy'),(89,'Can add blacklisted token',22,'add_blacklistedtoken'),(90,'Can change blacklisted token',22,'change_blacklistedtoken'),(91,'Can delete blacklisted token',22,'delete_blacklistedtoken'),(92,'Can view blacklisted token',22,'view_blacklistedtoken'),(93,'Can add outstanding token',23,'add_outstandingtoken'),(94,'Can change outstanding token',23,'change_outstandingtoken'),(95,'Can delete outstanding token',23,'delete_outstandingtoken'),(96,'Can view outstanding token',23,'view_outstandingtoken');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-16 13:11:53
