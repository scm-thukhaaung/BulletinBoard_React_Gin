package loginServices

import (
	"os"
	"strconv"
	"time"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	loginDao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/login"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/models"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/types/request"
)

type LoginService struct {
	LoginDaoInterface loginDao.LoginDaoInterface
}

type Claims struct {
	ID string `json:"id"`
	jwt.StandardClaims
}

// Create implements PostServiceInterface.
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

		token, _ := GenerateToken(userData.ID)
		retData := models.LoginUser{
			User:  userData,
			Token: token,
		}
		return retData
	} else {
		return struct{}{}
	}
}

func GenerateToken(userId uint) (string, error) {
	// Set the expiration time for the token (1 day)
	expirationTime := time.Now().Add(time.Hour * 24)

	// Create the claims containing the Email and expiration time
	claims := &Claims{
		ID: strconv.FormatUint(uint64(userId), 10),
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))
	if err != nil {
		return "", err
	}

	return signedToken, nil
}

func NewLoginService(LoginDaoInterface loginDao.LoginDaoInterface) LoginServiceInterface {
	return &LoginService{
		LoginDaoInterface: LoginDaoInterface,
	}
}
