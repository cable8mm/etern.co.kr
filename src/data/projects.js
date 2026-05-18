export const projects = [
  {
    slug: 'archive-record-template',
    title: 'Archive Record Template',
    status: 'Reference structure',
    summary:
      'A lightweight example record showing how future restoration projects can preserve context, runtime notes, and modernization boundaries.',
    facts: [
      { label: 'Artifact type', value: 'Project record scaffold' },
      { label: 'Runtime', value: 'To be documented per project' },
      {
        label: 'Data policy',
        value: 'Original artifacts are never overwritten',
      },
      { label: 'Modernization', value: 'Selective and reversible' },
    ],
    notes: [
      'Future project records should begin with what was found: source snapshots, database dumps, configuration, screenshots, server notes, and any surviving operational context.',
      'Each record should separate recovery work from modernization work so readers can understand which behavior is original and which change was introduced for compatibility.',
      'When a real restoration is published, this template can be replaced by the first project archive entry.',
    ],
  },
];
