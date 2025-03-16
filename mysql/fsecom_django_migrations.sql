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
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-02-24 18:08:13.619289'),(2,'auth','0001_initial','2025-02-24 18:08:14.289967'),(3,'admin','0001_initial','2025-02-24 18:08:14.407625'),(4,'admin','0002_logentry_remove_auto_add','2025-02-24 18:08:14.423248'),(5,'admin','0003_logentry_add_action_flag_choices','2025-02-24 18:08:14.431180'),(6,'contenttypes','0002_remove_content_type_name','2025-02-24 18:08:14.541323'),(7,'auth','0002_alter_permission_name_max_length','2025-02-24 18:08:14.616596'),(8,'auth','0003_alter_user_email_max_length','2025-02-24 18:08:14.646809'),(9,'auth','0004_alter_user_username_opts','2025-02-24 18:08:14.659766'),(10,'auth','0005_alter_user_last_login_null','2025-02-24 18:08:14.774404'),(11,'auth','0006_require_contenttypes_0002','2025-02-24 18:08:14.774404'),(12,'auth','0007_alter_validators_add_error_messages','2025-02-24 18:08:14.790025'),(13,'auth','0008_alter_user_username_max_length','2025-02-24 18:08:14.880408'),(14,'auth','0009_alter_user_last_name_max_length','2025-02-24 18:08:14.961555'),(15,'auth','0010_alter_group_name_max_length','2025-02-24 18:08:14.992249'),(16,'auth','0011_update_proxy_permissions','2025-02-24 18:08:14.998459'),(17,'auth','0012_alter_user_first_name_max_length','2025-02-24 18:08:15.080010'),(18,'sessions','0001_initial','2025-02-24 18:08:15.112771'),(19,'apis','0001_initial','2025-02-24 18:38:34.861246'),(20,'apis','0002_rename_customuser_user','2025-02-24 18:41:46.570482'),(21,'apis','0003_remove_user_is_staff_remove_user_is_superuser','2025-02-24 18:45:46.965241'),(22,'apis','0004_category_coupon_alter_user_groups_and_more','2025-02-25 06:31:37.562453'),(23,'apis','0005_remove_user_address_alter_category_image_and_more','2025-02-25 18:21:35.494336'),(28,'apis','0006_remove_user_username_alter_user_email_and_more','2025-02-26 11:03:46.448349'),(29,'authtoken','0001_initial','2025-02-26 11:16:23.996221'),(30,'authtoken','0002_auto_20160226_1747','2025-02-26 11:16:24.053145'),(31,'authtoken','0003_tokenproxy','2025-02-26 11:16:24.053145'),(32,'authtoken','0004_alter_tokenproxy_options','2025-02-26 11:16:24.074295'),(33,'apis','0007_alter_user_options_alter_user_managers_and_more','2025-02-26 19:46:36.096349'),(34,'token_blacklist','0001_initial','2025-02-27 20:39:06.309627'),(35,'token_blacklist','0002_outstandingtoken_jti_hex','2025-02-27 20:39:06.375011'),(36,'token_blacklist','0003_auto_20171017_2007','2025-02-27 20:39:06.411055'),(37,'token_blacklist','0004_auto_20171017_2013','2025-02-27 20:39:06.589034'),(38,'token_blacklist','0005_remove_outstandingtoken_jti','2025-02-27 20:39:06.689785'),(39,'token_blacklist','0006_auto_20171017_2113','2025-02-27 20:39:06.725535'),(40,'token_blacklist','0007_auto_20171017_2214','2025-02-27 20:39:07.073588'),(41,'token_blacklist','0008_migrate_to_bigautofield','2025-02-27 20:39:07.379413'),(42,'token_blacklist','0010_fix_migrate_to_bigautofield','2025-02-27 20:39:07.412988'),(43,'token_blacklist','0011_linearizes_history','2025-02-27 20:39:07.412988'),(44,'token_blacklist','0012_alter_outstandingtoken_user','2025-02-27 20:39:07.434603'),(45,'apis','0008_alter_category_image_alter_product_image','2025-03-09 09:56:22.585914'),(46,'apis','0009_alter_cartitem_cart_alter_cartitem_quantity_and_more','2025-03-14 19:28:16.159641'),(47,'apis','0010_alter_cartitem_cart','2025-03-15 03:05:29.577459');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-16 13:12:01
