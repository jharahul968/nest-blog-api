import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        const errorResponse = e.getResponse();
        const message = errorResponse['message'];
        throw new UnprocessableEntityException(this.handleError(message));
      }
    }
  }

  private handleError(errors) {
    return errors.map((error) => error);
  }
}
