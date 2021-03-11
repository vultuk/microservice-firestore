import { Firestore as FSDB } from '@google-cloud/firestore';
import { Request } from 'express';

import { Settings } from './Types/Settings';

export * from './Types';

declare global {
  namespace Express {
    interface Request {
      firestore: FSDB;
    }
  }
}

export default (settings?: Settings) => (req: Request) => {
  const db: FSDB = new FSDB(
    settings && settings.projectId
      ? {
          projectId: settings.projectId,
          credentials: settings.credentials ? JSON.parse(settings.credentials as string) : undefined,
        }
      : undefined,
  );

  req.firestore = db;
};
