import type { ProductId } from "@/data/products";

export type CartLine = {
  productId: ProductId;
  quantity: number;
};

const STORAGE_KEY = "bfs:cart:v1";
export const CHANGE_EVT = "bfs:cart-change";
export const OPEN_EVT = "bfs:cart-open";
export const ADD_EVT = "bfs:cart-add";

const PRODUCT_IDS: ProductId[] = [
  "void-book",
  "abyssal-cardstock",
  "event-horizon-pad",
  "sticky-voids",
  "savior-pen",
  "executive-despair",
];

const EMPTY: readonly CartLine[] = Object.freeze([]) as readonly CartLine[];

let cached: readonly CartLine[] | null = null;

function isProductId(value: unknown): value is ProductId {
  return typeof value === "string" && (PRODUCT_IDS as string[]).includes(value);
}

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    isProductId(v.productId) &&
    typeof v.quantity === "number" &&
    Number.isFinite(v.quantity) &&
    v.quantity > 0
  );
}

function readFresh(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartLine);
  } catch {
    return [];
  }
}

function commit(lines: CartLine[]): void {
  cached = lines.length === 0 ? EMPTY : Object.freeze([...lines]);
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cached));
  } catch {
    // ignore quota / private-mode failures
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVT));
}

export function getCart(): readonly CartLine[] {
  if (cached === null) {
    const fresh = readFresh();
    cached = fresh.length === 0 ? EMPTY : Object.freeze(fresh);
  }
  return cached;
}

export function getServerSnapshot(): readonly CartLine[] {
  return EMPTY;
}

export function totalCount(lines: readonly CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function subtotal(
  lines: readonly CartLine[],
  priceLookup: Record<ProductId, number>
): number {
  return lines.reduce(
    (sum, line) => sum + (priceLookup[line.productId] ?? 0) * line.quantity,
    0
  );
}

export function add(
  productId: ProductId,
  productTitle?: string,
  quantity: number = 1
): void {
  if (!isProductId(productId)) return;
  const qty = Math.max(1, Math.floor(quantity));
  const lines = readFresh();
  const existing = lines.find((l) => l.productId === productId);
  if (existing) {
    existing.quantity = Math.min(99, existing.quantity + qty);
  } else {
    lines.push({ productId, quantity: Math.min(99, qty) });
  }
  commit(lines);
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(ADD_EVT, {
        detail: { productId, productTitle: productTitle ?? productId },
      })
    );
  }
}

export function setQuantity(productId: ProductId, quantity: number): void {
  if (!isProductId(productId)) return;
  const lines = readFresh();
  const idx = lines.findIndex((l) => l.productId === productId);
  if (idx < 0) return;
  if (quantity <= 0) {
    lines.splice(idx, 1);
  } else {
    lines[idx] = {
      ...lines[idx],
      quantity: Math.min(99, Math.floor(quantity)),
    };
  }
  commit(lines);
}

export function remove(productId: ProductId): void {
  if (!isProductId(productId)) return;
  const lines = readFresh().filter((l) => l.productId !== productId);
  commit(lines);
}

export function clear(): void {
  commit([]);
}

export function open(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_EVT));
}

export function subscribe(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onChange = () => cb();
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cached = null;
      cb();
    }
  };
  window.addEventListener(CHANGE_EVT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
