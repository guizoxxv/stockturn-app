import { Upload } from './upload.interface';
import { Pagination } from './pagination.interface';

export interface GetUploadsResponse extends Pagination {
  data: Upload[],
}