import { Fragment, type ReactNode } from "react";
import type { ParagraphContent } from "../page-config-types";

export function renderParagraphContent(content: ParagraphContent): ReactNode {
  if (Array.isArray(content)) {
    return content.map((part, index) => <Fragment key={index}>{part}</Fragment>);
  }

  return content;
}
