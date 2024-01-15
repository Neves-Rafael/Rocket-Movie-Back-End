// pm2 configuração

module.exports = {
  apps: [
    {
      name: "app",
      script: "./src/server.js",
      instance: "max",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
