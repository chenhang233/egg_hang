-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: egg_table
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `adminuser`
--

DROP TABLE IF EXISTS `adminuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminuser` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '业务id',
  `account` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '账号',
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '密码',
  `lastLoginTime` timestamp(6) NULL DEFAULT NULL COMMENT '最后登录时间',
  `roleId` bigint NOT NULL COMMENT '角色id',
  `otherRoleIds` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminuser`
--

LOCK TABLES `adminuser` WRITE;
/*!40000 ALTER TABLE `adminuser` DISABLE KEYS */;
INSERT INTO `adminuser` VALUES (20,'13kl12cd210hi311ij522tu62cd%21st%','admin','12356',NULL,0,NULL),(23,'23uv117op215mn320rs59jh613kl%25wx%','test','12356',NULL,1,NULL),(24,'24vw123uv222tu315mn517op625wx%','test3','12356',NULL,1,NULL),(25,'7hi113kl220rs39jh621st522tu417op%','test4','123654',NULL,1,NULL);
/*!40000 ALTER TABLE `adminuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adminuserinfo`
--

DROP TABLE IF EXISTS `adminuserinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminuserinfo` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户id 主键',
  `uuid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '业务id',
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '昵称',
  `sex` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '性别',
  `phone` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '联系方式',
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '住址',
  `introduction` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '个人简介',
  `registerTime` timestamp(6) NULL DEFAULT NULL COMMENT '注册时间',
  `avatar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminuserinfo`
--

