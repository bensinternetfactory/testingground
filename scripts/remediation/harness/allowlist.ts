export interface AllowlistEvaluationResult {
  changedFiles: string[];
  disallowedFiles: string[];
  ok: boolean;
}

function normalizePath(filePath: string): string {
  return filePath.replace(/\\/g, "/").replace(/^\.\/+/, "");
}

export function evaluateAllowlist(
  changedFiles: string[],
  allowedFiles: string[],
): AllowlistEvaluationResult {
  const normalizedChangedFiles = [...new Set(changedFiles.map(normalizePath).filter(Boolean))];
  const allowedSet = new Set(allowedFiles.map(normalizePath));
  const disallowedFiles = normalizedChangedFiles.filter((filePath) => !allowedSet.has(filePath));

  return {
    changedFiles: normalizedChangedFiles,
    disallowedFiles,
    ok: disallowedFiles.length === 0,
  };
}
