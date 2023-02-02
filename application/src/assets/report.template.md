# <%= title %> (<%= date %>)

## Summary

The scan found a total of <%= counts.total %> issue(s).  

### Breakdown

* **Critical** <%= counts.critical %>
* **High** <%= counts.high %>
* **Moderate** <%= counts.moderate %>
* **Low** <%= counts.low %>
* **Informational** <%= counts.info %>

## Issues

<% issues.forEach(issue => { %>
### <%= issue.title %> (<%= issue.severity %>)

<%= issue.description %>

<% })%>
