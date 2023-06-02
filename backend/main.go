package main

import (
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
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
//	@description	Bulletin Board Service API in Go using Gin Framework

//	@host		localhost:8080
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
	// docs.SwaggerInfo.Host = "localhost:8080"
	// docs.SwaggerInfo.BasePath = "/api"
	// docs.SwaggerInfo.Schemes = []string{"http", "https"}

	gin.ForceConsoleColor()
	router := gin.Default()

	// Serve static files
	router.Static("/assets", "./assets")
	router.Static("/static", "./static")
	router.Use(cors.Default())
	// Initialize session
	store := cookie.NewStore([]byte(os.Getenv("SESSION_SECRET_KEY")))
	router.Use(sessions.Sessions("mysession", store))

	routes.ApiRouter(router)
	// routes.WebRouter(router)

	port := os.Getenv("PORT")
	router.Run(":" + port)
}
