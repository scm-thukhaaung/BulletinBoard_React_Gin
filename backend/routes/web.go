package routes

import (
	"github.com/gin-gonic/gin"
)

func WebRouter(router *gin.Engine) *gin.RouterGroup {

	webRouter := router.Group("/web")

	webRouter.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"post": "Hello Web",
		})
	})

	return &router.RouterGroup
}
