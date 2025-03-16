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
-- Table structure for table `apis_user`
--

DROP TABLE IF EXISTS `apis_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apis_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `email` varchar(254) DEFAULT NULL,
  `phone` varchar(10) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `apis_user_phone_3bd85a79_uniq` (`phone`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apis_user`
--

LOCK TABLES `apis_user` WRITE;
/*!40000 ALTER TABLE `apis_user` DISABLE KEYS */;
INSERT INTO `apis_user` VALUES (1,'pbkdf2_sha256$870000$KEN9M88CoHtce1RCUyg8zS$o8ni60V26oY1izp/G/97fJI0cnPD2L/9A6q5kc88klY=',NULL,1,'tejas64@gmail.com','1234567890',0,0),(2,'pbkdf2_sha256$870000$mZtxVJwkJ7o90BUxZLB0w4$+VaPYruoq9pCkq3r4fIZ1eA2GI0uN7+LaF6U0EPiSIs=','2025-02-27 19:32:43.160075',1,'tejas644@gmail.com','1231231231',0,0),(3,'pbkdf2_sha256$870000$umbhz0SiT2zMOcycXWkrNi$O8o0ZqrUESPW3JwQKjynUqwGsoWvZjCAhIjCTJzpMUc=',NULL,1,'tejas6444@gmail.com','1212121212',0,0),(4,'pbkdf2_sha256$870000$kysJ7IZi5SpPSByioyDsny$dyBaUy0+tdUOBCKoz9g68u0rspv7uGCfrCLINuqi0jk=',NULL,1,'tejas123@gmail.com','1234123412',0,0),(5,'pbkdf2_sha256$870000$qtDSDjG0ApM7U9jgMUUKCs$a+QJtvfE0LYSpJDx9CRiPcyrKNFzTdHsTRU1eY44pBY=','2025-02-26 21:12:10.577682',1,'tp031852@gmail.com','9021031852',0,0),(7,'pbkdf2_sha256$870000$Gjwg4aZgSTsQUUHK2fCL5o$VK3TSD+uUzrm9qHS5dsar0lPfkD83LODDKYlJGDpJkw=',NULL,1,'tp123@gmail.com','1111122222',0,0),(8,'pbkdf2_sha256$870000$wYTq1hICk0tHs89YWU7YXi$wsC5A4dVERA7lqi/oUHo45bqzlNk+BBCM4XzOHYz/iU=','2025-03-06 18:20:35.940983',1,'cpp@gmail.com','2121212121',0,0);
/*!40000 ALTER TABLE `apis_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-16 13:11:56
