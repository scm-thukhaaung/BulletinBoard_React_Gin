package main

import (
	_ "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/docs"

	"github.com/gin-gonic/gin"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/initializers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/routes"
	swaggerFiles "github.com/swaggo/files"     // swagger embed files
	ginSwagger "github.com/swaggo/gin-swagger" // gin-swagger middleware
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

//	@title			Bulletin Board API
//	@version		1.0
//	@description	Bulletin Board Service API in Go using Gin Frameworl

//	@host		localhost:3000
//	@BasePath	/api
func main() {
	// programmatically set swagger info
	// docs.SwaggerInfo.Title = "BulletinBoard API"
	// docs.SwaggerInfo.Description = "BulletinBoard."
	// docs.SwaggerInfo.Version = "1.0"
	// docs.SwaggerInfo.Host = "localhost:3000"
	// docs.SwaggerInfo.BasePath = "/api"
	// docs.SwaggerInfo.Schemes = []string{"http", "https"}

	gin.ForceConsoleColor()
	router := gin.Default()

	routes.ApiRouter(router)
	// routes.WebRouter(router)

	//	Adding Swagger
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	router.Run(":3000")
}
