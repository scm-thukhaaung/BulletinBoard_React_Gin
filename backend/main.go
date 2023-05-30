package main

import (
	"github.com/gin-contrib/cors"
	_ "github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/docs"

	"github.com/gin-gonic/gin"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/initializers"
	"github.com/scm-thukhaaung/BulletinBoard_React_Gin/backend/routes"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

//	@title			Bulletin Board API
//	@version		1.0
//	@description	Bulletin Board Service API in Go using Gin Frameworl

//	@host		localhost:3000
//	@BasePath	/
//
// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
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

	// Config for CORS
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AddAllowHeaders("authorization")
	router.Use(cors.New(config))

	routes.ApiRouter(router)
	// routes.WebRouter(router)

	router.Run(":8000")
}
