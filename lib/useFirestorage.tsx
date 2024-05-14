import { fireStorage } from "@/app/firebase";
import {
  getDownloadURL,
  listAll,
  ref,
  StorageReference,
} from "firebase/storage";
import { useEffect, useState } from "react";

type FetchFilesFn = () => Promise<StorageReference[]>;

interface UseFirebaseFilesResult {
  files: string[];
  loading: boolean;
  error: Error | null;
}

export const useFirestorage = (
  fetchFilesFn: FetchFilesFn
): UseFirebaseFilesResult => {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fileRefs = await fetchFilesFn();
        const urls = await Promise.all(
          fileRefs.map(async (file) => {
            const url = await getDownloadURL(file);
            return url;
          })
        );
        setFiles(urls);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [fetchFilesFn]);

  return { files, loading, error };
};

export const getAllFiles = async () => {
  const listRef = ref(fireStorage);
  const all = await listAll(listRef).then((res) => res.items);
  return all;
};
