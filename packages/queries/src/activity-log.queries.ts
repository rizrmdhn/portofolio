import type {
  ActivityLogAction,
  ActivityLogEntity,
} from "@portofolio/constants";
import { db } from "@portofolio/db/client";
import { activityLog } from "@portofolio/db/schema/index";
import { QueryError } from '@portofolio/errors';

interface CreateActivityLogParams {
  action: ActivityLogAction;
  entity: ActivityLogEntity;
  entityId: string;
  entityTitle: string;
}

export async function createActivityLog(
  params: CreateActivityLogParams,
): Promise<void> {
  const [row] = await db
    .insert(activityLog)
    .values(params)
    .returning({ id: activityLog.id });

  if (!row) throw new QueryError("Failed to create activity log entry");
}

export async function getRecentActivity(limit = 20) {
  return db.query.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    limit,
  });
}
