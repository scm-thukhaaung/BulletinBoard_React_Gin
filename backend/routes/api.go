package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/controllers"
	postDao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/post"
	userDao "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/dao/user"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/initializers"
	postServices "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/post"
	userServices "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/services/user"
)

func ApiRouter(router *gin.Engine) *gin.RouterGroup {

	apiRouter := router.Group("/api")

	userDao := userDao.NewUserDao(initializers.DB)
	userService := userServices.NewUserService(userDao)
	userController := controllers.NewUserController(userService)

	userRouter := apiRouter.Group("/users")
	{
		userRouter.GET("", userController.FindAll)
		userRouter.POST("", userController.Create)
		userRouter.GET("/:userId", userController.FindOne)
		userRouter.PATCH("/:userId", userController.Update)
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
		postRouter.PATCH("/:postId", postController.Update)
		postRouter.DELETE("/:postId", postController.Delete)
	}

	return &router.RouterGroup
}
