package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/controllers"
	loginDao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/login"
	postDao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/post"
	userDao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/user"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/initializers"
	loginServices "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/login"
	postServices "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/post"
	userServices "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/user"
	swaggerFiles "github.com/swaggo/files"     // swagger embed files
	ginSwagger "github.com/swaggo/gin-swagger" // gin-swagger middleware
)

func ApiRouter(router *gin.Engine) *gin.RouterGroup {
	//	Adding Swagger
	apiRouter := router.Group("/api")
	apiRouter.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	loginDao := loginDao.NewAuthDao(initializers.DB)
	loginService := loginServices.NewLoginService(loginDao)
	loginController := controllers.NewLoginController(loginService)

	// login
	apiRouter.POST("/login", loginController.Login)

	userDao := userDao.NewUserDao(initializers.DB)
	userService := userServices.NewUserService(userDao)
	userController := controllers.NewUserController(userService)

	userRouter := apiRouter.Group("/users")
	{
		userRouter.GET("", userController.FindAll)
		userRouter.POST("", userController.Create)
		userRouter.GET("/:userId", userController.FindOne)
		userRouter.PUT("/:userId", userController.Update)
		userRouter.DELETE("/:userId", userController.Delete)
	}

	postDao := postDao.NewPostDao(initializers.DB)
	postService := postServices.NewPostService(postDao)
	postController := controllers.NewPostController(postService)

	postRouter := apiRouter.Group("/posts")
	{
		postRouter.GET("", postController.FindAll)
		postRouter.POST("", postController.Create)
		postRouter.GET("/:postId", postController.FindOne)
		postRouter.PUT("/:postId", postController.Update)
		postRouter.DELETE("/:postId", postController.Delete)
	}

	return &router.RouterGroup
}
