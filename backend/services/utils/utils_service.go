package utilSvc

import (
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
)

type Claims struct {
	ID string `json:"id"`
	jwt.StandardClaims
}

func GenerateToken(userId uint, ctx *gin.Context) (string, error) {
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
		helper.ErrorPanic(err, ctx)
		return "", err
	}

	return signedToken, nil
}

func ParseToken(tokenString string, ctx *gin.Context) *jwt.Token {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Verify the signing method and return the secret key
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("INVALID SIGNNIG")
		}
		return []byte(os.Getenv("SECRET_KEY")), nil
	})

	if err != nil || !token.Valid {
		helper.ErrorPanic(err, ctx)
	}

	return token
}

func ChangeTimeType(date string) *time.Time {
	var retDate *time.Time
	parsedDob, _ := time.Parse("2006-01-02", date)
	if parsedDob.IsZero() {
		retDate = nil
	} else {
		retDate = &parsedDob
	}
	return retDate
}
