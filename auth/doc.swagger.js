import dotenv from 'dotenv';
dotenv.config();
export const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API",
        version: "1.0.0",
        description: "API",
        contact: {
          name: "API Support",
          email: "babatunde.ogedengbe@hotmail.com",
        },
      },
      tags: [
        {
          "name": "auth",
          "description": "Everything about authentication"
        },
        
      ],
      servers: [
        {
          "url": "http://{host}:{port}/{basePath}",
          "description": "The development API server",
          "variables": {
            "host": {
              "default": "localhost",
              "description": "development host"
            },
            "port": {
              "enum": [
                "3000",
                "443"
              ],
              "default": "3000"
            },
            "basePath": {
              "default": "api/v1"
            }
          }
        }
      ]
    },
   
    apis: ["**/*.doc.yaml"],
};
