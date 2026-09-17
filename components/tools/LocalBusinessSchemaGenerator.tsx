"use client";

import { analytics } from "@/lib/analytics/track";
import { useState } from "react";

export default function LocalBusinessSchemaGenerator() {
  const [name, setName] = useState("Downtown Cafe");
  const [street, setStreet] = useState("123 Main Street");
  const [city, setCity] = useState("San Francisco");
  const [region, setRegion] = useState("CA");
  const [postalCode, setPostalCode] = useState("94105");
  const [country, setCountry] = useState("US");
  const [phone, setPhone] = useState("+1-555-0199");
  const [url, setUrl] = useState("https://example.com");
  const [copied, setCopied] = useState(false);

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    ...(url ? { url } : {}),
    ...(phone ? { telephone: phone } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: city,
      addressRegion: region,
      postalCode,
      addressCountry: country,
    },
  };
  const output = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
  const valid = name.trim() && street.trim() && city.trim();

  const handleCopy = () => {
    if (!valid) return;
    navigator.clipboard.writeText(output);
    analytics.copyClicked("local-business-schema-generator");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Business name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="Business Name" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Street address</span>
          <input value={street} onChange={(e) => setStreet(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none" placeholder="123 Main St" />
        </label>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" aria-label="City" className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
          <input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="State/Region" aria-label="State or region" className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
          <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal code" aria-label="Postal code" className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
          <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" aria-label="Country" className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" aria-label="Phone" className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Website URL (optional)" aria-label="Website URL" className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
      </div>
      {valid && (
        <>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Generated LocalBusiness schema</span>
            <button onClick={handleCopy} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 font-mono text-xs">{output}</pre>
        </>
      )}
    </div>
  );
}
