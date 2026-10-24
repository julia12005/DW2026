const BASE = "https://dadosabertos.camara.leg.br/api/v2";
const cache = new Map();
export async function request(path, params = {}, signal) {
  const url = new URL(BASE + path);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value != null) url.searchParams.set(key, value);
  });
  const previous = cache.get(url.href);
  if (previous && Date.now() - previous.time < 300000) return previous.value;
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  signal?.addEventListener("abort", abort, { once: true });
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, 20000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!response.ok)
      throw new Error(
        `A API da Câmara retornou HTTP ${response.status}. Tente novamente.`,
      );
    const json = await response.json();
    if (!Object.hasOwn(json, "dados"))
      throw new Error("Formato inesperado na resposta da API.");
    cache.set(url.href, { time: Date.now(), value: json });
    return json;
  } catch (error) {
    if (timedOut)
      throw new Error("A API demorou para responder. Tente novamente.");
    if (error.name === "AbortError") throw error;
    if (error instanceof TypeError)
      throw new Error(
        "Não foi possível acessar a Câmara. Verifique sua conexão e tente novamente.",
      );
    throw error;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
  }
}
export async function listDeputies(nome = "", signal) {
  const rows = [];
  for (let page = 1; page <= 200; page++) {
    const json = await request(
      "/deputados",
      {
        nome: nome.trim(),
        itens: 100,
        pagina: page,
        ordem: "ASC",
        ordenarPor: "nome",
      },
      signal,
    );
    if (!Array.isArray(json.dados))
      throw new Error("A API não retornou uma lista válida.");
    rows.push(...json.dados);
    if (!(json.links || []).some((link) => link.rel === "next"))
      return [...new Map(rows.map((d) => [d.id, d])).values()];
  }
  throw new Error("Limite de segurança da paginação atingido.");
}
export async function getDeputy(id, signal) {
  if (!/^\d+$/.test(String(id))) throw new Error("Identificador inválido.");
  const json = await request(`/deputados/${id}`, {}, signal);
  if (
    !json.dados ||
    Array.isArray(json.dados) ||
    typeof json.dados !== "object"
  )
    throw new Error("Detalhes indisponíveis.");
  return json.dados;
}
