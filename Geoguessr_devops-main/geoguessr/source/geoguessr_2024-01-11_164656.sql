/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
DROP TABLE IF EXISTS login;
CREATE TABLE `login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS room;
CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `coordinate_x` float NOT NULL,
  `coordinate_y` float NOT NULL,
  `floor` int NOT NULL,
  `disponibility` tinyint(1) NOT NULL,
  `photo` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS scoreboard;
CREATE TABLE `scoreboard` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `score` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO login(id,username,password) VALUES('1','\'admin\'','\'admin\''),('2','\'user\'','\'user\''),('3','\'user1\'','\'user1\''),('4','\'user2\'','\'user2\''),('5','\'user3\'','\'user3\''),('6','\'user4\'','\'user4\''),('7','\'user5\'','\'user5\''),('8','\'user6\'','\'user6\''),('9','\'user7\'','\'user7\''),('10','\'user8\'','\'user8\''),('11','\'user9\'','\'user9\''),('12','\'user10\'','\'user10\''),('13','\'user11\'','\'user11\''),('14','\'user12\'','\'user12\''),('15','\'user13\'','\'user13\''),('16','\'user14\'','\'user14\''),('17','\'user15\'','\'user15\''),('18','\'user16\'','\'user16\''),('19','\'user17\'','\'user17\''),('20','\'user18\'','\'user18\''),('21','\'user19\'','\'user19\''),('22','\'user20\'','\'user20\''),('23','\'user21\'','\'user21\''),('24','\'user22\'','\'user22\''),('25','\'user23\'','\'user23\''),('26','\'user24\'','\'user24\''),('27','\'user25\'','\'user25\''),('28','\'user26\'','\'user26\''),('29','\'user27\'','\'user27\''),('30','\'user28\'','\'user28\'');

INSERT INTO room(id,name,coordinate_x,coordinate_y,floor,disponibility,photo) VALUES('1','X\'313032\'','27.3','3.5','1','1','X\'75706c6f6164732f622e706e67\''),('2','X\'796f\'','15.2','12.6','2','1','X\'75706c6f6164732f632e706e67\'');
INSERT INTO scoreboard(id,name,score) VALUES('1','X\'61646d696e\'','0'),('2','X\'75736572\'','0'),('3','X\'7573657231\'','0'),('4','X\'7573657232\'','0'),('5','X\'7573657233\'','0'),('6','X\'7573657234\'','0'),('7','X\'7573657235\'','0'),('8','X\'7573657236\'','0'),('9','X\'7573657237\'','0'),('10','X\'7573657238\'','0'),('11','X\'7573657239\'','0'),('12','X\'757365723130\'','0'),('13','X\'757365723131\'','0'),('14','X\'757365723132\'','0'),('15','X\'757365723133\'','0'),('16','X\'757365723134\'','0'),('17','X\'757365723135\'','0'),('18','X\'757365723136\'','0'),('19','X\'757365723137\'','0'),('20','X\'757365723138\'','0'),('21','X\'757365723139\'','0'),('22','X\'757365723230\'','0'),('23','X\'757365723231\'','0'),('24','X\'757365723232\'','0'),('25','X\'757365723233\'','0'),('26','X\'757365723234\'','0'),('27','X\'757365723235\'','0'),('28','X\'757365723236\'','0'),('29','X\'757365723237\'','0'),('30','X\'757365723238\'','0'),('33','X\'74657374\'','50');