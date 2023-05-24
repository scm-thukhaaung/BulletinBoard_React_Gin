package loginDao

import (
	"github.com/gin-gonic/gin"
	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/initializers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"gorm.io/gorm"
)

type LoginDao struct {
	DB *gorm.DB
}

func NewAuthDao(DB *gorm.DB) LoginDaoInterface {
	return &LoginDao{DB: DB}
}

func (loginDao *LoginDao) Login(email string, password string, ctx *gin.Context) models.User {
	var user models.User
	result := initializers.DB.Where("email = ? AND password = ?", email, password).First(&user)
	helper.ErrorPanic(result.Error, ctx)
	return user
}
