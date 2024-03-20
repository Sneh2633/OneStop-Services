-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: ossdb
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `service_id` int NOT NULL AUTO_INCREMENT,
  `service_name` varchar(40) NOT NULL,
  PRIMARY KEY (`service_id`),
  UNIQUE KEY `service_name_UNIQUE` (`service_name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (5,'Appliances Repair'),(12,'Beautician'),(3,'Carpenter'),(4,'Cleaning & Paste Control'),(7,'Decoration'),(8,'Delivery'),(1,'Electrician'),(10,'Fitness'),(6,'Painting and Waterproofing'),(2,'Plumber'),(11,'Ridesharing'),(9,'Sculpture');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `fname` varchar(45) NOT NULL,
  `lname` varchar(30) NOT NULL,
  `email` varchar(55) NOT NULL,
  `address` varchar(200) NOT NULL,
  `contact_number` varchar(10) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (5,20,'Arati','Abc','Pune ','arati@gmail.com','4523698714'),(6,22,'Omkar','Shinde','Kothrud,Pune','omkars@gmail.com','5412369874'),(7,25,'Nikita','Karpe','Gunat,Shirur','nikita@gmail.com','4523698741'),(8,29,'customer','customer','customer@gmail.com','my addredd','9876543210'),(10,33,'Shifa','Pansare','shifa@gmail.com','Pune ','8976543209'),(11,36,'Shiv','Kale','shiv@gmail.com','Kharadi,Pune','4576432146'),(12,38,'Snehal','Suryavanshi','snehals@gmail.com','Kothrud, Pune','7896321457'),(13,40,'Pratiksha','Kohokade','kohokade@gmail.com','Pune ','9130703953');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `comments` varchar(150) NOT NULL,
  `rating` int DEFAULT NULL,
  `vendor_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `vendor_id_idx` (`vendor_id`),
  KEY `customer_id_idx` (`customer_id`),
  CONSTRAINT `customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  CONSTRAINT `vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,'Provided Excellent Service',5,4,5);
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `service_id` int NOT NULL,
  `booking_datetime` datetime NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  KEY `vendor_id` (`vendor_id`),
  KEY `serviceid_idx` (`service_id`),
  CONSTRAINT `FKj7bkj6q0u3681uv3bvq21316i` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,8,4,1,'2024-02-21 22:41:32',2),(2,8,8,3,'2024-02-22 00:35:15',2),(3,8,8,3,'2024-02-22 01:47:22',2),(4,8,4,1,'2024-02-22 03:39:12',2),(5,8,8,3,'2024-02-22 04:40:38',-1),(6,8,4,2,'2024-02-22 07:52:40',2),(7,8,4,2,'2024-02-22 07:54:56',-1),(8,8,4,2,'2024-02-22 07:54:58',-1),(9,10,8,3,'2024-02-22 08:27:00',-1),(10,10,8,3,'2024-02-22 08:28:40',2),(11,10,13,23,'2024-02-22 09:04:42',-1),(12,10,13,23,'2024-02-22 09:06:29',-1),(13,11,13,23,'2024-02-22 09:12:28',2),(14,8,8,3,'2024-02-22 11:15:39',2),(15,12,14,28,'2024-02-22 14:35:50',2),(16,8,11,2,'2024-02-23 07:35:15',0),(17,8,13,23,'2024-02-23 09:00:58',2),(18,8,13,23,'2024-02-23 09:14:40',2),(19,13,15,28,'2024-02-23 21:53:13',2),(20,8,13,23,'2024-02-23 23:28:01',0),(21,8,18,9,'2024-02-24 13:19:28',2);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `rname` varchar(45) NOT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'Customer'),(3,'Vendor');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_cost`
--

DROP TABLE IF EXISTS `service_cost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_cost` (
  `service_costid` int NOT NULL AUTO_INCREMENT,
  `cost` double NOT NULL,
  `service_id` int DEFAULT NULL,
  `vendor_id` int DEFAULT NULL,
  PRIMARY KEY (`service_costid`),
  KEY `FK8qa5rlwmv4eo0b1y770an9hj6_idx` (`service_id`),
  KEY `FKky1mnc8clj80smdweb930s27a` (`vendor_id`),
  CONSTRAINT `FK8qa5rlwmv4eo0b1y770an9hj6` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`),
  CONSTRAINT `FKky1mnc8clj80smdweb930s27a` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`vendor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_cost`
--

