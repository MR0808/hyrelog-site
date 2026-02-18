---
title: "How to Build a Tamper-Evident Audit Trail (Hash Chains Explained Simply)"
description: "Hash chains make audit logs tamper-evident: each entry is linked to the previous one. Here's how it works and why auditors care."
date: "2025-01-20"
tags: ["audit logging", "hash chain", "immutability", "tamper-evident"]
published: true
author: "HyreLog Team"
---

A **tamper-evident** audit trail is one where any change to past entries is detectable. The standard way to get that property is a **hash chain**: each log entry includes a cryptographic hash of the previous entry. Break the chain (edit or delete something), and the hashes no longer match.

Here’s a simple mental model and how it works in practice.

## What’s a hash?

A **cryptographic hash** (e.g. SHA-256) turns any input into a fixed-size fingerprint. Same input → same hash. Change one bit → completely different hash. You can’t reverse it or find another input that gives the same hash (in practice).

So: if you store “hash of previous record” in each record, then:

- **Record 1:** `event_1`, no previous hash (or hash of a “genesis” block).
- **Record 2:** `event_2`, `prev_hash = hash(Record_1)`.
- **Record 3:** `event_3`, `prev_hash = hash(Record_2)`.
- …

If someone changes `event_2`, then `hash(Record_2)` changes, so the `prev_hash` in Record 3 is wrong. Anyone who recomputes hashes along the chain will see the mismatch. **Tampering is evident.**

## What auditors care about

Auditors don’t need to understand SHA-256. They need to know:

1. **Integrity** — “Can you show that this log wasn’t modified after the fact?” With a hash chain, you can run a verification step and prove that the chain is consistent (or detect that it isn’t).
2. **No silent deletes** — If entries are deleted, the chain breaks or the verification fails. So you can’t quietly remove evidence.
3. **Ordering** — The chain defines a total order. You can prove that event A was logged before event B.

In practice, you’ll also need access control (who can read/export), retention (how long you keep the chain), and often **region** (where the chain is stored). The hash chain is the core integrity mechanism; the rest is policy and operations.

## Building it yourself vs buying it

You can build a hash-chained audit log yourself: append-only store, compute `prev_hash` on insert, run a periodic job to verify the chain. The tricky parts are making it scalable, multi-tenant, and resilient (replication, backups) while keeping the chain property. Many teams discover that “just a table with a hash column” doesn’t hold up under audit scrutiny (retention, residency, export formats, access logging).

Using a service built for audit logging shifts that burden: you send events via API, and the provider maintains the chain, retention, and exports. You get tamper-evidence without running the infrastructure yourself.

## Summary

- **Hash chain** = each entry includes the hash of the previous one → any change breaks the chain.
- **Tamper-evident** = you can prove the log wasn’t altered (or detect that it was).
- Auditors want that guarantee; observability logs usually don’t provide it. For compliance-grade audit trails, plan for a dedicated, hash-chained design — whether you build it or use a platform that does.
