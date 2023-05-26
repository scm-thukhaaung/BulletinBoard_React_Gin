package middlewares

import (
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	constants "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/consts"
	userDao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/user"
	helper "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/helpers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/initializers"
	utilSvc "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/utils"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		tokenString := ctx.GetHeader("Authorization")

		if tokenString == "" {
			helper.ErrorPanic(constants.TokenNotProvided, ctx)
			return
		}

		token := utilSvc.ParseToken(tokenString, ctx)

		// Extract JWT token
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			// Extract the userId from the claims
			userId := claims["id"].(string)

			userDao := userDao.NewUserDao(initializers.DB)
			user := userDao.FindOne(userId, ctx)
			isSensRoute := isSensRoute(ctx)

			// Only admin is allowed to delete user and member is allowed self updating
			if user.Type != constants.ADMIN_TYPE_VAL && isSensRoute {
				userId := ctx.Param("id")
				method := ctx.Request.Method
				if method == "DELETE" ||
					method == "PUT" && strconv.Itoa(int(user.ID)) != userId {
					helper.ErrorPanic(constants.NoPermission, ctx)
					return
				}
			}

		} else {
			helper.ErrorPanic(constants.NotValidToken, ctx)
			return
		}

		// Token is valid, continue to the next middleware or handler
		ctx.Next()
	}
}

func isSensRoute(ctx *gin.Context) bool {
	route := strings.TrimSuffix(ctx.FullPath(), "/")
	pattern := "/api/users/:id"
	return route == pattern
}
