package userServices

import (
	"time"

	"github.com/gin-gonic/gin"
	dao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/user"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type UserService struct {
	UserDaoInterface dao.UserDaoInterface
}

// FindAll implements UserServiceInterface.
func (service *UserService) FindAll(ctx *gin.Context) []models.User {
	data := service.UserDaoInterface.FindAll(ctx)

	return data
}

// FindOne implements UserServiceInterface.
func (service *UserService) FindOne(userId string, ctx *gin.Context) models.User {
	data := service.UserDaoInterface.FindOne(userId, ctx)

	return data
}

// Create implements UserServiceInterface.
func (service *UserService) Create(user request.CreateUserRequest, ctx *gin.Context) {
	dob, _ := time.Parse("2006-01-02", user.Date_Of_Birth)
	userModel := models.User{
		Name:            user.Name,
		Email:           user.Email,
		Password:        user.Password,
		Profile_Photo:   user.Profile_Photo,
		Type:            user.Type,
		Phone:           user.Phone,
		Address:         user.Address,
		Date_Of_Birth:   dob,
		Created_User_ID: uint(user.Created_User_ID),
	}

	service.UserDaoInterface.Create(userModel, ctx)
}

// Update implements UserServiceInterface.
func (service *UserService) Update(user request.UpdateUserRequest, userId string, ctx *gin.Context) models.User {
	dob, _ := time.Parse("2006-01-02", user.Date_Of_Birth)
	userModel := models.User{
		Name:            user.Name,
		Email:           user.Email,
		Password:        user.Password,
		Profile_Photo:   user.Profile_Photo,
		Type:            user.Type,
		Phone:           user.Phone,
		Address:         user.Address,
		Date_Of_Birth:   dob,
		Updated_User_ID: user.Updated_User_ID,
	}
	data := service.UserDaoInterface.Update(userModel, userId, ctx)

	return data
}

// Delete implements UserServiceInterface.
func (service *UserService) Delete(userId string, ctx *gin.Context) {
	service.UserDaoInterface.Delete(userId, ctx)
}

func NewUserService(UserDaoInterface dao.UserDaoInterface) UserServiceInterface {
	return &UserService{
		UserDaoInterface: UserDaoInterface,
	}
}
