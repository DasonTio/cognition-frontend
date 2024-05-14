import { fireStore } from "@/app/firebase";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

interface UseFirestoreResult {
  data: FirestoreData[];
  loading: boolean;
  error: Error | null;
}

interface FirestoreData {
  id: string;
  data: any;
}

export const useFirestore = (col: string): UseFirestoreResult => {
  const [data, setData] = useState<FirestoreData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(fireStore, col),
      (snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setData(fetchedData);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [col]);

  return { data, loading, error };
};

interface UseFirestoreDetailResult {
  data: FirestoreData;
  loading: boolean;
  error: Error | null;
}

export const useFirestoreDetail = (
  col: string,
  docId: string
): UseFirestoreDetailResult => {
  const [data, setData] = useState<FirestoreData>({} as FirestoreData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(collection(fireStore, col), docId),
      (snapshot) => {
        setData({
          id: snapshot.id,
          data: snapshot.data(),
        });
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [col]);

  return { data, loading, error };
};
