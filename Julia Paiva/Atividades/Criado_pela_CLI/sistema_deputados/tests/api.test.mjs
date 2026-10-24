import { test } from "node:test";
import assert from "node:assert/strict";
import { listDeputies, getDeputy, request } from "../src/services/api.mjs";
// Respostas sintéticas somente para testes automatizados.
test("percorre páginas e remove duplicados", async () => {
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return {
      ok: true,
      json: async () => ({
        dados: calls === 1 ? [{ id: 1 }] : [{ id: 1 }, { id: 2 }],
        links: calls === 1 ? [{ rel: "next" }] : [],
      }),
    };
  };
  try {
    assert.deepEqual(
      (await listDeputies("teste-paginacao")).map((d) => d.id),
      [1, 2],
    );
    assert.equal(calls, 2);
  } finally {
    globalThis.fetch = original;
  }
});
test("rejeita ID inválido", async () =>
  assert.rejects(() => getDeputy("abc"), /inválido/));
test("trata erro HTTP", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: false, status: 503 });
  try {
    await assert.rejects(() => request("/teste-erro"), /503/);
  } finally {
    globalThis.fetch = original;
  }
});
test("rejeita formato inválido", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => ({
    ok: true,
    json: async () => ({ outro: [] }),
  });
  try {
    await assert.rejects(() => request("/teste-contrato"), /inesperado/);
  } finally {
    globalThis.fetch = original;
  }
});
