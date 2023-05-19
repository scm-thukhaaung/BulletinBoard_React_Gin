package services

import (
	"time"

	dao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/user"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type UserService struct {
	UserDaoInterface dao.UserDaoInterface
}

// Create implements UserServiceInterface.
func (service *UserService) Create(user request.CreateUserRequest) {
	// panic("unimplemented")
	// data := service.UserDaoInterface.Create()
	dob, _ := time.Parse("2006-01-02 15:04", user.Date_Of_Birth)
	userModel := models.User{
		Name:          user.Name,
		Email:         user.Email,
		Password:      user.Password,
		Profile_Photo: user.Profile_Photo,
		Type:          user.Type,
		Phone:         user.Phone,
		Address:       user.Address,
		Date_Of_Birth: dob,
		// Created_User_ID: user.Created_User_ID,
	}

	service.UserDaoInterface.Create(userModel)
}

// FinAll implements UserServiceInterface.
func (service *UserService) FindAll() []models.User {
	// panic("unimplemented")
	data := service.UserDaoInterface.FindAll()

	return data
}

func NewUserService(UserDaoInterface dao.UserDaoInterface) UserServiceInterface {
	return &UserService{
		UserDaoInterface: UserDaoInterface,
	}
}
