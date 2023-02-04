const defaultPort = 3000;

export default () => ({
  PORT: parseInt(process.env.PORT ?? defaultPort.toString(), 10) || defaultPort,
});
