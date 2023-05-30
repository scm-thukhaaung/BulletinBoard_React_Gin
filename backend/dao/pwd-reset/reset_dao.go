package resetPwdDao

import (
	"github.com/gin-gonic/gin"
	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/initializers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"gorm.io/gorm"
)

type ResetPwdDao struct {
	DB *gorm.DB
}

func (resetPwdDao *ResetPwdDao) SearchByMail(email string, ctx *gin.Context) models.User {
	var user models.User
	result := initializers.DB.Where("email = ?", email).First(&user)
	helper.ErrorPanic(result.Error, ctx)
	return user
}


func NewResetPwdDao(DB *gorm.DB) ResetPwdDaoInterface {
	return &ResetPwdDao{DB: DB}
}
