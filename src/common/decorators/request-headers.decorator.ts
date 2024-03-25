import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// TODO: revisit
export const RequestHeaders = createParamDecorator(
  async (property: string | number | symbol, context: ExecutionContext) => {
    const headers = context.switchToHttp().getRequest().headers;

    if (
      typeof property === 'string' ||
      typeof property === 'number' ||
      typeof property === 'symbol'
    ) {
      return headers[property];
    }

    return headers;
  },
);
