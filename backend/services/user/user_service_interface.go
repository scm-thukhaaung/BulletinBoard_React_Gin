package services

import (
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type UserServiceInterface interface {
	FindAll() []models.User
	Create(user request.CreateUserRequest)
}
