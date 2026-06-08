import type {
  ActivityLogAction,
  ActivityLogEntity,
} from "@portofolio/constants";
import { db } from "@portofolio/db/client";
import { activityLog } from "@portofolio/db/schema/index";
import { QueryError } from '@portofolio/errors';
import { insertReturning } from './utils/returning';

interface CreateActivityLogParams {
  action: ActivityLogAction;
  entity: ActivityLogEntity;
  entityId: string;
  entityTitle: string;
}

export async function createActivityLog(
  params: CreateActivityLogParams,
): Promise<void> {
  const row = await insertReturning(db, activityLog, params);

  if (!row) throw new QueryError("Failed to create activity log entry");
}

export async function getRecentActivity(limit = 20) {
  return db.query.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    limit,
  });
}
