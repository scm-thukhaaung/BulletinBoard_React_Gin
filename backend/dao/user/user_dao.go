package dao

import (
	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/initializers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"gorm.io/gorm"
)

type UserDao struct {
	DB *gorm.DB
}

// Create implements UserDaoInterface.
func (userDao *UserDao) Create(user models.User) {

	result := initializers.DB.Create(&user)
	helper.ErrorPanic(result.Error)
}

// FindAll implements UserDaoInterface.
func (*UserDao) FindAll() []models.User {
	var users []models.User

	result := initializers.DB.Find(&users)
	helper.ErrorPanic(result.Error)

	return users
}

func NewUserDao(DB *gorm.DB) UserDaoInterface {
	return &UserDao{DB: DB}
}
