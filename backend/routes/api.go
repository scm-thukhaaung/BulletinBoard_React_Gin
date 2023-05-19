package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/controllers"
	dao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/user"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/initializers"
	services "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/user"
)

func ApiRouter(router *gin.Engine) *gin.RouterGroup {

	apiRouter := router.Group("/api")

	userDao := dao.NewUserDao(initializers.DB)
	userService := services.NewUserService(userDao)
	userController := controllers.NewUserController(userService)

	apiRouter.GET("findall", userController.FindAll)
	apiRouter.POST("create", userController.Create)

	return &router.RouterGroup
}
