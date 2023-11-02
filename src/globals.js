// This file is used to define const global variables which could be used inside .vue or .js files.

export const isProduction = process.env.NODE_ENV === 'production';

export const devServerURL = "http://localhost:3000/";

export const prodServerURL = "https://slava-real-estate-server.cyclic.app/";

export const apiURL = prodServerURL;