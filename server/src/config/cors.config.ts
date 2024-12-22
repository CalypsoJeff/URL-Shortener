import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const corsOptions: CorsOptions = {
  origin: 'https://url-shortener-seven-tan.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders:
    'Authorization, Origin, X-Requested-With, Content-Type, Accept',
  credentials: true,
};
export default corsOptions;
