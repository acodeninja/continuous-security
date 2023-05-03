module.exports = `
title: <%= title %>
date: <%= date.toLocaleDateString() %>
critical: <%= counts.critical %>
high: <%= counts.high %>
moderate: <%= counts.moderate %>
low: <%= counts.low %>
info: <%= counts.info %>
unknown: <%= counts.unknown %>
total: <%= counts.total %>
<% issues.forEach(issue => { %>
issue title: <%= issue.title %>
issue description: <%= issue.description %>
refs: <% issue.references.forEach(ref => { %><%= ref.id %> (<%= ref.type %>) <% }) %>
issue type: <%= issue.type %>
issue severity: <%= issue.severity %>
<% if(!!issue.package) { %>issue package: <%= issue.package %><% } %>
issue found by: <%= issue.foundBy %>
issue fix: <%= issue.fix.toLowerCase() %>
<% }) %>
`;