LOCK TABLES `adminuserinfo` WRITE;
/*!40000 ALTER TABLE `adminuserinfo` DISABLE KEYS */;
INSERT INTO `adminuserinfo` VALUES (20,'13kl12cd210hi311ij522tu62cd%21st%','123','男',NULL,NULL,NULL,'2022-08-01 09:47:14.000000','C:\\Users\\赵海涛\\Desktop\\egg_hang\\app\\uploads\\1659692751857'),(23,'23uv117op215mn320rs59jh613kl%25wx%',NULL,NULL,NULL,NULL,NULL,'2022-08-02 06:28:36.000000',''),(24,'24vw123uv222tu315mn517op625wx%',NULL,NULL,NULL,NULL,NULL,'2022-08-15 01:21:53.000000','https://img1.baidu.com/it/u=482361127,3010567847&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1659459600&t=297eed9ee7882554263764f96cc8ae73'),(25,'7hi113kl220rs39jh621st522tu417op%',NULL,NULL,NULL,NULL,NULL,'2022-08-15 05:19:31.000000','https://img1.baidu.com/it/u=482361127,3010567847&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1659459600&t=297eed9ee7882554263764f96cc8ae73');
/*!40000 ALTER TABLE `adminuserinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adminuserinterface`
--

DROP TABLE IF EXISTS `adminuserinterface`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminuserinterface` (
  `uuid` bigint unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户接口权限';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminuserinterface`
--

LOCK TABLES `adminuserinterface` WRITE;
/*!40000 ALTER TABLE `adminuserinterface` DISABLE KEYS */;
INSERT INTO `adminuserinterface` VALUES (0,'访问人数','/dashboard/visitNumbers'),(1,'角色信息','/roles/read'),(2,'添加角色','/roles/add'),(3,'删除角色','/roles/delete'),(4,'更新角色','/roles/update'),(5,'添加路由','/authorization/addRouter'),(6,'添加接口','/authorization/addInterface'),(7,'获取用户信息','/users/getUserInfo'),(8,'设置用户信息','/users/setUserInfo'),(9,'上传图片','/users/uploadAvatar'),(10,'获取web学习资料','/dashboard/getWebStudy'),(11,'获取菜单信息','/users/getUserMenus');
/*!40000 ALTER TABLE `adminuserinterface` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adminuserrole`
--

DROP TABLE IF EXISTS `adminuserrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminuserrole` (
  `uuid` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '业务id',
  `roleName` varchar(50) DEFAULT NULL COMMENT '角色名字',
  `routerId` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci COMMENT '路由id',
  `roleMark` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '角色描述',
  `interfaceId` longtext,
  PRIMARY KEY (`uuid`) USING BTREE,
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  UNIQUE KEY `roleName_UNIQUE` (`roleName`)
) ENGINE=InnoDB AUTO_INCREMENT=1660789575299 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='用户角色表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminuserrole`
--

LOCK TABLES `adminuserrole` WRITE;
/*!40000 ALTER TABLE `adminuserrole` DISABLE KEYS */;
INSERT INTO `adminuserrole` VALUES (0,'管理员','13kl12cd210hi311ij522tu62cd%21st%','管理员无限权限','13kl12cd210hi311ij522tu62cd%21st%'),(1,'小角色','0,1,2','啥也不是','0,1,11'),(2,'小明','0','牛牛',NULL),(3,'小白','0','测试11',NULL),(4,'32','0','23',NULL),(5,'3243','0','2334',NULL),(6,'3212','0','123',NULL),(7,'头条','0','如图',NULL),(8,'66','0','66',NULL);
/*!40000 ALTER TABLE `adminuserrole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adminuserrouter`
--

DROP TABLE IF EXISTS `adminuserrouter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminuserrouter` (
  `uuid` bigint unsigned NOT NULL COMMENT '业务id',
  `routerName` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '路由名字',
  `rootId` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '根级id',
  `parentId` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '父级id',
  `icon` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '路由图标',
  `routerSrc` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '路由路径',
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  KEY `parentId` (`parentId`) USING BTREE,
  KEY `parentId_2` (`parentId`,`uuid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='用户路由表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminuserrouter`
--

LOCK TABLES `adminuserrouter` WRITE;
/*!40000 ALTER TABLE `adminuserrouter` DISABLE KEYS */;
INSERT INTO `adminuserrouter` VALUES (0,'首页','dashboard',NULL,'PieChartOutlined',''),(1,'权限管理','Auth',NULL,'TeamOutlined',''),(2,'日历','calendar','dashboard',NULL,'dashboard/calendar'),(3,'角色管理','roles','Auth','UserOutlined','Auth/roleManage'),(4,'权限管理','interface','Auth','UnlockOutlined','Auth/permissionManage'),(5,'工作台','workbench','dashboard',NULL,'dashboard/workbench'),(6,'分析页','analyse','dashboard',NULL,'dashboard/analyse'),(7,'功能','recreation',NULL,'SlackOutlined',NULL),(8,'讨论','forum','recreation',NULL,'recreation/forum');
/*!40000 ALTER TABLE `adminuserrouter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adminuserrouterfunction`
--

DROP TABLE IF EXISTS `adminuserrouterfunction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminuserrouterfunction` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '功能id 主键',
  `uuid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '业务id',
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '功能名字',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC COMMENT='用户路由下功能表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminuserrouterfunction`
--

LOCK TABLES `adminuserrouterfunction` WRITE;
/*!40000 ALTER TABLE `adminuserrouterfunction` DISABLE KEYS */;
/*!40000 ALTER TABLE `adminuserrouterfunction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chatrecord`
--

DROP TABLE IF EXISTS `chatrecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatrecord` (
  `id` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `messageContent` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci COMMENT '消息内容',
  `messageType` tinyint DEFAULT NULL COMMENT '消息类型1文字2图片3视频4语音5混合',
  `receiveStatus` tinyint DEFAULT NULL COMMENT '接收状态 1已读2未读',
  `sendid` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '发送者id',
  `receiveid` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '接收者id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatrecord`
--

LOCK TABLES `chatrecord` WRITE;
/*!40000 ALTER TABLE `chatrecord` DISABLE KEYS */;
/*!40000 ALTER TABLE `chatrecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend` (
  `id` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `userid` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '用户id',
  `friendid` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '好友id',
  `friendNotes` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '好友备注',
  `belongid` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '所属分组id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friendgroups`
--

DROP TABLE IF EXISTS `friendgroups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friendgroups` (
  `id` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `userid` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '用户id',
  `groupName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '分组名字',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendgroups`
--

LOCK TABLES `friendgroups` WRITE;
/*!40000 ALTER TABLE `friendgroups` DISABLE KEYS */;
/*!40000 ALTER TABLE `friendgroups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupsmsgcontent`
--

DROP TABLE IF EXISTS `groupsmsgcontent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupsmsgcontent` (
  `id` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '群消息id 主键',
  `sendid` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '发送者id',
  `sendTime` timestamp(6) NULL DEFAULT NULL COMMENT '发送时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupsmsgcontent`
--

LOCK TABLES `groupsmsgcontent` WRITE;
/*!40000 ALTER TABLE `groupsmsgcontent` DISABLE KEYS */;
/*!40000 ALTER TABLE `groupsmsgcontent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupstouser`
--

DROP TABLE IF EXISTS `groupstouser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupstouser` (
  `userid` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户id 主键',
  `groupid` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '群id',
  `groupUserName` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '群内用户昵称',
  PRIMARY KEY (`userid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupstouser`
--

LOCK TABLES `groupstouser` WRITE;
/*!40000 ALTER TABLE `groupstouser` DISABLE KEYS */;
/*!40000 ALTER TABLE `groupstouser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logininfo`
--

DROP TABLE IF EXISTS `logininfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logininfo` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(45) NOT NULL,
  `loginTime` varchar(45) NOT NULL,
  `logoutTime` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='登录信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logininfo`
--

LOCK TABLES `logininfo` WRITE;
/*!40000 ALTER TABLE `logininfo` DISABLE KEYS */;
INSERT INTO `logininfo` VALUES (1,'13kl12cd210hi311ij522tu62cd%21st%','1659410543654',NULL),(3,'13kl12cd210hi311ij522tu62cd%21st%','1659411118083',NULL),(4,'13kl12cd210hi311ij522tu62cd%21st%','1659417155478',NULL),(5,'13kl12cd210hi311ij522tu62cd%21st%','1659417766110',NULL),(6,'13kl12cd210hi311ij522tu62cd%21st%','1659417840864',NULL),(7,'13kl12cd210hi311ij522tu62cd%21st%','1659421458157',NULL),(8,'23uv117op215mn320rs59jh613kl%25wx%','1659421723786',NULL),(9,'23uv117op215mn320rs59jh613kl%25wx%','1659421787119',NULL),(10,'23uv117op215mn320rs59jh613kl%25wx%','1659421837235',NULL),(11,'23uv117op215mn320rs59jh613kl%25wx%','1659421971342',NULL),(12,'23uv117op215mn320rs59jh613kl%25wx%','1659422005820',NULL),(13,'23uv117op215mn320rs59jh613kl%25wx%','1659422020577',NULL),(14,'23uv117op215mn320rs59jh613kl%25wx%','1659422040862',NULL),(15,'23uv117op215mn320rs59jh613kl%25wx%','1659422281964',NULL),(16,'23uv117op215mn320rs59jh613kl%25wx%','1659422436393',NULL),(17,'23uv117op215mn320rs59jh613kl%25wx%','1659422471567',NULL),(18,'13kl12cd210hi311ij522tu62cd%21st%','1659422487743',NULL),(19,'13kl12cd210hi311ij522tu62cd%21st%','1659423137502',NULL),(20,'13kl12cd210hi311ij522tu62cd%21st%','1659423168250',NULL),(21,'23uv117op215mn320rs59jh613kl%25wx%','1659423220914',NULL),(22,'13kl12cd210hi311ij522tu62cd%21st%','1659423329597',NULL),(23,'13kl12cd210hi311ij522tu62cd%21st%','1659423383179',NULL),(24,'23uv117op215mn320rs59jh613kl%25wx%','1659423410268',NULL),(25,'23uv117op215mn320rs59jh613kl%25wx%','1659423474313',NULL),(26,'13kl12cd210hi311ij522tu62cd%21st%','1659423486760',NULL),(27,'13kl12cd210hi311ij522tu62cd%21st%','1659423728955',NULL),(28,'23uv117op215mn320rs59jh613kl%25wx%','1659423739755',NULL),(29,'13kl12cd210hi311ij522tu62cd%21st%','1659430429035',NULL),(30,'13kl12cd210hi311ij522tu62cd%21st%','1659431123877',NULL),(31,'13kl12cd210hi311ij522tu62cd%21st%','1659433370827',NULL),(32,'13kl12cd210hi311ij522tu62cd%21st%','1659433382929',NULL),(33,'23uv117op215mn320rs59jh613kl%25wx%','1659434328309',NULL),(34,'13kl12cd210hi311ij522tu62cd%21st%','1659434661832',NULL),(35,'13kl12cd210hi311ij522tu62cd%21st%','1659494239743',NULL),(36,'13kl12cd210hi311ij522tu62cd%21st%','1659503135804',NULL),(37,'13kl12cd210hi311ij522tu62cd%21st%','1659503695040',NULL),(38,'13kl12cd210hi311ij522tu62cd%21st%','1659503713045',NULL),(39,'13kl12cd210hi311ij522tu62cd%21st%','1659503730432',NULL),(40,'13kl12cd210hi311ij522tu62cd%21st%','1659503788735',NULL),(41,'13kl12cd210hi311ij522tu62cd%21st%','1659504237444',NULL),(42,'13kl12cd210hi311ij522tu62cd%21st%','1659504421172',NULL),(43,'13kl12cd210hi311ij522tu62cd%21st%','1659504490926',NULL),(44,'13kl12cd210hi311ij522tu62cd%21st%','1659504521704',NULL),(45,'13kl12cd210hi311ij522tu62cd%21st%','1659504525919',NULL),(46,'13kl12cd210hi311ij522tu62cd%21st%','1659504568258',NULL),(47,'13kl12cd210hi311ij522tu62cd%21st%','1659504628653',NULL),(48,'23uv117op215mn320rs59jh613kl%25wx%','1659504887563',NULL),(49,'23uv117op215mn320rs59jh613kl%25wx%','1659505547513',NULL),(50,'23uv117op215mn320rs59jh613kl%25wx%','1659510125367',NULL),(51,'23uv117op215mn320rs59jh613kl%25wx%','1659513786077',NULL),(52,'13kl12cd210hi311ij522tu62cd%21st%','1659514233665',NULL),(53,'23uv117op215mn320rs59jh613kl%25wx%','1659517653685',NULL),(54,'23uv117op215mn320rs59jh613kl%25wx%','1659517744222',NULL),(55,'23uv117op215mn320rs59jh613kl%25wx%','1659518740122',NULL),(56,'23uv117op215mn320rs59jh613kl%25wx%','1659518886940',NULL),(57,'23uv117op215mn320rs59jh613kl%25wx%','1659518888389',NULL),(58,'23uv117op215mn320rs59jh613kl%25wx%','1659579086102',NULL),(59,'23uv117op215mn320rs59jh613kl%25wx%','1659579791489',NULL),(60,'23uv117op215mn320rs59jh613kl%25wx%','1659582757902',NULL),(61,'23uv117op215mn320rs59jh613kl%25wx%','1659593096747',NULL),(62,'13kl12cd210hi311ij522tu62cd%21st%','1659593704840',NULL),(63,'13kl12cd210hi311ij522tu62cd%21st%','1659599014580',NULL),(64,'13kl12cd210hi311ij522tu62cd%21st%','1659600267649',NULL),(65,'13kl12cd210hi311ij522tu62cd%21st%','1659600272520',NULL),(66,'13kl12cd210hi311ij522tu62cd%21st%','1659600284340',NULL),(67,'13kl12cd210hi311ij522tu62cd%21st%','1659604173904',NULL),(68,'13kl12cd210hi311ij522tu62cd%21st%','1659668917081',NULL),(69,'13kl12cd210hi311ij522tu62cd%21st%','1659668965132',NULL),(70,'13kl12cd210hi311ij522tu62cd%21st%','1659669167066',NULL),(71,'13kl12cd210hi311ij522tu62cd%21st%','1659669453777',NULL),(72,'13kl12cd210hi311ij522tu62cd%21st%','1659682441675',NULL),(73,'13kl12cd210hi311ij522tu62cd%21st%','1659682483655',NULL),(74,'13kl12cd210hi311ij522tu62cd%21st%','1659687801294',NULL),(75,'13kl12cd210hi311ij522tu62cd%21st%','1659691475804',NULL),(76,'23uv117op215mn320rs59jh613kl%25wx%','1659693350663',NULL),(77,'23uv117op215mn320rs59jh613kl%25wx%','1659693507793',NULL),(78,'23uv117op215mn320rs59jh613kl%25wx%','1659746429110',NULL),(79,'23uv117op215mn320rs59jh613kl%25wx%','1659941673993',NULL),(80,'13kl12cd210hi311ij522tu62cd%21st%','1659943108894',NULL),(81,'23uv117op215mn320rs59jh613kl%25wx%','1659943450073',NULL),(82,'13kl12cd210hi311ij522tu62cd%21st%','1659943801842',NULL),(83,'13kl12cd210hi311ij522tu62cd%21st%','1659943823659',NULL),(84,'13kl12cd210hi311ij522tu62cd%21st%','1659943848857',NULL),(85,'13kl12cd210hi311ij522tu62cd%21st%','1659943861148',NULL),(86,'13kl12cd210hi311ij522tu62cd%21st%','1659943956242',NULL),(87,'13kl12cd210hi311ij522tu62cd%21st%','1659944501753',NULL),(88,'13kl12cd210hi311ij522tu62cd%21st%','1659944670416',NULL),(89,'13kl12cd210hi311ij522tu62cd%21st%','1660204739876',NULL),(90,'13kl12cd210hi311ij522tu62cd%21st%','1660205724293',NULL),(91,'13kl12cd210hi311ij522tu62cd%21st%','1660205808743',NULL),(92,'13kl12cd210hi311ij522tu62cd%21st%','1660205873271',NULL),(93,'13kl12cd210hi311ij522tu62cd%21st%','1660206051457',NULL),(94,'13kl12cd210hi311ij522tu62cd%21st%','1660206092920',NULL),(95,'13kl12cd210hi311ij522tu62cd%21st%','1660289566873',NULL),(96,'13kl12cd210hi311ij522tu62cd%21st%','1660291162317',NULL),(97,'13kl12cd210hi311ij522tu62cd%21st%','1660291222223',NULL),(98,'13kl12cd210hi311ij522tu62cd%21st%','1660291289469',NULL),(99,'13kl12cd210hi311ij522tu62cd%21st%','1660291441035',NULL),(100,'13kl12cd210hi311ij522tu62cd%21st%','1660291602023',NULL),(101,'13kl12cd210hi311ij522tu62cd%21st%','1660291666827',NULL),(102,'13kl12cd210hi311ij522tu62cd%21st%','1660291784787',NULL),(103,'13kl12cd210hi311ij522tu62cd%21st%','1660291806443',NULL),(104,'13kl12cd210hi311ij522tu62cd%21st%','1660292069984',NULL),(105,'13kl12cd210hi311ij522tu62cd%21st%','1660292689448',NULL),(106,'13kl12cd210hi311ij522tu62cd%21st%','1660292748511',NULL),(107,'13kl12cd210hi311ij522tu62cd%21st%','1660292903005',NULL),(108,'13kl12cd210hi311ij522tu62cd%21st%','1660293316494',NULL),(109,'13kl12cd210hi311ij522tu62cd%21st%','1660294593572',NULL),(110,'13kl12cd210hi311ij522tu62cd%21st%','1660294712199',NULL),(111,'13kl12cd210hi311ij522tu62cd%21st%','1660295979049',NULL),(112,'13kl12cd210hi311ij522tu62cd%21st%','1660296436871',NULL),(113,'13kl12cd210hi311ij522tu62cd%21st%','1660296633723',NULL),(114,'13kl12cd210hi311ij522tu62cd%21st%','1660296709436',NULL),(115,'13kl12cd210hi311ij522tu62cd%21st%','1660296851683',NULL),(116,'13kl12cd210hi311ij522tu62cd%21st%','1660296931270',NULL),(117,'13kl12cd210hi311ij522tu62cd%21st%','1660296955151',NULL),(118,'13kl12cd210hi311ij522tu62cd%21st%','1660297082460',NULL),(119,'13kl12cd210hi311ij522tu62cd%21st%','1660526421261',NULL),(120,'13kl12cd210hi311ij522tu62cd%21st%','1660526477385',NULL),(121,'13kl12cd210hi311ij522tu62cd%21st%','1660526788874',NULL),(122,'13kl12cd210hi311ij522tu62cd%21st%','1660527018386',NULL),(123,'7hi113kl220rs39jh621st522tu417op%','1660540779519',NULL),(124,'13kl12cd210hi311ij522tu62cd%21st%','1660545886877',NULL),(125,'13kl12cd210hi311ij522tu62cd%21st%','1660557865364',NULL),(126,'13kl12cd210hi311ij522tu62cd%21st%','1660615682488',NULL),(127,'13kl12cd210hi311ij522tu62cd%21st%','1660630753504',NULL),(128,'13kl12cd210hi311ij522tu62cd%21st%','1660699603710',NULL),(129,'23uv117op215mn320rs59jh613kl%25wx%','1660700737337',NULL),(130,'13kl12cd210hi311ij522tu62cd%21st%','1660701007013',NULL),(131,'23uv117op215mn320rs59jh613kl%25wx%','1660701020982',NULL),(132,'23uv117op215mn320rs59jh613kl%25wx%','1660701072824',NULL),(133,'13kl12cd210hi311ij522tu62cd%21st%','1660701132787',NULL),(134,'13kl12cd210hi311ij522tu62cd%21st%','1660714429267',NULL),(135,'13kl12cd210hi311ij522tu62cd%21st%','1660717158401',NULL),(136,'13kl12cd210hi311ij522tu62cd%21st%','1660717226348',NULL),(137,'13kl12cd210hi311ij522tu62cd%21st%','1660717428625',NULL),(138,'13kl12cd210hi311ij522tu62cd%21st%','1660728696719',NULL),(139,'13kl12cd210hi311ij522tu62cd%21st%','1660728876352',NULL),(140,'13kl12cd210hi311ij522tu62cd%21st%','1660786346075',NULL),(141,'13kl12cd210hi311ij522tu62cd%21st%','1660786516270',NULL),(142,'13kl12cd210hi311ij522tu62cd%21st%','1660799451924',NULL),(143,'13kl12cd210hi311ij522tu62cd%21st%','1660801245263',NULL),(144,'13kl12cd210hi311ij522tu62cd%21st%','1660801455051',NULL),(145,'13kl12cd210hi311ij522tu62cd%21st%','1660801510521',NULL),(146,'13kl12cd210hi311ij522tu62cd%21st%','1660801593798',NULL),(147,'13kl12cd210hi311ij522tu62cd%21st%','1660801636165',NULL),(148,'13kl12cd210hi311ij522tu62cd%21st%','1660801715860',NULL),(149,'13kl12cd210hi311ij522tu62cd%21st%','1660801847727',NULL),(150,'13kl12cd210hi311ij522tu62cd%21st%','1660802271719',NULL),(151,'13kl12cd210hi311ij522tu62cd%21st%','1660802397010',NULL),(152,'13kl12cd210hi311ij522tu62cd%21st%','1660814909111',NULL),(153,'13kl12cd210hi311ij522tu62cd%21st%','1660872476953',NULL),(154,'13kl12cd210hi311ij522tu62cd%21st%','1660872701349',NULL),(155,'13kl12cd210hi311ij522tu62cd%21st%','1660873258414',NULL),(156,'13kl12cd210hi311ij522tu62cd%21st%','1660874114532',NULL),(157,'13kl12cd210hi311ij522tu62cd%21st%','1660886408887',NULL),(158,'13kl12cd210hi311ij522tu62cd%21st%','1660886460536',NULL),(159,'13kl12cd210hi311ij522tu62cd%21st%','1660886491705',NULL),(160,'13kl12cd210hi311ij522tu62cd%21st%','1660889039838',NULL),(161,'13kl12cd210hi311ij522tu62cd%21st%','1660901937061',NULL),(162,'13kl12cd210hi311ij522tu62cd%21st%','1660901958778',NULL);
/*!40000 ALTER TABLE `logininfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `account` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '账号',
  `password` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '密码',
  `lastLoginTime` timestamp(6) NULL DEFAULT NULL COMMENT '最后登录时间',
  `loginFailCount` tinyint DEFAULT NULL COMMENT '登录失败次数',
  `token` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT 'token',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1','admin','admin','2021-12-29 07:11:07.000000',0,NULL),('20211229163128','test','123',NULL,NULL,NULL),('9eEPx8-20211229163540','tes1t','123',NULL,NULL,NULL),('jmBiyy-20211229165309','tesadasd1t','123','2022-01-04 08:52:30.000000',0,'');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usergroup`
--

DROP TABLE IF EXISTS `usergroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usergroup` (
  `id` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '群id 主键',
  `createTime` timestamp(6) NULL DEFAULT NULL COMMENT '创建时间',
  `groupName` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '群昵称',
  `groupNotice` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '群公告',
  `groupIntroduce` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '群简介',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usergroup`
--

LOCK TABLES `usergroup` WRITE;
/*!40000 ALTER TABLE `usergroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `usergroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinfo` (
  `userid` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '用户id 主键',
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '昵称',
  `sex` varchar(4) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '性别',
  `phone` tinyint DEFAULT NULL COMMENT '联系方式',
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '住址',
  `introduction` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '个人简介',
  `status` tinyint DEFAULT NULL COMMENT '当前状态0离线1在线2隐身',
  `registerTime` timestamp(6) NULL DEFAULT NULL COMMENT '注册时间',
  PRIMARY KEY (`userid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES ('jmBiyy-20211229165309',NULL,NULL,NULL,NULL,NULL,NULL,'2021-12-29 08:53:10.000000');
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-19 18:06:34
