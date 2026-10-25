export const UFS =
  "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(
    " ",
  );
export function safeUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
export function formatDate(value) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value || "");
  return m ? `${m[3]}/${m[2]}/${m[1]}` : "Não informado";
}
export function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
export function filterDeputies(
  rows,
  {
    uf = "",
    party = "",
    favoritesOnly = false,
    favorites = [],
    order = "asc",
  } = {},
) {
  return rows
    .filter(
      (d) =>
        (!uf || d.siglaUf === uf) &&
        (!party || d.siglaPartido === party) &&
        (!favoritesOnly || favorites.includes(d.id)),
    )
    .sort(
      (a, b) =>
        (order === "desc" ? -1 : 1) * a.nome.localeCompare(b.nome, "pt-BR"),
    );
}
export function csvCell(value) {
  let text = String(value ?? "");
  if (/^[=+@\-\t\r]/.test(text)) text = "'" + text;
  return '"' + text.replaceAll('"', '""') + '"';
}
export function toCsv(rows) {
  return (
    "\uFEFF" +
    [
      ["Nome", "Partido", "UF", "E-mail"],
      ...rows.map((d) => [d.nome, d.siglaPartido, d.siglaUf, d.email]),
    ]
      .map((row) => row.map(csvCell).join(";"))
      .join("\r\n")
  );
}
export function socialName(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Rede social";
  }
}
