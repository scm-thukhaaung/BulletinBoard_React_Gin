package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/controllers"
	loginDao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/login"
	postDao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/post"
	resetPwdDao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/pwd-reset"
	userDao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/user"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/initializers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/middlewares"
	loginServices "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/login"
	postServices "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/post"
	resetPwdServices "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/pwd-reset"
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

	// Login
	apiRouter.POST("/login", loginController.Login)

	userDao := userDao.NewUserDao(initializers.DB)
	userService := userServices.NewUserService(userDao)
	userController := controllers.NewUserController(userService)

	// User
	userRouter := apiRouter.Group("/users")
	{
		userRouter.POST("", middlewares.AuthMiddleware(), userController.Create)
		userRouter.POST("/csv-users", middlewares.AuthMiddleware(), userController.HandleCsvUsers)
		userRouter.GET("", middlewares.AuthMiddleware(), userController.FindAll)
		userRouter.GET("/:userId", middlewares.AuthMiddleware(), userController.FindOne)
		userRouter.PUT("/:userId", middlewares.AuthMiddleware(), userController.Update)
		userRouter.DELETE("/:userId", middlewares.AuthMiddleware(), userController.Delete)
	}

	postDao := postDao.NewPostDao(initializers.DB)
	postService := postServices.NewPostService(postDao)
	postController := controllers.NewPostController(postService)

	// Post
	postRouter := apiRouter.Group("/posts")
	{
		postRouter.POST("", middlewares.AuthMiddleware(), postController.Create)
		postRouter.POST("/csv-posts", middlewares.AuthMiddleware(), postController.HandleCsvPosts)
		postRouter.GET("", postController.FindAll)
		postRouter.GET("/:postId", middlewares.AuthMiddleware(), postController.FindOne)
		postRouter.PUT("/:postId", middlewares.AuthMiddleware(), postController.Update)
		postRouter.DELETE("/:postId", middlewares.AuthMiddleware(), postController.Delete)
	}

	resetPwdDao := resetPwdDao.NewResetPwdDao(initializers.DB)
	resetPwdService := resetPwdServices.NewResetService(resetPwdDao)
	resetPwdController := controllers.NewResetPwdController(resetPwdService)

	// Reset password
	apiRouter.POST("/forget-password", resetPwdController.RequestEmail)
	apiRouter.POST("/reset-password", middlewares.AuthMiddleware(), resetPwdController.HandleResetPwd)

	return &router.RouterGroup
}
