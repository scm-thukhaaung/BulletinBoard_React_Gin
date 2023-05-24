package loginServices

import (
	"os"
	"time"

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
	Email string `json:"email"`
	Name  string `json:"name"`
	jwt.StandardClaims
}


// Create implements PostServiceInterface.
func (service *LoginService) Authenticate(user request.LoginRequest, ctx *gin.Context) interface{} {
	email := user.Email
	password := user.Password

	userData := service.LoginDaoInterface.Login(email, password, ctx)
	if userData.ID != 0 {
		token, _ := GenerateToken(email, userData.Name)
		retData := models.LoginUser{
			User:  userData,
			Token: token,
		}
		return retData
	} else {
		return struct{}{}
	}
}

func GenerateToken(email string, name string) (string, error) {
	// Set the expiration time for the token (1 day)
	expirationTime := time.Now().Add(time.Hour * 24)

	// Create the claims containing the Email and expiration time
	claims := &Claims{
		Email: email,
		Name:  name,
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
