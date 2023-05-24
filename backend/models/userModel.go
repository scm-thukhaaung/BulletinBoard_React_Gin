package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model

	Name            string    `gorm:"type:varchar;unique;not null;"`
	Email           string    `gorm:"type:varchar;unique;not null;"`
	Password        string    `gorm:"type:text;not null;"`
	Profile_Photo   string    `gorm:"type:varchar(255);"`
	Type            string    `gorm:"type:varchar(1);not null;"`
	Phone           string    `gorm:"type:varchar(20)"`
	Address         string    `gorm:"type:varchar(20)"`
	Date_Of_Birth   time.Time `gorm:"autoCreateTime:false"`
	Created_User_ID uint      `gorm:"type:int;not null"`
	Updated_User_ID uint      `gorm:"type:int;not null"`
	Deleted_User_ID uint      `gorm:"type:int"`
	Post            []Post    `gorm:"foreignkey:Created_User_ID"`
}

type LoginUser struct {
	User  User
	Token string
}
