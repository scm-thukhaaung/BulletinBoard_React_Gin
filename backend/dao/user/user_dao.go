package userDao

import (
	"github.com/gin-gonic/gin"
	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/initializers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"gorm.io/gorm"
)

type UserDao struct {
	DB *gorm.DB
}

// FindAll implements UserDaoInterface.
func (userDao *UserDao) FindAll(ctx *gin.Context) []models.User {
	var users []models.User
	result := userDao.DB.Preload("Post").Find(&users)
	helper.ErrorPanic(result.Error, ctx)
	return users
}

// FindOne implements UserDaoInterface.
func (userDao *UserDao) FindOne(userId string, ctx *gin.Context) models.User {
	var user models.User
	result := userDao.DB.Preload("Post").First(&user, userId)
	helper.ErrorPanic(result.Error, ctx)
	return user
}

// Create implements UserDaoInterface.
func (userDao *UserDao) Create(user models.User, ctx *gin.Context) {
	result := userDao.DB.Create(&user)
	helper.ErrorPanic(result.Error, ctx)
}

// Update implements UserDaoInterface.
func (userDao *UserDao) Update(user models.User, userId string, ctx *gin.Context) models.User {
	result := userDao.DB.Model(&user).Where("id = ?", userId).Updates(user)
	helper.ErrorPanic(result.Error, ctx)
	result = userDao.DB.First(&user, userId)
	helper.ErrorPanic(result.Error, ctx)
	return user
}

// Delete implements UserDaoInterface.
func (userDao *UserDao) Delete(userId string, ctx *gin.Context) {
	var user models.User

	// soft delete
	result := userDao.DB.Where("created_user_id = ?", userId).Delete(&models.Post{})
	helper.ErrorPanic(result.Error, ctx)
	result = initializers.DB.Delete(&user, userId)
	helper.ErrorPanic(result.Error, ctx)
	// user.ID = uint(userId)
	/* result := userDao.DB.Where("id = ?", userId).Delete(&user) */
	// result := userDao.DB.Unscoped().Model(&user).Association("Post").Unscoped().Clear()
	// helper.ErrorPanic(result.Error, ctx)
	// userDao.DB.Unscoped().Delete(&user)
}

func NewUserDao(DB *gorm.DB) UserDaoInterface {
	return &UserDao{DB: DB}
}
