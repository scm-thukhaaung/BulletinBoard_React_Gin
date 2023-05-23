package userDao

import "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"

type UserDaoInterface interface {
	FindOne(userId int) models.User
	FindAll() []models.User
	Create(user models.User)
	Update(user models.User)
	Delete(userId int)
}
