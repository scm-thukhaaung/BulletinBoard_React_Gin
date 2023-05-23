package userDao

import (
	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"gorm.io/gorm"
)

type UserDao struct {
	DB *gorm.DB
}

// Delete implements UserDaoInterface.
func (userDao *UserDao) Delete(userId int) {
	var user models.User
	user.ID = uint(userId)
	/* result := userDao.DB.Where("id = ?", userId).Delete(&user) */
	result := userDao.DB.Unscoped().Model(&user).Association("Post").Unscoped().Clear()
	helper.ErrorPanic(result)
	userDao.DB.Unscoped().Delete(&user)
}

// FindOne implements UserDaoInterface.
func (userDao *UserDao) FindOne(userId int) models.User {
	var user models.User
	result := userDao.DB.Preload("Post").First(&user, userId)
	helper.ErrorPanic(result.Error)
	return user
}

// Create implements UserDaoInterface.
func (userDao *UserDao) Create(user models.User) {
	result := userDao.DB.Create(&user)
	helper.ErrorPanic(result.Error)
}

// FindAll implements UserDaoInterface.
func (userDao *UserDao) FindAll() []models.User {
	var users []models.User
	result := userDao.DB.Preload("Post").Find(&users)
	helper.ErrorPanic(result.Error)
	return users
}

// Update implements UserDaoInterface.
func (userDao *UserDao) Update(user models.User) {
	result := userDao.DB.Updates(user)
	helper.ErrorPanic(result.Error)
}

func NewUserDao(DB *gorm.DB) UserDaoInterface {
	return &UserDao{DB: DB}
}
