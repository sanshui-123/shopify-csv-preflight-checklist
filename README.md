# Shopify Product CSV Preflight & Column Mapping Reference (2026)

Zero-dependency reference guide and minimal Node.js header linter for canonical Shopify Product CSV imports, multi-row `Handle` grouping, and blank-cell overwrite safety.

- **Interactive Browser Workspace (0-Byte Local Upload):** [Row & Record — Shopify CSV Preflight & Mapper](https://rowandrecord.com/)
- **Key-Based CSV Diff Checker:** [Compare Old vs. New CSV by SKU](https://rowandrecord.com/csv-compare.html)
- **Handle-Safe Large CSV Splitter (<15 MB):** [Split Large CSV Online](https://rowandrecord.com/split-large-csv-online.html)
- **Vendor CSV Converter & Cleaner:** [Shopify CSV Converter](https://rowandrecord.com/shopify-csv-converter.html) · [CSV Cleaner](https://rowandrecord.com/csv-cleaner.html)

## Critical Shopify CSV Import Traps

| Trap | What Happens on Import | Fix |
| :--- | :--- | :--- |
| **Blank Cell (`""`) vs. Omitted Column** | With *Overwrite matching handles* checked, keeping `Vendor` or `Body (HTML)` in Row 1 with empty cells wipes live store fields; omitting the column leaves live values untouched. | Remove unchanged columns completely from partial update CSVs ([Bulk Price Update Simulator](https://rowandrecord.com/shopify-update-prices-csv.html)). |
| **Clearing Ended Sale Prices** | Putting `0.00` in `Variant Compare At Price` breaks collection sale badges on many themes. | Keep `Variant Compare At Price` in Row 1 and leave the cell genuinely empty (`""`). |
| **Naive Line Splitting (`split -l`)** | Cutting at Line 5,000 severs multi-variant or 10-photo `Handle` continuation rows across Part 1 and Part 2. | Group rows by `Handle` before splitting ([Handle-Safe CSV Splitter](https://rowandrecord.com/split-large-csv-online.html)). |
| **Marketplace Export Quirks** | WooCommerce inverts Regular/Sale prices; Etsy packs `IMAGE1..10` horizontally; Amazon exports `.txt` TSV with ASIN/GTIN mixed. | Platform converters: [WooCommerce](https://rowandrecord.com/woocommerce-to-shopify-csv.html) · [Etsy](https://rowandrecord.com/etsy-to-shopify-csv.html) · [Amazon](https://rowandrecord.com/amazon-to-shopify-csv.html) · [eBay](https://rowandrecord.com/ebay-to-shopify-csv.html) |

## Quick CLI Header Check (`node check-shopify-headers.mjs file.csv`)

```bash
node check-shopify-headers.mjs products.csv
```

## License

MIT
