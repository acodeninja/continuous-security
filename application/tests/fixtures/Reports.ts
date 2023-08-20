export const emptyReport: ReportOutput = {
    title: 'Empty Report',
    date: new Date,
    counts: {critical: 0, high: 0, info: 0, low: 0, moderate: 0, total: 0, unknown: 0},
    overviewOfIssues: [],
    summaryImpacts: [],
    issues: [],
};

export const fullReport: ReportOutput = {
    title: 'Security Report for application',
    date: new Date,
    counts: {critical: 0, high: 0, info: 0, low: 0, moderate: 0, total: 1, unknown: 1},
    overviewOfIssues: [{
        dataSourceSpecific: {
            cwe: {
                background: '',
                consequences: [{
                    note: 'An uncaught exception',
                    scopeImpacts: [{
                        impact: 'DoS: Crash, Exit, or Restart',
                        scope: 'Availability',
                    }, {
                        impact: 'Read Application Data',
                        scope: 'Confidentiality',
                    }],
                }],
                extendedDescription: 'When an exception is not caught',
                mitigations: [],
            },
        },
        description: 'An exception is thrown from a function, but it is not caught.',
        directLink: 'https://cwe.mitre.org/data/definitions/248.html',
        label: 'CWE-248',
        title: 'Uncaught Exception',
    }],
    summaryImpacts: [{
        impacts: ['DoS: Crash, Exit, or Restart'],
        scope: 'Availability',
    }, {
        impacts: ['Read Application Data'],
        scope: 'Confidentiality',
    }],
    issues: [{
        description: 'test-issue-description',
        extracts: new Array(5).fill({
            code: 'import',
            language: 'python',
            lines: ['2', '6'],
            path: 'application/src/Report',
        }),
        fix: 'Unknown',
        foundBy: 'test-scanner',
        references: [{
            dataSourceSpecific: {
                cwe: {
                    background: '',
                    consequences: [{
                        note: 'An uncaught exception',
                        scopeImpacts: [{
                            impact: 'DoS: Crash, Exit, or Restart',
                            scope: 'Availability',
                        }, {
                            impact: 'Read Application Data',
                            scope: 'Confidentiality',
                        }],
                    }],
                    extendedDescription: 'When an exception is not caught',
                    mitigations: [],
                },
            },
            description: 'An exception is thrown from a function, but it is not caught.',
            directLink: 'https://cwe.mitre.org/data/definitions/248.html',
            label: 'CWE-248',
            title: 'Uncaught Exception',
        }],
        severity: 'unknown',
        title: 'test-issue-title',
        type: 'code smell',
    }],
};
