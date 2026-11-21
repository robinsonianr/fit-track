#!/usr/bin/env node

// Fixes circular references in the generated OpenAPI spec.
// Springdoc generates allOf on subtypes (WorkoutDTO -> ActivityDetailDTO)
// and oneOf on the parent (ActivityDetailDTO -> WorkoutDTO), creating a cycle
// that breaks TypeScript codegen tools like orval.
//
// This script:
// 1. Captures oneOf refs from ActivityDetailDTO, then replaces it with a flat oneOf (no discriminator)
// 2. Flattens each subtype's allOf by merging properties and dropping the $ref to ActivityDetailDTO
//
// Result: ActivityDetailDTO becomes a union type (WorkoutDTO | RunDTO | ...)
// and each subtype is a standalone object schema.

const fs = require('fs');
const path = require('path');

const PARENT_SCHEMA = 'ActivityDetailDTO';
const specPath = path.resolve(__dirname, '../openapi/api.json');
const spec = JSON.parse(fs.readFileSync(specPath, 'utf-8'));

const schemas = spec.components?.schemas;
if (!schemas) {
    console.log('No schemas found, skipping.');
    process.exit(0);
}

const parent = schemas[PARENT_SCHEMA];
if (!parent) {
    console.log(`${PARENT_SCHEMA} not found, skipping.`);
    process.exit(0);
}

// Collect subtypes: from oneOf if present, otherwise scan for schemas with allOf referencing parent
let subtypeRefs = (parent.oneOf || [])
    .filter(entry => entry.$ref)
    .map(entry => entry.$ref);

if (subtypeRefs.length === 0) {
    const parentRef = `#/components/schemas/${PARENT_SCHEMA}`;
    for (const [name, schema] of Object.entries(schemas)) {
        if (!schema.allOf) continue;
        const refsParent = schema.allOf.some(part => part.$ref === parentRef);
        if (refsParent) subtypeRefs.push(`#/components/schemas/${name}`);
    }
}

// Collect parent properties before clearing them
const parentProperties = parent.properties || {};
const parentRequired = parent.required || [];

// Replace ActivityDetailDTO with a pure oneOf union (no properties, no discriminator)
delete parent.discriminator;
delete parent.properties;
delete parent.required;
parent.oneOf = subtypeRefs.map(ref => ({ $ref: ref }));

// Flatten each subtype: merge parent + own properties, remove allOf
for (const ref of subtypeRefs) {
    const name = ref.split('/').pop();
    const subtype = schemas[name];
    if (!subtype?.allOf) continue;

    const merged = { type: 'object', properties: { ...parentProperties }, required: [...parentRequired] };
    for (const part of subtype.allOf) {
        if (part.$ref?.includes(PARENT_SCHEMA)) continue;
        if (part.properties) Object.assign(merged.properties, part.properties);
        if (part.required) merged.required.push(...part.required);
    }

    delete subtype.allOf;
    subtype.type = merged.type;
    subtype.properties = merged.properties;
    if (merged.required.length > 0) {
        subtype.required = merged.required;
    }
}

fs.writeFileSync(specPath, JSON.stringify(spec, null, 2) + '\n');
console.log(`Fixed ${PARENT_SCHEMA} -> union of [${subtypeRefs.map(r => r.split('/').pop()).join(', ')}]`);
