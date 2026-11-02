'use client';

import { useEffect } from 'react';

/**
 * 問い合わせの流入元を記録する。
 *
 * 2026-11-02: 屋内LPのフォーム送信は Netlify が referrer を自動で記録していたため、
 * 後から「どのキャンペーン由来か」を特定できた（リッツ・カールトン福岡の相談が
 * 屋内キャンペーン 24247049403 由来だと判明したのはこの記録のおかげ）。
 * 一方、本体サイトの /api/contact は IP しか記録しておらず、広告費の約6割を使う
 * 主力キャンペーン由来の問い合わせを、後から広告由来と判別する手段が無かった。
 *
 * 本体サイトはトップ →/contact と移動するため、送信時の document.referrer は
 * 自サイト内のページになる。着地した時点でパラメータを拾っておく必要がある。
 *
 * 保存は sessionStorage（その訪問のあいだだけ）。
 * 広告クリックの識別子を端末に長く残さないため、意図的に訪問単位にしている。
 * 「広告で着地 → 見て回る → 問い合わせ」という同一訪問内の流れは拾える。
 * 日をまたいで戻ってきた場合は拾えないが、その分を取るには保存期間の延長と
 * プライバシーポリシーの見直しが必要になるため、ここでは行わない。
 */

const STORAGE_KEY = 'mrs_attr';

/** 広告・計測の流入元として拾うクエリパラメータ */
const TRACKED_PARAMS = [
  'gclid',
  'gbraid',
  'wbraid',
  'gad_source',
  'gad_campaignid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'msclkid',
  'fbclid',
] as const;

/** 1項目あたりの保存上限。/api/contact 側の 5000 文字制限に余裕を持って収める */
const MAX_VALUE_LENGTH = 500;

export type AdAttributionRecord = {
  /** 着地時のクエリパラメータ（拾えたものだけ） */
  params: Record<string, string>;
  /** 外部サイトからの参照元。自サイト内や空の場合は undefined */
  referrer?: string;
  /** 着地したページのパス */
  landing: string;
  /** 記録した時刻（ISO8601） */
  at: string;
};

function truncate(text: string) {
  return text.length > MAX_VALUE_LENGTH ? text.slice(0, MAX_VALUE_LENGTH) : text;
}

/**
 * 保存済みの流入元を読む。保存が無い・壊れている・sessionStorage が使えない場合は null。
 * 問い合わせ送信時に呼ぶ。
 */
export function readAdAttribution(): AdAttributionRecord | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return null;
    const record = parsed as AdAttributionRecord;
    if (typeof record.landing !== 'string' || typeof record.at !== 'string') return null;
    if (!record.params || typeof record.params !== 'object') return null;
    return record;
  } catch {
    // JSON が壊れている、または sessionStorage が使えない（プライベートモード等）
    return null;
  }
}

/**
 * 流入元を人が読める1行にする。通知メールに載せる用。
 * 問い合わせが来なかった場合に備えて、判定できない理由も文字にする。
 */
export function formatAdAttribution(record: AdAttributionRecord | null): string {
  if (!record) return '記録なし';

  const parts: string[] = [];
  const { params, referrer, landing } = record;

  if (params.gclid || params.gbraid || params.wbraid) {
    parts.push('Google広告');
  } else if (params.msclkid) {
    parts.push('Microsoft広告');
  } else if (params.fbclid) {
    parts.push('Meta広告');
  } else if (params.utm_source) {
    parts.push(`utm_source=${params.utm_source}`);
  } else if (referrer) {
    parts.push(`参照元 ${referrer}`);
  } else {
    parts.push('直接流入（広告パラメータなし）');
  }

  if (params.gad_campaignid) parts.push(`キャンペーンID ${params.gad_campaignid}`);
  if (params.utm_campaign) parts.push(`utm_campaign=${params.utm_campaign}`);
  if (params.utm_medium) parts.push(`utm_medium=${params.utm_medium}`);
  if (params.utm_term) parts.push(`検索語 ${params.utm_term}`);
  parts.push(`着地 ${landing}`);

  return parts.join(' / ');
}

/**
 * 着地時の流入元を拾って保存する。保存したレコード、または保存しなかった理由を返す。
 * 副作用は sessionStorage への書き込みだけなので、テストから直接呼べる。
 */
export function captureAdAttribution(): AdAttributionRecord | null {
  let existing: string | null = null;
  try {
    existing = window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    // sessionStorage が使えない環境。記録はあきらめる（問い合わせ自体には影響しない）
    return null;
  }

  // first-touch を優先する。トップで広告パラメータを拾ったあと /contact へ移動しても、
  // そこで上書きして流入元を失わないようにする。
  if (existing) return null;

  const params: Record<string, string> = {};
  try {
    const search = new URLSearchParams(window.location.search);
    for (const key of TRACKED_PARAMS) {
      const found = search.get(key);
      if (found) params[key] = truncate(found);
    }
  } catch {
    // クエリが壊れている場合はパラメータ無しとして続ける
  }

  let referrer: string | undefined;
  const raw = document.referrer;
  if (raw && !raw.startsWith(window.location.origin)) {
    referrer = truncate(raw);
  }

  // 拾えるものが何も無い訪問は記録しない。
  // ただしこの判定のせいで、後から広告パラメータ付きで着地し直したときに
  // 上書きできるようにもなる（記録が無いままなので first-touch 判定を通る）。
  if (Object.keys(params).length === 0 && !referrer) return null;

  const record: AdAttributionRecord = {
    params,
    referrer,
    landing: truncate(window.location.pathname),
    at: new Date().toISOString(),
  };

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // 保存できなくても問い合わせ自体は成立させる
    return null;
  }

  return record;
}

export default function AdAttribution() {
  useEffect(() => {
    captureAdAttribution();
  }, []);

  return null;
}
