export function slugify(text = "") {
  return text
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .trim();
}

export function ensureSlug(entity) {
  if (!entity) return "";
  if (typeof entity === "string") {
    return entity || "";
  }
  return entity.slug || slugify(entity.title || "");
}
