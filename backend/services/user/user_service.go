package userServices

import (
	"encoding/base64"
	"os"

	"github.com/gin-gonic/gin"
	dao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/user"
	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	utilSvc "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/utils"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type UserService struct {
	UserDaoInterface dao.UserDaoInterface
}

// Create implements UserServiceInterface.
func (service *UserService) Create(user request.UserRequest, ctx *gin.Context) models.User {
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

	data := service.UserDaoInterface.Create(userModel, ctx)
	return data
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

	imageData := user.Profile_Photo

	// Decode the base64 image data into binary data
	imageBytes, err := base64.StdEncoding.DecodeString(imageData)
	if err != nil {
		helper.ErrorPanic(err, ctx)
	}

	folderPath := "C:/Users/thukhaaung/Desktop/Go/src/github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/assets/img"
	imgFileName := userId + ".png"

	// Create a new file in the folder
	filePath := folderPath + imgFileName
	file, err := os.OpenFile(filePath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0644)
	if err != nil {
		helper.ErrorPanic(err, ctx)
	}
	defer file.Close()

	// Write the binary data to the file
	_, err = file.Write(imageBytes)
	if err != nil {
		helper.ErrorPanic(err, ctx)
	}

	userModel := models.User{
		Name:            user.Name,
		Email:           user.Email,
		Password:        user.Password,
		Profile_Photo:   "img" + imgFileName,
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
