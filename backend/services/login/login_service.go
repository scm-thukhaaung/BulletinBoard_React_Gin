package loginServices

import (
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	loginDao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/login"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	utilSvc "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/utils"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type LoginService struct {
	LoginDaoInterface loginDao.LoginDaoInterface
}


// Authenticate implements loginServiceInterface.
func (service *LoginService) Authenticate(user request.LoginRequest, ctx *gin.Context) interface{} {
	email := user.Email
	password := user.Password
	userData := service.LoginDaoInterface.Login(email, password, ctx)

	if userData.ID != 0 {

		// Prepare and save in session
		session := sessions.Default(ctx)
		session.Set("userId", userData.ID)
		session.Set("userType", userData.Type)
		session.Save()

		token, _ := utilSvc.GenerateToken(userData.ID, ctx)
		retData := models.LoginUser{
			User:  userData,
			Token: token,
		}
		return retData
	} else {
		return struct{}{}
	}
}

func NewLoginService(LoginDaoInterface loginDao.LoginDaoInterface) LoginServiceInterface {
	return &LoginService{
		LoginDaoInterface: LoginDaoInterface,
	}
}
