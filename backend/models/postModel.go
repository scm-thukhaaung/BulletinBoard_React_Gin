package models

import "gorm.io/gorm"

type Post struct {
	gorm.Model

	Title           string `gorm:"type:varchar(255);unique;not null;"`
	Description     string `gorm:"type:varchar;not null;"`
	Status          *int    `gorm:"type:int;not null;"`
	Created_User_ID int    `gorm:"type:int;not null;"`
	Updated_User_ID int    `gorm:"type:int;"`
	Deleted_User_ID int    `gorm:"type:int;"`
}