LOCK TABLES `service_cost` WRITE;
/*!40000 ALTER TABLE `service_cost` DISABLE KEYS */;
INSERT INTO `service_cost` VALUES (2,5649,1,4),(3,1888,2,4),(6,4589,3,8),(7,6000,2,11),(8,6700,23,13),(9,1000,28,14),(10,1000,28,15),(11,4000,9,18);
/*!40000 ALTER TABLE `service_cost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `service_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`service_id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'wireman','Installs ,maintain,and repair electrical systems with reliable power',1),(2,'new connection','Installing new connections,wiring',1),(3,'Furniture','Customized furniture designs',3),(4,'Flower decoration','We provide real as well as duplicate flower decoration design.',7),(5,'Tap Leakage Repairing','Best service for tap repairing',2),(6,'House Painting ','Variety of colour options available',6),(7,'Food Delivery','We deliver food on time',8),(9,'Birthday Decoration','Balloons Decoration',7),(20,'Decoration Sets','All types of sets available',7),(22,'Electrical Appliances ','All types of electrical appliances repaired',5),(23,'Residential Cleaning','Regular house cleaning, Deep cleaning, Move-in/move-out cleaning, Post-construction cleaning',4),(24,'Commercial Cleaning','Office cleaning, Retail space cleaning, Restaurant cleaning, Warehouse cleaning',4),(26,'Specialized Cleaning','Carpet cleaning, Window cleaning, Floor cleaning (hardwood, tile, etc.), Air duct cleaning, High-pressure washing',4),(27,'General Pest Control','Treatment for common pests like ants, spiders, cockroaches, and rodents Routine inspections',4),(28,'Yoga ','we are providing Zumba and aerobics',10),(29,'Makeover','hd,3d makeup for bride and groom',12);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(55) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleid` int NOT NULL,
  `status` bit(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  KEY `roleid_idx` (`roleid`),
  CONSTRAINT `roleid` FOREIGN KEY (`roleid`) REFERENCES `role` (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'sneha@gmail.com','Sneha@123',2,_binary '\0'),(6,'pratik@gmail.com','Pratik@123',3,_binary ''),(7,'amit@gmail.com','Amit@123',3,_binary ''),(14,'rohan@gmail.com','Pass@123',3,_binary '\0'),(15,'abc@gmail.com','Pass@123',3,_binary ''),(16,'mahesh@gmail.com','Mahesh@123',3,_binary ''),(17,'manasi@gmail.com','Manasi@123',1,_binary ''),(18,'bakul@gmail.com','Bakul@123',3,_binary ''),(20,'arati@gmail.com','Arati@123',2,_binary ''),(21,'pratiksha@gmail.com','Pratiksha@123',3,_binary ''),(22,'omkar@gmail.com','Omkar@123',2,_binary ''),(23,'sanket@gmail.com','Sanket@123',3,_binary ''),(24,'guari@gmail.com','Guari@123',3,_binary ''),(25,'nikita@gmail.com','Nikita@123',2,_binary ''),(26,'neha@gmail.com','$2a$12$oRBIjd3a.bgtuZzpCktVlea9shhMbVi9PazRmHGATKKCPyAr2UYwK',1,_binary ''),(28,'xxxyyy@gmail.com','$2a$10$ZnDYt1SxfWEY42Pbpn8GO.aeTFZO4dxCKBcMxt.w88RWnzyZrnq9i',3,_binary ''),(29,'customer@gmail.com','Pass@123',2,_binary ''),(31,'shreyas@gmail.com','Pass@123',3,_binary ''),(32,'rupa@gmail.com','Rupa@123',3,_binary ''),(33,'shifa@gmail.com','Shifa@123',2,_binary ''),(35,'amita@gmail.com','Amit@123',3,_binary ''),(36,'shiv@gmail.com','Shiv@123',2,_binary ''),(37,'suresh@gmail.com','Suresh@123',3,_binary ''),(38,'snehal@gmail.com','Snehal@123',2,_binary ''),(39,'akankshakohakade71@gmail.com','Rigved@6611',3,_binary ''),(40,'pk@gmail.com','Pk@123',2,_binary ''),(41,'ashu23@gmail.com','Ashu@123',3,_binary ''),(42,'apu@gmail.com','Apu@123',3,_binary ''),(43,'dipa@gmail.com','Dipa@123',3,_binary '');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendors` (
  `vendor_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `fname` varchar(30) NOT NULL,
  `lname` varchar(45) NOT NULL,
  `address` varchar(200) NOT NULL,
  `email` varchar(55) NOT NULL,
  `contact_number` varchar(10) NOT NULL,
  `serviceid` int DEFAULT NULL,
  PRIMARY KEY (`vendor_id`),
  KEY `user_id` (`user_id`),
  KEY `serviceid_idx` (`serviceid`),
  CONSTRAINT `serviceid` FOREIGN KEY (`serviceid`) REFERENCES `categories` (`service_id`),
  CONSTRAINT `vendors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (1,6,'Om','abc','Pune,Gokhalenagar','pratu@gmail.com','9921908544',3),(2,7,'Amit','Lakade','Pune,Karvenagar','lakadeamit@gmail.com','8976543421',4),(3,15,'Abc','Xyz','My address','abc@gmail.com','8788062920',2),(4,16,'Mahesh','Bharati','Pune','maheshb@gmail.com','5124879654',1),(5,18,'Bakul','Joshi','Pune','bakulj@gmail.com','4125639874',4),(6,21,'Pratiksha','Wadkar','Vanhali,Kolhapur','pratikshaw@gmail.com','4523698745',5),(7,23,'Sanket','Patil','ideal colony,kothrud,pune','sanket@gmail.com','7768975415',1),(8,24,'Gauri','Durge','Shirur,Pune','guari@gmail.com','4125639874',3),(10,28,'Xxx','Yyy','pune','bakul@gmail.com','0970707097',3),(11,31,'Shreyas','P','Pune','shreyas@gmail.com','8754692125',1),(12,32,'Rupa','Kale','Nimone,Shirur','rupakale@gmail.com','4566788899',5),(13,35,'Amita','Lakade','Karvenager, Pune','amita@gmail.com','9898988585',4),(14,37,'Suresh','Patil','ideal colony,kothrud,pune','suresh@gmail.com','7768987762',10),(15,39,'Dolly','Kohakade','karegaon','akankshak@gmail.com','8856041897',10),(16,41,'Ashu','Bhogawade','Shirur,Pune','ashu23@gmail.com','7865432190',8),(17,42,'Apurva','Gaikwad','Manjari,Hadapsar','apu@gmail.com','9087654329',7),(18,43,'Dipa','Kale','Shirur,Pune','dipa@gmail.com','8976543210',7);
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ossdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-20 22:36:32
