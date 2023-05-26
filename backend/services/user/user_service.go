package userServices

import (
	"github.com/gin-gonic/gin"
	dao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/user"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	utilSvc "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/utils"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type UserService struct {
	UserDaoInterface dao.UserDaoInterface
}

// Create implements UserServiceInterface.
func (service *UserService) Create(user request.UserRequest, ctx *gin.Context) {
	parsedDob := utilSvc.ChangeTimeType(user.Date_Of_Birth)
	userModel := models.User{
		Name:            user.Name,
		Email:           user.Email,
		Password:        user.Password,
		Profile_Photo:   user.Profile_Photo,
		Type:            user.Type,
		Phone:           user.Phone,
		Address:         user.Address,
		Date_Of_Birth:   parsedDob,
		Created_User_ID: uint(user.Created_User_ID),
		Updated_User_ID: uint(user.Created_User_ID),
	}

	service.UserDaoInterface.Create(userModel, ctx)
}

func (service *UserService) CreateCsvUsers(csvUsers request.CsvUserRequest, ctx *gin.Context) []models.User {
	var userList []models.User

	for _, eachUser := range csvUsers.Users {

		parsedDob := utilSvc.ChangeTimeType(eachUser.Date_Of_Birth)
		userModel := models.User{
			Name:            eachUser.Name,
			Email:           eachUser.Email,
			Password:        eachUser.Password,
			Profile_Photo:   eachUser.Profile_Photo,
			Type:            eachUser.Type,
			Phone:           eachUser.Phone,
			Address:         eachUser.Address,
			Date_Of_Birth:   parsedDob,
			Created_User_ID: uint(eachUser.Created_User_ID),
			Updated_User_ID: uint(eachUser.Created_User_ID),
		}
		userList = append(userList, userModel)
	}

	errUsers := service.UserDaoInterface.AddCsvUsers(userList, ctx)
	return errUsers
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

// Update implements UserServiceInterface.
func (service *UserService) Update(user request.UserRequest, userId string, ctx *gin.Context) models.User {
	parsedDob := utilSvc.ChangeTimeType(user.Date_Of_Birth)
	userModel := models.User{
		Name:            user.Name,
		Email:           user.Email,
		Password:        user.Password,
		Profile_Photo:   user.Profile_Photo,
		Type:            user.Type,
		Phone:           user.Phone,
		Address:         user.Address,
		Date_Of_Birth:   parsedDob,
		Updated_User_ID: uint(user.Updated_User_ID),
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
