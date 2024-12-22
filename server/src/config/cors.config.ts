import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const corsOptions: CorsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders:
    'Authorization, Origin, X-Requested-With, Content-Type, Accept',
  credentials: true,
};
export default corsOptions;
