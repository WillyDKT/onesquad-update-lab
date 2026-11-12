---
id: SECURITY-INDEX
title: "Security Governance and Policies"
type: index
status: published
tags: [security]
summary: "Security standards, Vault secret storage, vulnerability audits, and threat modeling."
related: []
updated: 2026-10-29
---
# Security Governance & Policies

This directory defines security policies, secrets handling guidelines, threat modeling assessments, and penetration test reports for OneSquad.

## Optional folders

Projects can create these folders if useful; they are suggestions, not requirements:

- `pentests/`: Penetration testing findings, vulnerability scans, and remediation plans.
- `secrets-policy/`: Project-specific guidance on secret handling, rotation, and incident response. Store actual secrets in Vault, not in this folder.

## Core Security Rules

1. **Zero Secrets in Code**: Secrets, passwords, certificates, or tokens must NEVER be committed to Git.
2. **Principle of Least Privilege**: Services and users must operate with the minimum required access scopes.
3. **Continuous Auditing**: Vulnerabilities identified in third-party dependencies must be remediated in accordance with Decathlon SLA guidelines.
4. **Vault**: Use Vault to store secrets and credentials.
