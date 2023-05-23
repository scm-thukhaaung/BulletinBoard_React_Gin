package userServices

import (
	"time"

	dao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/user"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type UserService struct {
	UserDaoInterface dao.UserDaoInterface
}

// Delete implements UserServiceInterface.
func (service *UserService) Delete(userId int) {
	service.UserDaoInterface.Delete(userId)
}

// Update implements UserServiceInterface.
func (service *UserService) Update(user request.UpdateUserRequest) {
	data := service.UserDaoInterface.FindOne(user.Id)

	if user.Name != "" {
		data.Name = user.Name
	}

	if user.Email != "" {
		data.Email = user.Email
	}

	if user.Password != "" {
		data.Password = user.Password
	}

	if user.Profile_Photo != "" {
		data.Profile_Photo = user.Profile_Photo
	}

	if user.Type != "" {
		data.Type = user.Type
	}

	if user.Phone != "" {
		data.Phone = user.Phone
	}

	if user.Address != "" {
		data.Address = user.Address
	}

	if user.Date_Of_Birth != "" {
		dob, _ := time.Parse("2006-01-02 15:04", user.Date_Of_Birth)
		data.Date_Of_Birth = dob
	}

	service.UserDaoInterface.Update(data)

}

// FindOne implements UserServiceInterface.
func (service *UserService) FindOne(userId int) models.User {
	data := service.UserDaoInterface.FindOne(userId)

	return data
}

// Create implements UserServiceInterface.
func (service *UserService) Create(user request.CreateUserRequest) {
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
	data := service.UserDaoInterface.FindAll()

	return data
}

func NewUserService(UserDaoInterface dao.UserDaoInterface) UserServiceInterface {
	return &UserService{
		UserDaoInterface: UserDaoInterface,
	}
}
