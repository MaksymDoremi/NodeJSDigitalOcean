use WA;

create table Uzivatel
(
	ID int not null auto_increment,
	Username varchar(64) not null,
	Password varchar(64) not null,
	Primary Key(ID),
	Unique (Username),
	Check (CHAR_LENGTH(Password) >= 8 and CHAR_LENGTH(Username) > 3) 
);