
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState
} from 'react';
import { Upload } from '../shared/interfaces/upload.interface';
import {
  getUploadsRequest,
  uploadCsvRequest
} from '../services/api';
import { PaginationContext } from './pagination';
import { UploadFilter } from '../shared/interfaces/uploadFilter.interface';

interface UploadContextData {
  uploads: Upload[],
  filters: UploadFilter,
  setFilters: Dispatch<SetStateAction<UploadFilter>>,
  getUploads(): void,
  uploadCsv(file: any): void,
}

export const UploadContext = createContext<UploadContextData>(
  {} as UploadContextData
);

export const UploadProvider: React.FC = ({ children }) => {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [filters, setFilters] = useState<UploadFilter>({} as UploadFilter);
  const { setPagination } = useContext(PaginationContext);

  const getUploads = useCallback(async (): Promise<void> => {
    try {
      const response = await getUploadsRequest(filters);

      const {
        data,
        current_page,
        first_page_url,
        from,
        last_page,
        last_page_url,
        links,
        next_page_url,
        path,
        per_page,
        prev_page_url,
        to,
        total,
      } = response;

      setUploads(data);
      setPagination({
        current_page,
        first_page_url,
        from,
        last_page,
        last_page_url,
        links,
        next_page_url,
        path,
        per_page,
        prev_page_url,
        to,
        total,
      });
    } catch (err) {
      console.log('Fail to get uploads');
    }
  }, [filters, setPagination]);

  const uploadCsv = useCallback(async (data: FormData): Promise<void> => {
    try {
      await uploadCsvRequest(data);
    } catch (err) {
      console.log('Fail to upload file');
    }
  }, []);

  return (
    <UploadContext.Provider
      value={{
        uploads,
        filters,
        setFilters,
        getUploads,
        uploadCsv,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};