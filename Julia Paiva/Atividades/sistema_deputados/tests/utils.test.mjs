import { test } from "node:test";
import assert from "node:assert/strict";
import {
  filterDeputies,
  formatDate,
  safeUrl,
  toCsv,
  csvCell,
  UFS,
} from "../src/utils.mjs";
// Dados sintéticos usados exclusivamente nos testes, nunca na aplicação.
const rows = [
  { id: 1, nome: "Teste Alfa", siglaUf: "DF", siglaPartido: "TESTE" },
  { id: 2, nome: "Teste Beta", siglaUf: "SP", siglaPartido: "OUTRO" },
];
test("filtra UF e partido", () =>
  assert.deepEqual(
    filterDeputies(rows, { uf: "DF", party: "TESTE" }).map((d) => d.id),
    [1],
  ));
test("filtra favoritos", () =>
  assert.deepEqual(
    filterDeputies(rows, { favoritesOnly: true, favorites: [2] }).map(
      (d) => d.id,
    ),
    [2],
  ));
test("ordena sem modificar entrada", () => {
  assert.equal(filterDeputies(rows, { order: "desc" })[0].id, 2);
  assert.equal(rows[0].id, 1);
});
test("formata data e ausência", () => {
  assert.equal(formatDate("2000-01-02"), "02/01/2000");
  assert.equal(formatDate(null), "Não informado");
});
test("bloqueia URL insegura", () => {
  assert.equal(safeUrl("javascript:alert(1)"), null);
  assert.equal(safeUrl("https://example.com"), "https://example.com/");
});
test("escapa aspas CSV", () => assert.equal(csvCell('a"b'), '"a""b"'));
test("neutraliza fórmula CSV", () =>
  assert.ok(csvCell("=1+1").startsWith("\"'")));
test("CSV inclui BOM", () => assert.ok(toCsv(rows).startsWith("\uFEFF")));
test("27 UFs sem repetição", () => {
  assert.equal(UFS.length, 27);
  assert.equal(new Set(UFS).size, 27);
});
