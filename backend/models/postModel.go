package models

import "gorm.io/gorm"

type Post struct {
	gorm.Model

	Id              int    `gorm:"type:int;primary_key;not null;"`
	Title           string `gorm:"type:varchar(255);unique;not null;"`
	Description     string `gorm:"type:varchar;not null;"`
	Status          int    `gorm:"type:int;not null;"`
	Created_User_ID User   `gorm:"foreignkey:Id"`
	Updated_User_ID User   `gorm:"foreignkey:Id"`
	Deleted_User_ID User   `gorm:"foreignkey:Id"`
}
