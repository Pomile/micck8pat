"use strict";

/* eslint-disable no-undef */

import http from 'http';
import https from 'https';
import dotenv from 'dotenv';
import app from '../app';
import db from '../database/models'



dotenv.config();
const httpServer = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (typeof port === 'number' && port >= 0) {
    // named pipe
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3009');
app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = async () => {
    console.log("ENV: "+ process.env.NODE_ENV);
    console.log("Service: Auth")
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    console.log(`Server is listening on port ${port} `);
  }
    try {
    // await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
}

httpServer.listen(port);
httpServer.on('error', onError);
httpServer.on('listening', onListening);
