import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	portofolioWebpageV5ProjectViews: {
		portofolioWebpageV5Project: r.one.portofolioWebpageV5Projects({
			from: r.portofolioWebpageV5ProjectViews.projectId,
			to: r.portofolioWebpageV5Projects.id
		}),
	},
	portofolioWebpageV5Projects: {
		portofolioWebpageV5ProjectViews: r.many.portofolioWebpageV5ProjectViews(),
	},
	portofolioWebpageV5Sessions: {
		portofolioWebpageV5User: r.one.portofolioWebpageV5Users({
			from: r.portofolioWebpageV5Sessions.userId,
			to: r.portofolioWebpageV5Users.id
		}),
	},
	portofolioWebpageV5Users: {
		portofolioWebpageV5Sessions: r.many.portofolioWebpageV5Sessions(),
	},
}))