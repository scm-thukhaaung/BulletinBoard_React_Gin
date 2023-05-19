package dao

import "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"

type UserDaoInterface interface {
	FindAll() []models.User
	Create(user models.User)
}
