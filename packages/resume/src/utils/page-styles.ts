const CM_TO_PT = 28.346;
const cm = (v: number) => v * CM_TO_PT;

export const PAGE_MARGINS = {
  assignmentLetter: {
    paddingTop: cm(0.25),
    paddingBottom: cm(1.43),
    paddingLeft: cm(2.54),
    paddingRight: cm(1.75),
  },
  atsCompact: {
    paddingTop: cm(0.3),
    paddingBottom: cm(0.4),
    paddingLeft: cm(1.6),
    paddingRight: cm(1.6),
  },
} as const satisfies Record<string, Record<string, number>>;
